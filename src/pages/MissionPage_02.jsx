// Step 02 조건 페이지

import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AnswerChat from '../components/common/AnswerChat.jsx';
import AnswerCheckContainer from '../components/common/AnswerCheckContainer/AnswerCheck.jsx';
import MissionDescription from '../components/common/MissionDescription.jsx';
import MissionHeader from '../components/common/MissionHeader.jsx';
import TopNavigation from '../components/common/TopNavigation.jsx';

import keyAImg from '../assets/icons/key_a.png';
import keyBImg from '../assets/icons/key_b.png';
import keyCImg from '../assets/icons/key_c.png';
import doorImg from '../assets/icons/door_close.png';
import dooropenImg from '../assets/icons/door_open.png';
import keyAOImg from '../assets/icons/key_a_o.png';
import keyAXImg from '../assets/icons/key_a_x.png';
import keyAQImg from '../assets/icons/key_a_q.png';
import keyBOImg from '../assets/icons/key_b_o.png';
import keyBXImg from '../assets/icons/key_b_x.png';
import keyBQImg from '../assets/icons/key_b_q.png';
import keyCOImg from '../assets/icons/key_c_o.png';
import keyCXImg from '../assets/icons/key_c_x.png';
import keyCQImg from '../assets/icons/key_c_q.png';
import arrowrightIcon from '../assets/icons/arrow_right.png'


