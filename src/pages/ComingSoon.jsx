import styled from 'styled-components';
import LogoIcon from '../assets/icons/서비스 로고.svg?react';
import TopNavigation from '../components/common/TopNavigation.jsx';

const ComingSoon = () => {
  return (
    <>
      <TopNavigation />
      <Wrap>
        <LogoIcon className='logo' />
        <Title>서비스 준비 중입니다</Title>
        <Desc>
          더 나은 서비스를 위해 열심히 개발하고 있어요.
          <br />
          조금만 기다려주세요!
        </Desc>
      </Wrap>
    </>
  );
};

export default ComingSoon;

const Wrap = styled.div`
  width: 100%;
  height: calc(100vh - 5rem); // ← TopNavigation 높이만큼 제외
  background: linear-gradient(180deg, #fff 0%, #b1d0ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1.2rem;
  padding: 2rem;

  .logo {
    width: 100px;
    height: 100px;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #191927;
  font-family: 'Pretendard', sans-serif;
`;

const Desc = styled.p`
  font-size: 1.25rem;
  font-family: DungGeunMo;
  color: #646879;
  line-height: 1.6;
`;
