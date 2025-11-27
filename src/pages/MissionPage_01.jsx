import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import AnswerChat from '../components/common/AnswerChat.jsx';
import AnswerCheckContainer from '../components/common/AnswerCheckContainer/AnswerCheck.jsx';
import MissionDescription from '../components/common/MissionDescription.jsx';
import MissionHeader from '../components/common/MissionHeader.jsx';
import TopNavigation from '../components/common/TopNavigation.jsx';

// 이미지 아이콘들
import bearImg from '../assets/icons/bear.png';
import boilImg from '../assets/icons/boil.png';
import botIcon from '../assets/icons/bot.png';
import fireOffImg from '../assets/icons/fire_off.png';
import fireOnImg from '../assets/icons/fire_on.png';
import defaultImg from '../assets/icons/missionpage_1/default1.svg';
import mushroomImg from '../assets/icons/mushroom.png';
import saltImg from '../assets/icons/salt.png';
import soupImg from '../assets/icons/soup.png';
import tomatoImg from '../assets/icons/tomato.png';
import waterImg from '../assets/icons/water.png';

import { authClient } from '../apis/instance';

const MissionPage_01 = ({ onFinish }) => {
  const [status, setStatus] = useState('default');
  const [serverImages, setServerImages] = useState([]); // ✅ 이미지 리스트 전체 저장

  const { missionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const missionBackendId = Number(missionId);
  const missionNumber = missionBackendId % 10;
  console.log('missionId from URL:', missionId);
  console.log('missionBackendId:', missionBackendId);

  // historyId를 state로 직접 관리해야 함 (setHistoryId 반드시 존재)
  const [historyId, setHistoryId] = useState(null);

  // ✅ 미션이 바뀔 때마다(예: 1->2) 상태 초기화
  useEffect(() => {
    setStatus('default');
    setServerImages([]);
  }, [missionId]);

  useEffect(() => {
    async function createHistory() {
      const res = await authClient.post(`/solutions/${missionBackendId}`);
      setHistoryId(res.data.id);
    }

    createHistory();
  }, [missionBackendId]);

  // 풀이 완료 저장
  const saveSolution = async (isSolved) => {
    if (!historyId) return;
    try {
      const res = await authClient.patch(`/solutions/update/${historyId}`, {
        is_solved: isSolved,
      });
      console.log('풀이 종료/이탈 저장 성공:', res.data);
    } catch (err) {
      console.error('풀이 종료/이탈 저장 실패:', err);
    }
  };

  // ✅ [핵심] 순차 챕터 전용 결과 화면 렌더링 함수
  const renderResultContent = () => {
    const hasImages = serverImages && serverImages.length > 0;

    // 1. 아직 이미지가 없을 때 (기본)
    if (!hasImages) {
      return (
        <DefaultWrapper>
          <img src={defaultImg} alt='기본' />
          <p>프롬포트 입력시 결과 확인이 가능합니다.</p>
        </DefaultWrapper>
      );
    }

    // 2. 이미지가 있을 때 (순차 전용 디자인: 과정 + 결과)
    // 마지막 요소는 '완성된 결과물', 나머지는 '조리 과정'
    const resultImage = serverImages[serverImages.length - 1];
    const stepImages = serverImages.slice(0, -1);

    return (
      <ResultWrapper>
        {/* 윗줄: 조리 과정 아이콘들 */}
        <StepList>
          {stepImages.map((imgUrl, idx) => (
            <StepItem key={idx}>
              <img src={imgUrl} alt={`step-${idx}`} />
            </StepItem>
          ))}
        </StepList>

        {/* 아랫줄: 완성된 결과물 */}
        <ResultItem>
          <img src={resultImage} alt='결과물' />
        </ResultItem>
      </ResultWrapper>
    );
  };

  // 미션 설명 렌더링
  const renderMissionContent = () => {
    switch (missionNumber) {
      case 1:
        return (
          <>
            <p>오늘은 내가 요리사!</p>
            <p style={{ marginBottom: '1rem' }}>
              갓 따온 토마토를 이용해 맛있는 토마토 스프를 만들려고 해요.
            </p>
            <p>
              아래에 섞여 있는 조리 단계를 참고해서 올바른 레시피를 작성해
              주세요.
            </p>
            <p>
              모든 과정을 순서대로 실행하면, 따뜻하고 맛있는 토마토 스프가
              완성될 거예요!
            </p>
            <ImageRow>
              <ImageItem>
                <small>불끄기</small>
                <img src={fireOffImg} alt='불끄기' />
              </ImageItem>
              <ImageItem>
                <small>토마토 넣기</small>
                <img src={tomatoImg} alt='토마토 넣기' />
              </ImageItem>
              <ImageItem>
                <small>채소와 소금 넣기</small>
                <img src={saltImg} alt='채소와 소금 넣기' />
              </ImageItem>
              <ImageItem>
                <small>완성된 스프 담기</small>
                <img src={soupImg} alt='완성된 스프 담기' />
              </ImageItem>
              <ImageItem>
                <small>불켜기</small>
                <img src={fireOnImg} alt='불켜기' />
              </ImageItem>
              <ImageItem>
                <small>냄비에 물 붓기</small>
                <img src={waterImg} alt='냄비에 물 붓기' />
              </ImageItem>
              <ImageItem>
                <small>물 끓이기</small>
                <img src={boilImg} alt='물 끓이기' />
              </ImageItem>
            </ImageRow>
          </>
        );
      case 2:
        return (
          <>
            <p>오늘은 친구가 요리사!</p>
            <p style={{ marginBottom: '1rem' }}>
              당신의 토마토 스프에 감동받은 친구가 버섯 스프를 만들어주려고
              해요.
            </p>
            <p>
              앗, 하지만 아쉽게도 친구의 요리는 실패하고 말았어요. 어디가 잘못된
              걸까요?
            </p>
            <p>
              친구의 버섯 스프 레시피를 보고, 잘못된 레시피와 그 이유를
              찾아주세요!
            </p>
            <ImageRow>
              <ImageItem>
                <small>불켜기</small>
                <img src={fireOnImg} alt='불켜기' />
              </ImageItem>
              <ImageItem>
                <small>냄비에 물 붓기</small>
                <img src={waterImg} alt='냄비에 물 붓기' />
              </ImageItem>
              <ImageItem>
                <small>버섯 넣기</small>
                <img src={mushroomImg} alt='버섯 넣기' />
              </ImageItem>
              <ImageItem>
                <small>채소와 소금 넣기</small>
                <img src={saltImg} alt='채소와 소금 넣기' />
              </ImageItem>
              <ImageItem>
                <small>불끄기</small>
                <img src={fireOffImg} alt='불끄기' />
              </ImageItem>
              <ImageItem>
                <small>물 끓이기</small>
                <img src={boilImg} alt='물 끓이기' />
              </ImageItem>
              <ImageItem>
                <small>완성된 스프 담기</small>
                <img src={soupImg} alt='완성된 스프 담기' />
              </ImageItem>
            </ImageRow>
          </>
        );
      case 3:
        return (
          <>
            <p>프로 요리사가 되기 위한 마지막 단계!</p>
            <p style={{ marginBottom: '1rem' }}>
              바로 다른 사람들의 주문에 맞춰 요리를 만들어보는 것이에요.
            </p>
            <p>
              아래 곰 손님은 “꿀이 들어가고, 허브가 뿌려진 스프” 를 원하고
              있어요.
            </p>
            <p>
              지금까지 배운 순차 개념과 레시피들을 응용해서 손님께 드릴 맛있는
              스프를 만들어볼까요?
            </p>
            <p style={{ color: '#5C9DFF' }}>
              * 스프에 요리사가 원하는 다양한 재료를 추가하면 더 맛있는 스프가
              완성될거에요!
            </p>
            <ImageItem>
              <img
                src={bearImg}
                alt='곰 말풍선'
                style={{
                  width: '38.9375rem',
                  height: '5rem',
                  marginTop: '2.44rem',
                }}
              />
            </ImageItem>
          </>
        );
      default:
        return <p>미션 설명을 불러올 수 없습니다.</p>;
    }
  };

  if (!missionBackendId) {
    return (
      <Wrapper>
        <TopNavigation />
        <ContentWrap>
          <p>잘못된 접근입니다.</p>
        </ContentWrap>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <TopNavigation />
      <ContentWrap>
        <MissionHeader
          stepId={1}
          stepNumber='01 순차'
          title={
            missionNumber === 1
              ? '요리사의 레시피: 토마토 스프'
              : missionNumber === 2
                ? '요리사의 레시피: 버섯 스프'
                : '요리사의 레시피: 손님의 스프'
          }
          initialStep={missionNumber}
          status={status}
        />

        <MainLayout>
          <LeftPanel>
            <MissionDescription>{renderMissionContent()}</MissionDescription>

            {/* ✅ AnswerCheckContainer를 '틀'로만 사용하고, 내용은 renderResultContent로 채움 */}
            <AnswerCheckContainer status={status}>
              {renderResultContent()}
            </AnswerCheckContainer>
          </LeftPanel>

          <RightPanel>
            {(() => {
              switch (missionNumber) {
                case 1:
                  return (
                    <AnswerChat
                      key={missionBackendId}
                      botIcon={botIcon}
                      initialMessage={`레시피는 다음과 같은 형식으로 작성해주세요!<br><span style="color:#868ba3;">예시) “1. 00하기 / 2. 00하기”</span>`}
                      correctMessage={`<strong style="color:#37AF00;">정답입니다!</strong><br><br>따뜻하고 맛있는 <b>토마토 스프</b>가 완성되었어요.<br>요리사로서의 첫걸음을 성공적으로 내딛었네요!<br><span style="color:#868ba3; font-weight:500;">레시피가 순차적으로 작동했다면 정답으로 인정됩니다.</span>`}
                      wrongMessage={`<strong style="color:#FF644F;">오답입니다!</strong><br><br>레시피 순서를 다시 확인해주세요!<br><span style="color:#868ba3; font-weight:500;">예: 불을 켜야만 물을 끓일 수 있겠죠?</span>`}
                      status={status}
                      historyId={historyId}
                      setImage={setServerImages} // ✅ 이미지 리스트 설정 함수 전달
                      setStatus={async (v) => {
                        setStatus(v);
                        if (v === 'success') {
                          setTimeout(async () => {
                            await saveSolution(true);
                            localStorage.setItem(
                              'shouldRefreshMissions',
                              'true',
                            ); // 목록 갱신 요청
                            const nextMissionId = missionBackendId + 1;

                            navigate(`/step/1/mission/${nextMissionId}`);
                          }, 1200);
                        }
                        if (v === 'fail') {
                          setTimeout(async () => {
                            await saveSolution(false);
                            if (onFinish) onFinish(false); // ✅ 안전장치
                          }, 1200);
                        }
                      }}
                    />
                  );
                case 2:
                  return (
                    <AnswerChat
                      key={missionBackendId}
                      botIcon={botIcon}
                      initialMessage={`1. 잘못된 레시피<br>레시피는 다음과 같은 형식으로 작성해주세요!<br><span style="color:#868ba3;">예시) “ 1. 00하기 / 2. 00하기 ”</span><br><br>2. 레시피가 잘못된 이유<br>잘못된 이유는 다음과 같이 서술형으로 작성해 주세요!`}
                      correctMessage={`<strong style="color:#37AF00;">정답입니다!</strong><br><br>잘못된 레시피를 적절하게 고치는 방법까지 터득하셨네요!`}
                      wrongMessage={`<strong style="color:#FF644F;">오답입니다!</strong><br><br>레시피의 전후 관계를 다시 확인해주세요!`}
                      status={status}
                      historyId={historyId}
                      setImage={setServerImages}
                      setStatus={async (v) => {
                        setStatus(v);
                        if (v === 'success') {
                          setTimeout(async () => {
                            await saveSolution(true);
                            localStorage.setItem(
                              'shouldRefreshMissions',
                              'true',
                            );
                            const nextMissionId = missionBackendId + 1;

                            navigate(`/step/1/mission/${nextMissionId}`);
                          }, 1200);
                        }
                        if (v === 'fail') {
                          setTimeout(async () => {
                            await saveSolution(false);
                            if (onFinish) onFinish(false);
                          }, 1200);
                        }
                      }}
                    />
                  );
                case 3:
                  return (
                    <AnswerChat
                      key={missionBackendId}
                      botIcon={botIcon}
                      initialMessage={`레시피는 다음과 같은 형식으로 작성해주세요!<br>예시) “1. 00하기 / 2. 00하기”`}
                      correctMessage={`<strong style="color:#37AF00;">버섯과 꿀이 들어간 스프가 완성되었어요!</strong>`}
                      wrongMessage={`<strong style="color:#FF644F;">아쉬운 스프가 완성되었어요!</strong>`}
                      status={status}
                      historyId={historyId}
                      setImage={setServerImages}
                      setStatus={async (v) => {
                        setStatus(v);
                        if (v === 'success') {
                          setTimeout(async () => {
                            await saveSolution(true);
                            localStorage.setItem(
                              'shouldRefreshMissions',
                              'true',
                            );
                            const nextMissionId = 21;

                            navigate(`/step/2/mission/${nextMissionId}`);
                          }, 1200);
                        }
                        if (v === 'fail') {
                          setTimeout(async () => {
                            await saveSolution(false);
                            if (onFinish) onFinish(false);
                          }, 1200);
                        }
                      }}
                    />
                  );
                default:
                  return null;
              }
            })()}
          </RightPanel>
        </MainLayout>
      </ContentWrap>
    </Wrapper>
  );
};

export default MissionPage_01;

/* --------------- 스타일 (순차 챕터 전용 UI) --------------- */

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
    line-height: 150%;
    margin-bottom: 0.5rem;
  }
  img {
    width: 5rem;
    height: 5rem;
    object-fit: contain;
  }
`;

// ✅ AnswerCheck 내부 컨텐츠용 스타일 (누락 방지)
const DefaultWrapper = styled.div`
  text-align: center;
  img {
    width: auto;
    height: 10rem;
    object-fit: contain;
  }
  p {
    margin-top: 1rem;
    color: #868ba3;
    font-size: 1rem;
    font-weight: 500;
  }
`;

const ResultWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
`;

const StepList = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const StepItem = styled.div`
  img {
    width: 5rem;
    height: 5rem;
    object-fit: contain;
  }
`;

const ResultItem = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 0;
  img {
    height: 100%;
    max-height: 10rem;
    object-fit: contain;
    flex: 1;
    min-height: 0;
  }
`;
