import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import editIcon from '../../assets/icons/edit.png';
import lineIcon from '../../assets/icons/Line23.png';
import sendIcon from '../../assets/icons/send.png';

import useAuthStore from '../../stores/useAuthStore';

const AnswerChat = ({
  botIcon,
  initialMessage,
  status,
  setStatus,
  setImage,
  historyId,
}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const accessToken = useAuthStore((state) => state.user.accessToken);

  /* -------------------- 스크롤 자동 이동 -------------------- */
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  /* -------------------- 초기 메시지 -------------------- */
  useEffect(() => {
    if (initialMessage) {
      setMessages([{ id: 0, role: 'ai', text: initialMessage }]);
    }
  }, [initialMessage]);

  /* -------------------- WebSocket 연결 -------------------- */

  useEffect(() => {
    if (!historyId) return; // id 없으면 연결 안 함

    const ws = new WebSocket(
      `wss://nextvibe.up.railway.app/ws/solutions/chat/${historyId}/?token=${accessToken}`,
    );

    ws.onopen = () => {
      console.log('🎉 WS Connected! 드디어 연결 성공!');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'system':
          console.log('system:', data.message);
          break;

        case 'message':
          setMessages((prev) => {
            const lastMsg = prev[prev.length - 1];

            // 방금 AI가 작성 중이던 메시지(streaming)가 완성된 내용과 같다면
            // 새로 추가하지 말고 기존 걸 유지 (또는 덮어쓰기)
            if (
              lastMsg &&
              lastMsg.role === 'ai' &&
              (lastMsg.text === data.message ||
                data.message.includes(lastMsg.text))
            ) {
              // 굳이 추가 안 해도 이미 delta로 다 그려졌으므로 무시
              return prev;
            }

            // 중복 아니면 추가
            return [
              ...prev,
              {
                id: Date.now(),
                role: data.user === 'ai' ? 'ai' : 'user',
                text: data.message,
              },
            ];
          });
          break;

        case 'ai_thinking':
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              role: 'ai',
              text: 'AI가 생각중...',
            },
          ]);
          break;

        case 'ai_delta':
          setMessages((prev) => {
            const newList = [...prev]; // 배열 복사
            const lastIndex = newList.length - 1;
            const lastMsg = newList[lastIndex];

            // 마지막 메시지가 AI이고, '생각중'이 아니라면 이어붙이기
            if (
              lastMsg &&
              lastMsg.role === 'ai' &&
              lastMsg.text !== 'AI가 생각중...'
            ) {
              // ⚠️ 중요: 직접 수정(+=)하지 않고, 새로운 객체로 교체해야 2배 증식을 막음
              newList[lastIndex] = {
                ...lastMsg,
                text: lastMsg.text + data.delta,
              };
            } else if (lastMsg && lastMsg.text === 'AI가 생각중...') {
              // '생각중' 메시지를 실제 답변으로 교체
              newList[lastIndex] = {
                ...lastMsg,
                text: data.delta,
              };
            } else {
              // 없으면 새로 추가
              newList.push({
                id: Date.now(),
                role: 'ai',
                text: data.delta,
              });
            }
            return newList;
          });
          break;

        case 'ai_done':
          console.log('AI 답변 완료');
          break;

        default:
          console.log('Unknown message type:', data);
      }
    };

    ws.onerror = (e) => {
      console.error('WS error', e);
    };

    ws.onclose = (e) => {
      console.log('WS Closed', e.code, e.reason);
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [historyId, accessToken]);

  /* -------------------- 메시지 전송 -------------------- */
  /* AnswerChat.jsx 수정 */

  const handleSend = () => {
    if (!input.trim()) return;

    //  [유지] 서버로 전송만 합니다.
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message: input }));
    } else {
      console.log('WS not connected');
    }

    setInput('');
  };

  return (
    <Wrapper>
      <Header>
        <HeaderIcon src={editIcon} />
        <HeaderText>문제 풀이</HeaderText>
      </Header>

      <Line src={lineIcon} />

      <ChatContainer ref={chatRef}>
        {messages.map((msg) => (
          <MessageRow key={msg.id} $role={msg.role}>
            {msg.role === 'ai' && botIcon && <ProfileImg src={botIcon} />}

            <MessageBubble $role={msg.role}>
              <div
                dangerouslySetInnerHTML={{
                  __html: msg.text.replace(/\n/g, '<br/>'),
                }}
              />
            </MessageBubble>
          </MessageRow>
        ))}
      </ChatContainer>

      {/* 입력창 */}
      <InputArea>
        <Input
          placeholder='정답 프롬프트를 입력해주세요.'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <SendButton onClick={handleSend}>
          <SendImg src={sendIcon} />
        </SendButton>
      </InputArea>
    </Wrapper>
  );
};

export default AnswerChat;

/* -------------------- 스타일 -------------------- */

const Wrapper = styled.div`
  width: 748px;
  height: 776px;
  background: #fff;
  border-radius: 16px;
  border: 1.5px solid var(--Gray-3, #c4c7d3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
`;

const HeaderIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const HeaderText = styled.h2`
  font-size: 20px;
  font-family: DungGeunMo;
  color: #191927;
`;

const Line = styled.img`
  width: 700px;
  height: 1px;
  padding-left: 24px;
`;

const ChatContainer = styled.div`
  flex: 1;
  padding: 28px 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MessageRow = styled.div`
  display: flex;
  justify-content: ${({ $role }) =>
    $role === 'user' ? 'flex-end' : 'flex-start'};
  gap: 10px;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
`;

const MessageBubble = styled.div`
  max-width: 40rem;
  padding: 16px 20px;
  border-radius: ${({ $role }) =>
    $role === 'ai' ? '0 24px 24px 24px' : '24px 24px 0 24px'};
  background: ${({ $role }) => ($role === 'user' ? '#DEEBFF' : '#FFFFFF')};
  border: ${({ $role }) =>
    $role === 'user' ? 'none' : '1.5px solid var(--Brand-2, #7DB1FF)'};

  word-break: break-word;
  font-family: Pretendard;
  font-size: 0.95rem;
`;

const InputArea = styled.div`
  background: #f5f5f7;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 24px 23px;
  background: #f5f5f7;
  border: none;
  outline: none;
  font-size: 20px;
`;

const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const SendImg = styled.img`
  width: 33px;
  height: 33px;
  margin: 19px 23px;
`;
