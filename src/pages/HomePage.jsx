import styled from 'styled-components';
import TopNavigation from '../components/common/TopNavigation';

import Fire from '../assets/icons/fire_on.png';
import heroBg from '../assets/icons/home_background.png';
import Key3 from '../assets/icons/key_3.png';
import Arrow2 from '../assets/icons/right_2.png';

const Home = () => {
  return (
    <>
      <TopNavigation />

      <SHeroWrapper>
        <STextBox>

          <STagline>코딩의 본질은 ‘컴퓨팅 사고력’!</STagline>

          <STitle>
            이야기로
            <SInlineImg src={Key3} alt="keys" />
            풀어내는
            <br />
            첫 코딩 모험
            <SSub>
              <SInlineImgSmall src={Arrow2} alt="arrows" />
              NEXTVIBE <SFrom>에서!</SFrom>
              <SfireIcon src={Fire} alt="fire" />
            </SSub>
          </STitle>

        </STextBox>
      </SHeroWrapper>
    </>
  );
};

export default Home;


const SHeroWrapper = styled.section`
  width: 100%;
  height: calc(100vh - 5rem); /* 헤더 제외 전체 화면 채우기 */
  background-image: url(${heroBg});
  background-size: cover;     /* 화면 크기에 맞게 꽉 채움 */
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  padding: 0 2rem;  /* 화면 줄어들면 텍스트가 딱 붙지 않도록 */
  box-sizing: border-box;
`;

const STextBox = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  gap: 3.75rem;
`;

const STagline = styled.p`
  color: #F7F39A;
  font-family: Pretendard;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const STitle = styled.h1`
  font-family: Pretendard;
  font-size: 6.25rem;
  line-height: 160%;
  font-weight: 700;
  letter-spacing: 0.125rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    font-size: 4.5rem;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
    line-height: 140%;
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;


const SSub = styled.h2`
  color: #FFF;
  text-align: center;
  font-family: 'EBSHunminjeongeumSB';
  font-size: 6.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 11rem */
  letter-spacing: 0.1375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;


const SFrom = styled.span`
  color: #FFF;
  text-align: center;
  font-family: Pretendard;
  font-size: 6.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 10rem */
  letter-spacing: 0.125rem;
  margin-bottom: 1rem;
`;

const SInlineImg = styled.img`
  height: 11rem;
  margin: 0 1rem;
  vertical-align: middle;
  margin-bottom: 1rem;

  @media (max-width: 1024px) {
    height: 7rem;
  }
  @media (max-width: 768px) {
    height: 5rem;
  }
  @media (max-width: 480px) {
    height: 3.2rem;
  }
`;

const SInlineImgSmall = styled.img`
  width: 15rem;
  height: auto;
  vertical-align: middle;

  @media (max-width: 1024px) {
    width: 10rem;
  }
  @media (max-width: 768px) {
    width: 7rem;
  }
  @media (max-width: 480px) {
    width: 5rem;
  }
`;

const SfireIcon = styled.img`
  width: 9.875rem;
  height: 9.875rem;
  margin-left: -1rem;
`;