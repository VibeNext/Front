import styled from 'styled-components';
import lineIcon from '../../../assets/icons/Line23.png';
import forwardIcon from '../../../assets/icons/forward.svg';

const AnswerCheckContainer = ({ status = 'default', children }) => {
  return (
    <Container status={status}>
      <Header>
        <Icon src={forwardIcon} alt='forward icon' />
        <Title>정답 확인</Title>
      </Header>
      <Line src={lineIcon} alt='divider' />
      <Content>
        <ImageWrapper>{children}</ImageWrapper>
      </Content>
    </Container>
  );
};

export default AnswerCheckContainer;

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
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem 0.5rem 1.5rem;
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
  width: 700px;
  padding-left: 24px;
  height: 0.09rem;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 4.81rem;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    height: auto;
    width: auto;
    max-width: 100%;
    object-fit: contain;
  }

  p {
    margin: 1rem 0 0 0;
    color: #868ba3;
    font-family: Pretendard, sans-serif;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
  }
`;
