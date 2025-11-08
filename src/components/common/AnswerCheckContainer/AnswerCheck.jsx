import styled from 'styled-components';
import forwardIcon from '../../../assets/icons/forward.svg';
import SandboxedFrame from './SandboxedFrame';

const AnswerCheckContainer = ({
  status = 'default',
  children,
  sandboxed = true,
}) => {
  return (
    <Container status={status}>
      <Header>
        <Icon src={forwardIcon} alt='forward icon' />
        <Title>정답 확인</Title>
      </Header>
      <Divider />
      <Content>
        {sandboxed ? (
          <SandboxBox>
            <SandboxedFrame
              // 필요하면 최소 스타일 주입 가능
              headCSS={`
                body { display:flex; align-items:center; justify-content:center; }
                img { max-width: 100%; height: auto; display:block; }
              `}
            >
              {children}
            </SandboxedFrame>
          </SandboxBox>
        ) : (
          children
        )}
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
          : 'var(--Gray-3, #c4c7d3)'};
  transition: border-color 0.3s ease;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const Title = styled.span`
  color: var(--Black, #191927);
  font-family: DungGeunMo;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Divider = styled.hr`
  width: 43.625rem;
  border: 1px solid var(--Gray-3, #c4c7d3);
  margin: 0 auto;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SandboxBox = styled.div`
  width: 100%;
  height: 100%;
`;
