import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import botIcon from '../../assets/icons/bot.png';
import editIcon from '../../assets/icons/edit.png';
import lineIcon from '../../assets/icons/Line23.png';
import sendIcon from '../../assets/icons/send.png';

const AnswerChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

  // 채팅 내용 (더미 데이터 사용)
  useEffect(() => {
    const dummy = [
      {
        id: 0,
        role: 'ai',
        text: `1. 잘못된 레시피\n레시피는 다음과 같은 형식으로 작성해주세요!\n예시) “1. 00하기 / 2. 00하기”\n\n2. 레시피가 잘못된 이유\n잘못된 이유는 다음과 같이 서술형으로 작성해 주세요!\n예시) “~라서 레시피가 순차적으로 적합하지 않아요.”`,
      },
      {
        id: 1,
        role: 'user',
        text: `1. 정답 프롬프트 정답 프롬프트 정답 프롬프트 정답 프롬프트`,
      },
      {
        id: 2,
        role: 'ai',
        text: `결과 확인중.`,
      },
    ];
    setMessages(dummy);
  }, []);

  // 새 메시지 전송
  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: 'user', text: input },
    ]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'ai', text: '정답입니다! 레시피 순서를 잘 지켰어요.' },
      ]);
    }, 600);
  };

  return (
    <Wrapper>
      <Header>
        <HeaderIcon src={editIcon}/>
        <HeaderText>문제 풀이</HeaderText>
      </Header>

      <Line src={lineIcon} alt="divider" />

      <ChatContainer ref={chatRef}>

        {messages.map((msg) => (
          <MessageRow key={msg.id} role={msg.role}>
            {msg.role === 'ai' && <ProfileImg src={botIcon} alt="bot" />}
            <MessageBubble role={msg.role}>
              {msg.text.split('\n').map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </MessageBubble>
          </MessageRow>
        ))}

      </ChatContainer>

      <InputArea>
        <Input
          type="text"
          placeholder="정답 프롬프트를 입력해주세요."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <SendButton onClick={handleSend}>
          <SendImg src={sendIcon} alt="send" />
        </SendButton>
      </InputArea>
    </Wrapper>
  );
};

export default AnswerChat;

// styled-components
// 헤더 부분
const Wrapper = styled.div`
  width: 748px;
  height: 776px;
  display: flex;
  flex-direction: column;
  background-color: #FFF;
  border-radius: 16px;
  border: 1.5px solid var(--Gray-3, #C4C7D3);
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 24px;
  background-color: #FFF;
  position: sticky;
  top: 0;
  z-index: 5;
  gap:12px;
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

// 채팅 부분 
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
  justify-content: ${({ role }) =>
    role === 'user' ? 'flex-end' : 'flex-start'};
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  aspect-ratio: 1/1;
  margin-top: 2px;
`;

const MessageBubble = styled.div`
  background-color: ${({ role }) =>
    role === 'user' ? '#DEEBFF' : '#FFFFFF'};
  border: ${({ role }) => (role === 'ai' ? '1.5px solid #7DB1FF' : 'none')};
  color: #191927;
  padding: 16px 20px;
  border-radius: ${({ role }) => (role === 'ai' ? '0 24px 24px 24px' : '24px 24px 0 24px')};
  max-width: 70%;
  line-height: 24px;
  font-weight: 500;
  font-size: 16px;
  font-family: Pretendard;
  white-space: pre-wrap;
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  border-radius: 0 0 15px 15px;
  background: #F5F5F7;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 24px 23px;
  border-radius: 0 0 15px 15px;
  background: #F5F5F7;
  color: #191927;
  font-size: 20px;
  font-weight: 500;
  line-height: 150%; 

  &::placeholder {
    color: #a3a3a3;
  }
`;

const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SendImg = styled.img`
  width: 33.333px;
  height: 33.333px;
  margin: 19px 23px;
`;
