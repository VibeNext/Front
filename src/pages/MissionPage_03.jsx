// Step 03 반복 페이지

import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AnswerChat from '../components/common/AnswerChat.jsx';
import AnswerCheckContainer from '../components/common/AnswerCheckContainer/AnswerCheck.jsx';
import MissionDescription from '../components/common/MissionDescription.jsx';
import MissionHeader from '../components/common/MissionHeader.jsx';
import TopNavigation from '../components/common/TopNavigation.jsx';

import robotTaleImg from '../assets/icons/robot_tail.png';
import trashTaleImg from '../assets/icons/trash_tail.png';
//import taleImg from '../assets/icons/orinigal_tail.png';

const MissionPage_03 = () => {
  const { missionId } = useParams();
  const mission = Number(missionId);

  const renderMissionContent = () => {
    switch (mission) {
      case 1:
        return (
          <>
            <p>똑똑한 당신은 로봇 개발자! 오늘은 로봇 청소기를 개발하고 있어요.</p>
            <p style={{ marginBottom: '1rem' }}>아래 그림을 보고, 로봇이 모든 쓰레기를 청소할 수 있도록 명령을 입력해보세요.</p>
            <p style={{color: '#868BA3'}}>* 이 로봇 청소기는 한 번에 한 가지 일만 할 수 있어요.</p>
            <p style={{color: '#868BA3'}}>** '앞으로 한 칸 이동'하거나 ‘현재 위치한 한 칸만 청소’할 수 있어요.</p>
            <ImageRow>
              <ImageItem>
                <img src={robotTaleImg} alt="로봇 청소기" />
              </ImageItem>

              {[...Array(5)].map((_, idx) => (
                <ImageItem key={idx}>
                  <img src={trashTaleImg} alt={`쓰레기 ${idx + 1}`} />
                </ImageItem>
              ))}
            </ImageRow>
          </>
        );

      case 2:
        return (
          <>
            <p>앗, 로봇 청소기가 이상하게 작동하고 있어요!</p>
            <p style={{ marginBottom: '1rem' }}>로봇 청소기 반복문이 잘못된 이유를 설명하고, 모든 쓰레기를 청소하도록 새로운 반복문을 작성해봅시다!</p>
            <p style={{color: '#868BA3'}}>* 이 로봇 청소기는 한 번에 한 가지 일만 할 수 있어요.</p>
            <p style={{color: '#868BA3'}}>** ‘앞으로 한 칸 이동’하거나 ‘회전(왼쪽/오른쪽 90도)’할 수 있어요.</p>
            
          </>
        );

      case 3:
        return (
          <>
            <p>이번에는 지그재그로 놓인 쓰레기를 모두 청소해야 해요!</p>
            <p style={{ marginBottom: '1rem' }}>아래 그림을 보고, 모든 쓰레기를 깨끗이 청소하도록 새로운 반복문을 직접 작성해봅시다!</p>
            <p style={{color: '#868BA3'}}>* 이 로봇 청소기는 한 번에 한 가지 일만 할 수 있어요.</p>
            <p style={{color: '#868BA3'}}>** ‘앞으로 한 칸 이동’하거나 ‘회전(왼쪽/오른쪽 90도)’할 수 있어요.</p>
            
            
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
          stepId={3}
          stepNumber="03 반복"
          title={mission === 1
            ? '개발자의 로봇청소기: 직선'
            : mission === 2
            ? '개발자의 로봇청소기: 2x2'
            : '개발자의 로봇청소기: 지그재그'}
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

export default MissionPage_03;

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


//이미지 
const ImageRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 0.06188rem;
  margin-top: 2.64rem;
`;

const ImageItem = styled.div`
  width: 6.07613rem;
  height: 6.02044rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin:0;

  img {
    width: 80%;
    height: auto;
  }
`;


