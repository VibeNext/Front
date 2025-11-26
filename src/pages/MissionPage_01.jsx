// Step 01 순서 페이지

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AnswerChat from '../components/common/AnswerChat.jsx';
import AnswerCheckContainer from '../components/common/AnswerCheckContainer/AnswerCheck.jsx';
import MissionDescription from '../components/common/MissionDescription.jsx';
import MissionHeader from '../components/common/MissionHeader.jsx';
import TopNavigation from '../components/common/TopNavigation.jsx';
import useAuthStore from '../stores/useAuthStore';

import bearImg from '../assets/icons/bear.png';
import boilImg from '../assets/icons/boil.png';
import fireOffImg from '../assets/icons/fire_off.png';
import fireOnImg from '../assets/icons/fire_on.png';
import mushroomImg from '../assets/icons/mushroom.png';
import saltImg from '../assets/icons/salt.png';
import soupImg from '../assets/icons/soup.png';
import tomatoImg from '../assets/icons/tomato.png';
import waterImg from '../assets/icons/water.png';

import botIcon from '../assets/icons/bot.png';

import { authClient } from '../apis/instance';
import defaultImg from '../assets/icons/missionpage_1/default1.svg';

const MissionPage_01 = ({ onFinish }) => {
  const [status, setStatus] = useState('default');

  const missionNumberMap = {
    11: 1,
    12: 2,
    13: 3,
  };

  const { missionId } = useParams(); // URL의 미션 id (예: 11, 12, 13)
  const missionBackendId = Number(missionId); // 11 / 12 / 13
  const mission = missionNumberMap[missionBackendId]; // 1 / 2 / 3

  const accessToken = useAuthStore((state) => state.user.accessToken);

  const [historyId, setHistoryId] = useState(null);

  /* -------------------- 풀이 기록 생성 (POST /solutions/{id}/) -------------------- */
  useEffect(() => {
    if (!missionBackendId || !accessToken) return;

    const createHistory = async () => {
      try {
        const { accessToken, grantType } = useAuthStore.getState().user;

        const res = await authClient.post(
          `/solutions/${missionBackendId}`,
          {},
          {
            headers: {
              Authorization: `${grantType} ${accessToken}`,
            },
          },
        );

        console.log('📌 서버 응답 성공:', res.data);

        const data = Array.isArray(res.data) ? res.data[0] : res.data;

        const receivedId = data.id;

        if (receivedId) {
          setHistoryId(receivedId);
          console.log('🎉 ID 획득 성공:', receivedId);
        } else {
          console.warn('⚠️ ID를 찾을 수 없습니다:', res.data);
        }
      } catch (err) {
        console.error(
          '❌ createHistory 실패:',
          err.response?.data || err.message,
        );
      }
    };

    createHistory();
  }, [missionBackendId, accessToken]);

  /* -------------------- 풀이 종료 저장 (PATCH /solutions/update/{history_id}) -------------------- */
  const saveSolution = async (isSolved) => {
    try {
      const { accessToken, grantType } = useAuthStore.getState().user;

      const res = await authClient.patch(
        `/solutions/update/${historyId}`,

        { is_solved: isSolved },
        {
          headers: {
            Authorization: `${grantType} ${accessToken}`,
          },
        },
      );

      console.log('풀이 종료/이탈 저장 성공:', res.data);
    } catch (err) {
      console.error(
        '풀이 종료/이탈 저장 실패:',
        err.response?.data || err.message,
      );
    }
  };

  const images = {
    1: {
      default: defaultImg,
      checking: defaultImg,
      success: defaultImg,
      fail: defaultImg,
    },
    2: {
      default: defaultImg,
      checking: defaultImg,
      success: defaultImg,
      fail: defaultImg,
    },
    3: {
      default: defaultImg,
      checking: defaultImg,
      success: defaultImg,
      fail: defaultImg,
    },
  };

  const renderMissionContent = () => {
    switch (mission) {
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
                <small>버섯 넣기</small>
                <img src={mushroomImg} alt='버섯 넣기' />
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

  // mission 매핑 실패하면 바로 리턴
  if (!mission) {
    return (
      <Wrapper>
        <TopNavigation />
        <ContentWrap>
          <p>잘못된 미션 ID 입니다. (missionId: {missionBackendId})</p>
        </ContentWrap>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* 상단 네비게이션 */}
      <TopNavigation />

      <ContentWrap>
        {/* 헤더 (Step, Mission 제목) */}
        <MissionHeader
          stepId={1}
          stepNumber='01 순차'
          title={
            mission === 1
              ? '요리사의 레시피: 토마토 스프'
              : mission === 2
                ? '요리사의 레시피: 버섯 스프'
                : '요리사의 레시피: 손님의 스프'
          }
          initialStep={mission}
          status={status}
        />

        {/* 메인 레이아웃 */}
        <MainLayout>
          {/* 왼쪽: 문제 설명 + 정답 확인 */}
          <LeftPanel>
            <MissionDescription>{renderMissionContent()}</MissionDescription>

            {/* 정답 확인 영역 - 상태 연동 */}
            <AnswerCheckContainer status={status}>
              {status === 'default' && (
                <div style={{ textAlign: 'center' }}>
                  <img
                    src={images[mission].default}
                    alt='기본 이미지'
                    style={{
                      width: 'auto',
                      height: 'auto',
                      maxWidth: '60%',
                      maxHeight: '60%',
                      objectFit: 'contain',
                      display: 'block',
                      margin: '0 auto',
                    }}
                  />
                  <p
                    style={{
                      color: '#868BA3',
                      fontFamily: 'Pretendard',
                      fontWeight: 500,
                      fontSize: '1rem',
                      marginTop: '1rem',
                    }}
                  >
                    프롬포트 입력시 결과 확인이 가능합니다.
                  </p>
                </div>
              )}

              {status !== 'default' && (
                <img
                  src={images[mission][status]}
                  alt={`${mission}번 미션 ${status} 이미지`}
                />
              )}
            </AnswerCheckContainer>
          </LeftPanel>

          <RightPanel>
            {(() => {
              switch (mission) {
                /* --------------------- CASE 1 --------------------- */
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
                      setStatus={async (v) => {
                        setStatus(v);

                        if (v === 'success') {
                          setTimeout(async () => {
                            await saveSolution(true);
                            onFinish(true);
                          }, 1200);
                        }

                        if (v === 'fail') {
                          setTimeout(async () => {
                            await saveSolution(false);
                            onFinish(false);
                          }, 1200);
                        }
                      }}
                    />
                  );

                /* --------------------- CASE 2 --------------------- */
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
                      setStatus={async (v) => {
                        setStatus(v);

                        if (v === 'success') {
                          setTimeout(async () => {
                            await saveSolution(true);
                            onFinish(true);
                          }, 1200);
                        }

                        if (v === 'fail') {
                          setTimeout(async () => {
                            await saveSolution(false);
                            onFinish(false);
                          }, 1200);
                        }
                      }}
                    />
                  );

                /* --------------------- CASE 3 --------------------- */
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
                      setStatus={async (v) => {
                        setStatus(v);

                        if (v === 'success') {
                          setTimeout(async () => {
                            await saveSolution(true);
                            onFinish(true);
                          }, 1200);
                        }

                        if (v === 'fail') {
                          setTimeout(async () => {
                            await saveSolution(false);
                            onFinish(false);
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

/* -------------------- styled-components -------------------- */

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
