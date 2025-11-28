import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import editIcon from '../../assets/icons/edit.png';
import lineIcon from '../../assets/icons/Line23.png';
import sendIcon from '../../assets/icons/send.png';

import useAuthStore from '../../stores/useAuthStore';

const AnswerChat = ({
  botIcon,
  initialMessage,
  initialMessages,
  status,
  setStatus,
  setImage,
  historyId,
  readOnly,
}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const accessToken = useAuthStore((state) => state.user.accessToken);
  /* -------------------- 채팅 복원 -------------------- */
  useEffect(() => {
    if (initialMessages && initialMessages.length > 0) {
      const restored = initialMessages.map((m, idx) => ({
        id: idx,
        role:
          m.sender?.toLowerCase() === 'ai' ||
          m.sender?.toLowerCase() === 'assistant'
            ? 'ai'
            : 'user',

        text: m.content,
      }));
      setMessages(restored);
    }
  }, [initialMessages]);

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
    // 기존 채팅이 있다면 초기 메시지 표시 금지
    if (initialMessages && initialMessages.length > 0) return;

    // 새 문제 → 초기 안내 메시지 표시
    if (initialMessage) {
      setMessages([{ id: Date.now(), role: 'ai', text: initialMessage }]);
    }
  }, [initialMessage]);

  /* -------------------- WebSocket 연결 -------------------- */
  useEffect(() => {
    if (readOnly) return;
    if (!historyId) return;

    console.log('🔑 Current Token:', accessToken);

    // ✅ 웹소켓 주소 설정 (chat 뒤에 슬래시 필수, 토큰 필수)
    const wsUrl = `wss://nextvibe.up.railway.app/ws/solutions/${historyId}/chat/?token=${accessToken}`;
    console.log('🔗 Connecting to:', wsUrl);

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('🎉 WS Connected! (연결 성공)');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'system':
          console.log('system:', data.message);
          break;

        case 'message':
          console.log('=== RAW JSON RESPONSE ===', data.message);
          try {
            // 1. JSON인지 파싱 시도 (성적표인지 확인)
            const parsed = JSON.parse(data.message);

            // 2. 성적표(JSON)가 맞다면? (is_solved 키가 있는지 확인)
            if (parsed && typeof parsed.is_solved !== 'undefined') {
              const feedbackText = parsed.feedback;

              // ✅ [핵심 수정] 리스트 전체를 가져옵니다.
              const assetList = parsed.answer_asset_list || [];

              // (1) 상태 업데이트 (성공/실패)
              if (parsed.is_solved) setStatus('success');
              else setStatus('fail');

              // (2) 부모에게 이미지 리스트 전체 전달!
              if (setImage) {
                setImage(assetList);
              }

              // (3) 말풍선 덮어쓰기! (지저분한 JSON을 멘트로 교체)
              setMessages((prev) => {
                const newList = [...prev];
                const lastIndex = newList.length - 1;

                // 마지막 메시지가 AI가 쓰던 것이면 내용을 바꿔치기함
                if (lastIndex >= 0 && newList[lastIndex].role === 'ai') {
                  newList[lastIndex] = {
                    ...newList[lastIndex],
                    text: feedbackText, // 깔끔한 피드백만 남김
                  };
                }
                return newList;
              });

              // 여기서 break를 해서 아래쪽 '일반 메시지 추가' 로직이 실행 안 되게 막음
              break;
            }
          } catch (e) {
            // JSON 아니면 무시하고 아래로 진행
          }

          // (JSON 아닐 때만 실행됨) 일반 메시지 추가 로직
          setMessages((prev) => {
            const lastMsg = prev[prev.length - 1];
            // 중복 방지
            if (lastMsg && lastMsg.text === data.message) return prev;

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
            const newList = [...prev];
            const lastIndex = newList.length - 1;
            const lastMsg = newList[lastIndex];

            if (
              lastMsg &&
              lastMsg.role === 'ai' &&
              lastMsg.text !== 'AI가 생각중...'
            ) {
              newList[lastIndex] = {
                ...lastMsg,
                text: lastMsg.text + data.delta,
              };
            } else if (lastMsg && lastMsg.text === 'AI가 생각중...') {
              newList[lastIndex] = {
                ...lastMsg,
                text: data.delta,
              };
            } else {
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
      // 연결 중이거나 열려있을 때만 닫기
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close();
      }
    };
  }, [historyId, accessToken, readOnly]);

  /* -------------------- 메시지 전송 -------------------- */
  const handleSend = () => {
    if (!input.trim()) return;

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
          placeholder={
            readOnly
              ? '이미 풀이를 완료한 기록입니다.'
              : '정답 프롬프트를 입력해주세요.'
          }
          value={input}
          disabled={readOnly}
          onChange={(e) => !readOnly && setInput(e.target.value)}
          onKeyDown={(e) => !readOnly && e.key === 'Enter' && handleSend()}
        />

        <SendButton
          onClick={() => !readOnly && handleSend()}
          disabled={readOnly}
          style={{
            opacity: readOnly ? 0.5 : 1,
            cursor: readOnly ? 'not-allowed' : 'pointer',
          }}
        >
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
