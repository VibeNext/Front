import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import editIcon from '../../assets/icons/edit.png';
import lineIcon from '../../assets/icons/Line23.png';
import sendIcon from '../../assets/icons/send.png';

const AnswerChat = ({
  botIcon, // 시스템 캐릭터 이미지
  initialMessage, // 첫 안내 메시지
  correctMessage, // 정답일 때 시스템 메시지
  wrongMessage, // 오답일 때 시스템 메시지 (현재는 미사용)
  status,
  setStatus,
}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

  // 초기 안내 메시지
  useEffect(() => {
    if (initialMessage) {
      setMessages([{ id: 0, role: 'ai', text: initialMessage }]);
    }
  }, [initialMessage]);

  // 채팅 새로 보내면 스크롤 아래로 자동 이동
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // "정답 확인 중" 상태로 변경
    setStatus('checking');

    // "정답을 확인 중입니다..." 메시지 추가
    const checkingMsg = {
      id: Date.now() + 1,
      role: 'ai',
      text: '결과 확인 중.',
    };
    setMessages((prev) => [...prev, checkingMsg]);

    // 1.5초 뒤 실제 정답 / 오답 판단
    setTimeout(() => {
      const isCorrect = input.includes('정답'); // 예시 판별 (나중에 로직 연결 가능)

      const resultMsg = {
        id: Date.now() + 2,
        role: 'ai',
        text: isCorrect ? correctMessage : wrongMessage,
      };

      setMessages((prev) => [...prev, resultMsg]);
      setStatus(isCorrect ? 'success' : 'fail');
    }, 1500);
  };
  return (
    <>
      <Wrapper>
        {/* 헤더 */}
        <Header>
          <HeaderIcon src={editIcon} />
          <HeaderText>문제 풀이</HeaderText>
        </Header>

        <Line src={lineIcon} alt='divider' />

        {/* 채팅 영역 */}
        <ChatContainer ref={chatRef}>
          {messages.map((msg) => (
            <MessageRow key={msg.id} $role={msg.role}>
              {msg.role === 'ai' && botIcon && (
                <ProfileImg src={botIcon} alt='bot' />
              )}
              <MessageBubble
                $role={msg.role}
                $status={status}
                $isResult={msg.text.startsWith('정답입니다')}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: msg.text.replace(/\n/g, '<br />'),
                  }}
                />
              </MessageBubble>
            </MessageRow>
          ))}
        </ChatContainer>

        {/* 입력창 */}
        <InputArea>
          <Input
            type='text'
            placeholder='정답 프롬프트를 입력해주세요.'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <SendButton onClick={handleSend}>
            <SendImg src={sendIcon} alt='send' />
          </SendButton>
        </InputArea>
      </Wrapper>
    </>
  );
};

export default AnswerChat;

//styled-components
const Wrapper = styled.div`
  width: 748px;
  height: 776px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 16px;
  border: 1.5px solid var(--Gray-3, #c4c7d3);
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 24px;
  gap: 12px;
`;

const HeaderIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const HeaderText = styled.h2`
  color: #191927;
  font-family: DungGeunMo;
  font-size: 20px;
  font-weight: 400;
`;

const Line = styled.img`
  width: 700px;
  height: 1px;
  padding-left: 24px;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #fff;
`;

const MessageRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  justify-content: ${({ $role }) =>
    $role === 'user' ? 'flex-end' : 'flex-start'};
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
`;

const MessageBubble = styled.div`
  display: inline-block;
  background-color: ${({ $role }) =>
    $role === 'user' ? '#DEEBFF' : '#FFFFFF'};

  border: ${({ $role }) =>
    $role === 'user' ? '#FFF' : '1.5px solid var(--Brand-2, #7DB1FF);'};

  padding: 16px 20px;
  border-radius: ${({ $role }) =>
    $role === 'ai' ? '0 24px 24px 24px' : '24px 24px 0 24px'};
  // 내용 길이 따라 말풍선 크기 조정
  width: fit-content;
  max-width: 40rem;
  word-break: break-word;
  white-space: pre-wrap;

  color: var(--Black, #191927);
  font-family: Pretendard;
  font-size: 0.95rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  white-space: pre-wrap;
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  background: #f5f5f7;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 24px 23px;
  background: #f5f5f7;
  color: #191927;
  font-size: 20px;
  font-weight: 500;
  &::placeholder {
    color: #a3a3a3;
  }
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