const MissionPage_02 = () => {
  const { missionId } = useParams();
  const mission = Number(missionId);

  const renderMissionContent = () => {
    switch (mission) {
      case 1:
        return (
          <>
            <p>손재주가 뛰어난 건축가인 당신!</p>
            <p style={{ marginBottom: '1rem' }}>뚝딱뚝딱 새로 지은 집의 문이 완성됐어요.</p>
            <p>이제 문단속을 위해 하나의 열쇠로만 문이 열리도록 해야해요.</p>
            <p>아래 그림을 보고, 어떤 열쇠로 문이 열리고 닫히는지 직접 조건문을 만들어 봅시다!</p>

            <ImageRow>
              <ImageItem>
                <small>열쇠 A</small>
                <img src={keyAImg} alt="열쇠 A" />
              </ImageItem>
              <ImageItem>
                <small>열쇠 B</small>
                <img src={keyBImg} alt="열쇠 B" />
              </ImageItem>
              <ImageItem>
                <small>열쇠 C</small>
                <img src={keyCImg} alt="열쇠 C" />
              </ImageItem>
              <ImageItem>
                <img src={doorImg} alt="문" style={{ width: '5.5rem', height: '8.875rem', marginLeft: '2rem' }}/>
              </ImageItem>
            </ImageRow>
          </>
        );

      case 2:
        return (
          <>
            <p>앗! 잠시 자리를 비운 사이, 누군가가 잠금장치를 망가뜨렸어요!</p>
            <p style={{ marginBottom: '1rem' }}>방해꾼이 잠금장치를 엉망으로 만들어버린 바람에, 문이 이상하게 작동하기 시작했어요.</p>
            <p>아래 그림을 보고, 잠금장치에서 무엇이 잘못되었는지 설명해주세요. </p>
            <p>그 후 잠금장치가 올바르게 작동하도록 새로운 조건문을 직접 작성해봅시다!</p>

            <ImageRow>
              <ImageItem>
                <small>열쇠 A</small>
                <img src={keyAOImg} alt="열쇠 A" />
              </ImageItem>
              <ImageItem>
                <small>열쇠 B</small>
                <img src={keyBOImg} alt="열쇠 B" />
              </ImageItem>
              <ImageItem>
                <small>열쇠 C</small>
                <img src={keyCXImg} alt="열쇠 C" />
              </ImageItem>
              <ImageItem>
                <img src={dooropenImg} alt="문" style={{ width: '5.5rem', height: '8.875rem', marginLeft: '2rem' }}/>
              </ImageItem>
            </ImageRow>

          </>
        );

      case 3:
        return (
          <>
            <p>건축가로서 능력을 인정받은 당신! </p>
            <p style={{ marginBottom: '1rem' }}>이번에는 은행에서 새로운 잠금장치를 의뢰했어요. </p>
            <p>보다 뛰어난 보안을 위해, 이전보다 복잡한 규칙으로 문이 열리도록 만들어야 해요.</p>
            <p>아래 그림을 보고, 새로운 잠금장치에 맞는 조건문을 직접 작성해보세요!</p>
            
            <ImageRow style={{ marginTop: '0.5rem', gap: '0.75rem'}}>
              {/* 왼쪽 열쇠 세트 */}
              <LockSetGroup>
                <LockSet>
                  <KeyGroup>
                    <ImageItem>
                      <small style={{ fontSize: '0.6075rem', lineHeight: '0.91125rem'}}>열쇠 A</small>
                      <img src={keyAImg} alt="열쇠 A" style={{ width: '3.52269rem', height: '5.43169rem'}}/>
                    </ImageItem>
                    <ImageItem>
                      <small style={{ fontSize: '0.6075rem', lineHeight: '0.91125rem'}}>열쇠 B</small>
                      <img src={keyBImg} alt="열쇠 B" style={{ width: '3.52269rem', height: '5.43169rem'}}/>
                    </ImageItem>
                    <ImageItem>
                      <small style={{ fontSize: '0.6075rem', lineHeight: '0.91125rem'}}>열쇠 C</small>
                      <img src={keyCImg} alt="열쇠 C" style={{ width: '3.52269rem', height: '5.43169rem'}}/>
                    </ImageItem>
                  </KeyGroup>
                </LockSet>
                <SetLabel>3개 중 하나의 열쇠로 열기</SetLabel>
              </LockSetGroup>

              <Arrow src={arrowrightIcon} />

              {/* 오른쪽 열쇠 세트 + 문 */}
              <LockSetGroup>
                <LockSet>
                  <KeyGroup>
                    <ImageItem>
                      <small style={{ fontSize: '0.6075rem', lineHeight: '0.91125rem'}}>열쇠 1</small>
                      <img src={keyAImg} alt="열쇠 1" style={{ width: '3.52269rem', height: '5.43169rem'}}/>
                    </ImageItem>
                    <ImageItem>
                      <small style={{ fontSize: '0.6075rem', lineHeight: '0.91125rem'}}>열쇠 2</small>
                      <img src={keyBImg} alt="열쇠 2" style={{ width: '3.52269rem', height: '5.43169rem'}}/>
                    </ImageItem>
                    <ImageItem>
                      <small style={{ fontSize: '0.6075rem', lineHeight: '0.91125rem'}}>열쇠 3</small>
                      <img src={keyCImg} alt="열쇠 3" style={{ width: '3.52269rem', height: '5.43169rem'}}/>
                    </ImageItem>
                  </KeyGroup>
                </LockSet>
                <SetLabel>3개 중 하나의 열쇠로 열기</SetLabel>
              </LockSetGroup>

              <Arrow src={arrowrightIcon} />

              <ImageItem>
                <img src={doorImg} alt="문" style={{ width: '5.5rem', height: '8.875rem'}}/>
              </ImageItem>
            </ImageRow>
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
          stepId={2}
          stepNumber="02 조건"
          title={mission === 1
            ? '건축가의 잠금장치: 하나의 열쇠로만'
            : mission === 2
            ? '건축가의 잠금장치: 고장난 잠금장치'
            : '건축가의 잠금장치: 이중잠금'}
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

export default MissionPage_02;

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

const ImageRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.75rem;
  margin-top: 1.51rem;
`;

const ImageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  small {
    color: var(--Gray-1, #646879);
    text-align: center;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.125rem; 
    margin-bottom: 0.5rem;
    padding-left: 0.5rem;
  }

  img {
    width: 4.349rem;
    height: 6.70581rem;
    object-fit: contain;
  }
`;

// mission3 이미지
const LockSetGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.56rem;
`;

const LockSet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1.25rem;
  border: 1px dashed var(--Gray-2, #868BA3);
  padding: 0.56rem 0.94rem;
`;

const KeyGroup = styled.div`
  display: flex;
  gap: 0.61rem;
`;

const SetLabel = styled.small`
  color: var(--Gray-2, #868BA3);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem; /* 150% */
`;


const Arrow = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;
