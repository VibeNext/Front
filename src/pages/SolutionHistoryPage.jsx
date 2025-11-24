import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import TopNavigation from '../components/common/TopNavigation';

import { getSolutionDetail } from '../services/api';

const SolutionHistoryPage = () => {
  const { solutionId } = useParams();
  const navigate = useNavigate();

  const [history, setHistory] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getSolutionDetail(solutionId);
        setHistory(data);
      } catch (err) {
        console.error(err);
        alert("풀이기록을 불러오는 중 오류가 발생했습니다.");
      }
    };

    load();
  }, [solutionId]);

  if (!history) return <div>로딩 중...</div>;

  return (
    <Wrapper>
      <TopNavigation />

      <ContentBox>
        <Title>풀이 기록</Title>

        <InfoBox>
          <h3>{history.mission_title}</h3>
          <p>풀이 날짜: {history.created_at}</p>
          <p>결과: {history.is_solved ? "정답" : "오답"}</p>
        </InfoBox>

        <ChatBox>
          {history.chat_messages.map((msg, idx) => (
            <Message key={idx} $role={msg.role}>
              <Bubble $role={msg.role}>{msg.text}</Bubble>
            </Message>
          ))}
        </ChatBox>

        <Button
          onClick={() => navigate(`/mission/${history.mission_id}`)}
        >
          다시 풀기
        </Button>
      </ContentBox>
    </Wrapper>
  );
};

export default SolutionHistoryPage;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #fff;
`;

const ContentBox = styled.div`
  max-width: 900px;
  margin: 3rem auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const InfoBox = styled.div`
  background: #f5f5f7;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Message = styled.div`
  display: flex;
  justify-content: ${({ $role }) =>
    $role === "user" ? "flex-end" : "flex-start"};
`;

const Bubble = styled.div`
  max-width: 60%;
  padding: 14px 18px;
  border-radius: 16px;
  background: ${({ $role }) => ($role === "user" ? "#DEEBFF" : "#FFFFFF")};
  border: 1.5px solid
    ${({ $role }) => ($role === "user" ? "#FFF" : "#7DB1FF")};
  font-size: 1rem;
  line-height: 1.4;
`;

const Button = styled.button`
  margin-top: 2rem;
  width: 100%;
  padding: 1rem;
  background: #5c9dff;
  color: #fff;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #4a84e6;
  }
`;
