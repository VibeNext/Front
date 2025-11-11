// Step 01 순서 페이지

import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AnswerChat from '../components/common/AnswerChat.jsx';
import AnswerCheckContainer from '../components/common/AnswerCheckContainer/AnswerCheck.jsx';
import MissionDescription from '../components/common/MissionDescription.jsx';
import MissionHeader from '../components/common/MissionHeader.jsx';
import TopNavigation from '../components/common/TopNavigation.jsx';

import bearImg from '../assets/icons/bear.png';
import boilImg from '../assets/icons/boil.png';
import fireOffImg from '../assets/icons/fire_off.png';
import fireOnImg from '../assets/icons/fire_on.png';
import mushroomImg from '../assets/icons/mushroom.png';
import saltImg from '../assets/icons/salt.png';
import soupImg from '../assets/icons/soup.png';
import tomatoImg from '../assets/icons/tomato.png';
import waterImg from '../assets/icons/water.png';

const MissionPage_01 = () => {
  const { missionId } = useParams();
  const mission = Number(missionId);

  const renderMissionContent = () => {
    switch (mission) {
      case 1:
        return (
          <>
            <p>오늘은 내가 요리사!</p>
            <p style={{ marginBottom: '1rem' }}>갓 따온 토마토를 이용해 맛있는 토마토 스프를 만들려고 해요.</p>
            <p>아래에 섞여 있는 조리 단계를 참고해서 올바른 레시피를 작성해 주세요.</p>
            <p>모든 과정을 순서대로 실행하면, 따뜻하고 맛있는 토마토 스프가 완성될 거예요!</p>
            <ImageRow>
              <ImageItem>
                <small>불끄기</small>
                <img src={fireOffImg} alt="불끄기" />
              </ImageItem>
              <ImageItem>
                <small>토마토 넣기</small>
                <img src={tomatoImg} alt="토마토 넣기" />
              </ImageItem>
              <ImageItem>
                <small>채소와 소금 넣기</small>
                <img src={saltImg} alt="채소와 소금 넣기" />
              </ImageItem>
              <ImageItem>
                <small>완성된 스프 담기</small>
                <img src={soupImg} alt="완성된 스프 담기" />
              </ImageItem>
              <ImageItem>
                <small>불켜기</small>
                <img src={fireOnImg} alt="불켜기" />
              </ImageItem>
              <ImageItem>
                <small>냄비에 물 붓기</small>
                <img src={waterImg} alt="냄비에 물 붓기" />
              </ImageItem>
              <ImageItem>
                <small>물 끓이기</small>
                <img src={boilImg} alt="물 끓이기" />
              </ImageItem>
            </ImageRow>
          </>
        );

      case 2:
        return (
          <>
            <p>오늘은 내가 요리사!</p>
            <p style={{ marginBottom: '1rem' }}>갓 따온 토마토를 이용해 맛있는 토마토 스프를 만들려고 해요.</p>
            <p>아래에 섞여 있는 조리 단계를 참고해서 올바른 레시피를 작성해 주세요.</p>
            <p>모든 과정을 순서대로 실행하면, 따뜻하고 맛있는 토마토 스프가 완성될 거예요!</p>
            <ImageRow>
              <ImageItem>
                <small>불끄기</small>
                <img src={fireOffImg} alt="불끄기" />
              </ImageItem>
              <ImageItem>
                <small>버섯 넣기</small>
                <img src={mushroomImg} alt="버섯 넣기" />
              </ImageItem>
              <ImageItem>
                <small>채소와 소금 넣기</small>
                <img src={saltImg} alt="채소와 소금 넣기" />
              </ImageItem>
              <ImageItem>
                <small>완성된 스프 담기</small>
                <img src={soupImg} alt="완성된 스프 담기" />
              </ImageItem>
              <ImageItem>
                <small>불켜기</small>
                <img src={fireOnImg} alt="불켜기" />
              </ImageItem>
              <ImageItem>
                <small>냄비에 물 붓기</small>
                <img src={waterImg} alt="냄비에 물 붓기" />
              </ImageItem>
              <ImageItem>
                <small>물 끓이기</small>
                <img src={boilImg} alt="물 끓이기" />
              </ImageItem>
            </ImageRow>
          </>
        );

      case 3:
        return (
          <>
            <p>프로 요리사가 되기 위한 마지막 단계!</p>
            <p style={{ marginBottom: '1rem' }}>바로 다른 사람들의 주문에 맞춰 요리를 만들어보는 것이에요. </p>
            <p>아래 곰 손님은 “꿀이 들어가고, 허브가 뿌려진 스프” 를 원하고 있어요. </p>
            <p>지금까지 배운 순차 개념과 레시피들을 응용해서 손님께 드릴 맛있는 스프를 만들어볼까요?</p>
            <p style={{ color:'#5C9DFF' }}>* 스프에 요리사가 원하는 다양한 재료를 추가하면 더 맛있는 스프가 완성될거에요!</p>
            <ImageItem>
                <img src={bearImg} alt="곰 말풍선" style={{ width: '38.9375rem', height:'5rem', marginTop: '2.44rem'}}/>
            </ImageItem>
          </>
        );

      default:
        return <p>미션 설명을 불러올 수 없습니다.</p>;
    }
  };

  return (
    <Wrapper>
      {/* 상단 네비게이션 */}
      <TopNavigation />

      <ContentWrap>
        {/* 헤더 (Step, Mission 제목) */}
        <MissionHeader
          stepId={1}
          stepNumber="01 순차"
          title={mission === 1
            ? '요리사의 레시피: 토마토 스프'
            : mission === 2
            ? '요리사의 레시피: 버섯 스프'
            : '요리사의 레시피: 손님의 스프'}
          initialStep={mission}
        />

        {/* 메인 레이아웃 */}
        <MainLayout>
          {/* 왼쪽: 문제 설명 + 정답 확인 */}
          <LeftPanel>
            <MissionDescription>
              {renderMissionContent()}
            </MissionDescription>
            <AnswerCheckContainer status="default">
            </AnswerCheckContainer>
          </LeftPanel>

          {/* 오른쪽: 문제 풀이 */}
          <RightPanel>
            <AnswerChat />
          </RightPanel>
        </MainLayout>
      </ContentWrap>
    </Wrapper>
  );
};

export default MissionPage_01;

//styled-components

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
`;

const ContentWrap = styled.div`
  width: 100%;
  max-width: 1920px;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

const MainLayout = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0rem 12.5rem 0rem 12.5rem;
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// 문제설명 밑 이미지 (step1)
const ImageRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 0.64rem;
  margin-top: 2.5rem;
`;

const ImageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  small {
    color: var(--Gray-1, #646879);
    text-align: center;
    font-family: Pretendard;
    font-size: 0.67988rem;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 1.01981rem */
    margin-bottom: 0.5rem;

  }

  img {
    width: 5rem;
    height: 5rem;
    object-fit: contain;
  }
`;



