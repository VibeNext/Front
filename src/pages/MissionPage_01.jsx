// Step 01 순서 페이지

import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AnswerChat from '../components/common/AnswerChat.jsx';
import AnswerCheckContainer from '../components/common/AnswerCheckContainer/AnswerCheck.jsx';
import MissionDescription from '../components/common/MissionDescription.jsx';
import MissionHeader from '../components/common/MissionHeader.jsx';
import TopNavigation from '../components/common/TopNavigation.jsx';
import missionData from '../data/missionData.js';

const MissionPage_01 = () => {
  const { missionId } = useParams();
  const step = 1; 
  const mission = Number(missionId);

  // 데이터 확인
  const missionInfo = missionData?.[step]?.[mission];

  return (
    <Wrapper>
      {/* 상단 네비게이션 */}
      <TopNavigation />

      <ContentWrap>
        {/* 헤더 (Step, Mission 제목) */}
        <MissionHeader
          stepId={1}
          stepNumber="01 순차"
          title={missionInfo.title}
          initialStep={mission}
        />

        {/* 메인 레이아웃 */}
        <MainLayout>
          {/* 왼쪽: 문제 설명 + 정답 확인 */}
          <LeftPanel>
            <MissionDescription
              instruction={missionInfo.instruction}
              images={missionInfo.images}
            />
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



