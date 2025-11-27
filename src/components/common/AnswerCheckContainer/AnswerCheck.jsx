import styled from 'styled-components';
import lineIcon from '../../../assets/icons/Line23.png';
import forwardIcon from '../../../assets/icons/forward.svg';

// [핵심 변경] serverImages 같은 거 안 받음! 오직 'children'만 받아서 보여줌.
const AnswerCheckContainer = ({ status = 'default', children }) => {
  return (
    <Container status={status}>
      <Header>
        <Icon src={forwardIcon} alt='forward icon' />
        <Title>정답 확인</Title>
      </Header>
      <Line src={lineIcon} alt='divider' />

      {/* 부모(MissionPage)가 만든 내용을 여기에 그대로 뿌려줌 */}
      <Content>{children}</Content>
    </Container>
  );
};

export default AnswerCheckContainer;

/* ---------- 스타일 ---------- */

const Container = styled.div`
  width: 46.75rem;
  height: 22.5625rem;
  flex-shrink: 0;
  border-radius: 1rem;
  border: 1.5px solid
    ${({ status }) =>
      status === 'success'
        ? 'var(--Success, #76CA66)'
        : status === 'fail'
          ? 'var(--Error, #FF9A8C)'
          : status === 'checking'
            ? 'var(--Brand-2, #7DB1FF)'
            : 'var(--Gray-3, #C4C7D3)'};
  transition: border-color 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem 0.5rem 1.5rem;
  flex-shrink: 0;
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const Title = styled.span`
  color: var(--Black, #191927);
  font-family: DungGeunMo;
  font-size: 1.25rem;
`;

const Line = styled.img`
  width: 90%;
  margin: 0 auto;
  padding-bottom: 0.5rem;
  height: auto;
  flex-shrink: 0;
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  padding: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
