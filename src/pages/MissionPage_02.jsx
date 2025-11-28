import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import AnswerChat from '../components/common/AnswerChat.jsx';
import AnswerCheckContainer from '../components/common/AnswerCheckContainer/AnswerCheck.jsx';
import MissionDescription from '../components/common/MissionDescription.jsx';
import MissionHeader from '../components/common/MissionHeader.jsx';
import TopNavigation from '../components/common/TopNavigation.jsx';

import arrowrightIcon from '../assets/icons/arrow_right.png';
import doorImg from '../assets/icons/door_close.png';
import dooropenImg from '../assets/icons/door_open.png';
import keyAImg from '../assets/icons/key_a.png';
import keyAOImg from '../assets/icons/key_a_o.png';
import keyBImg from '../assets/icons/key_b.png';
import keyBOImg from '../assets/icons/key_b_o.png';
import keyCImg from '../assets/icons/key_c.png';
import keyCXImg from '../assets/icons/key_c_x.png';

import botIcon from '../assets/icons/bot2.png';

import { authClient } from '../apis/instance';
import defaultImg from '../assets/icons/missionpage_2/default.svg';

const MissionPage_02 = ({ onFinish }) => {
  const [status, setStatus] = useState('default');
  const [serverImages, setServerImages] = useState([]);

  const { missionId } = useParams();
  const location = useLocation();

  const missionBackendId = Number(missionId);
  const missionNumber = missionBackendId % 10;

  const [historyId, setHistoryId] = useState(null);

  const isSolved = location.state?.isSolved ?? false;
  const [initialMessages, setInitialMessages] = useState([]);

  const queryHistoryId = new URLSearchParams(location.search).get('historyId');

  useEffect(() => {
    setStatus('default');
    setServerImages([]);

    // ⭐ FIX: MissionPage_01과 동일한 방식으로 incoming historyId 결정
    const incomingId = queryHistoryId || location.state?.historyId; // ⭐ FIX

    if (incomingId) {
<<<<<<< HEAD
      const parsed = Number(incomingId);
      if (!isNaN(parsed)) {
        console.log('📌 기존 historyId 재사용:', parsed);
        setHistoryId(parsed);
        return;
      }
=======
      console.log('📌 기존 historyId 재사용:', incomingId);
      setHistoryId(Number(incomingId)); // ⭐ FIX: Number 처리만 하고 종료
      return; // ⭐ FIX: 기존 기록이 있으므로 새 기록 생성하지 않음
>>>>>>> 0329206ea688d7b4632d5800f3941e539017de8a
    }

    // 기존 기록이 없을 때만 새로 생성
    setHistoryId(null);

    const createHistory = async () => {
      try {
        const res = await authClient.post(
          `/solutions/${missionBackendId}/`,
          {},
        );
        const data = res.data;
        const targetData = Array.isArray(data) ? data[data.length - 1] : data;
        const newId =
          targetData?.id || targetData?.solution_id || targetData?.history_id;

        if (newId) {
          console.log('✨ 새 historyId 생성:', newId);
          setHistoryId(newId);
        }
      } catch (err) {
        console.error('❌ 기록 생성 실패:', err);
      }
    };
    createHistory();
  }, [missionBackendId, location.state, queryHistoryId]);

  // ⭐ FIX: historyId가 유효할 때만 상세조회 (undefined로 먼저 실행되는 문제 방지)
  useEffect(() => {
    if (!historyId) return; // ⭐ FIX

    const fetchDetail = async () => {
      try {
        const res = await authClient.get(`/solutions/detail/${historyId}`);
        const data = res.data;

        console.log('📌 기존 풀이 기록 상세:', data);
        setInitialMessages(data.messages || []);
      } catch (err) {
        console.error('❌ 상세 조회 실패:', err);
      }
    };

    fetchDetail();
  }, [historyId]); // ⭐ FIX

  const saveSolution = async (isSolved) => {
    if (!historyId) return;
    try {
      const res = await authClient.patch(`/solutions/update/${historyId}`, {
        is_solved: isSolved,
      });
      console.log('풀이 저장 성공:', res.data);
    } catch (err) {
      console.error('풀이 저장 실패:', err);
    }
  };

  const renderResultContent = () => {
    const hasImages = serverImages && serverImages.length > 0;

    if (!hasImages) {
      return (
        <DefaultWrapper>
          <img src={defaultImg} alt='기본' />
          <p>프롬포트 입력시 결과 확인이 가능합니다.</p>
        </DefaultWrapper>
      );
    }
    const resultImage = serverImages[serverImages.length - 1];
    const stepImages = serverImages.slice(0, -1);

    return (
      <ResultWrapper>
        {stepImages.map((imgUrl, idx) => (
          <ImageItemBox key={idx}>
            <img src={imgUrl} alt={`step-${idx}`} />
          </ImageItemBox>
        ))}

        <ImageItemBox>
          <img src={resultImage} alt='result' />
        </ImageItemBox>
      </ResultWrapper>
    );
  };

  const renderMissionContent = () => {
    switch (missionNumber) {
      case 1:
        return (
          <>
            <p>손재주가 뛰어난 건축가인 당신!</p>
            <p style={{ marginBottom: '1rem' }}>
              뚝딱뚝딱 새로 지은 집의 문이 완성됐어요.
            </p>
            <p>이제 문단속을 위해 하나의 열쇠로만 문이 열리도록 해야해요.</p>
            <p>
              아래 그림을 보고, 어떤 열쇠로 문이 열리고 닫히는지 직접 조건문을
              만들어 봅시다!
            </p>
            <ImageRow>
              <ImageItem>
                <small>열쇠 A</small>
                <img src={keyAImg} alt='열쇠 A' />
              </ImageItem>
              <ImageItem>
                <small>열쇠 B</small>
                <img src={keyBImg} alt='열쇠 B' />
              </ImageItem>
              <ImageItem>
                <small>열쇠 C</small>
                <img src={keyCImg} alt='열쇠 C' />
              </ImageItem>
              <ImageItem>
                <img
                  src={doorImg}
                  alt='문'
                  style={{
                    width: '5.5rem',
                    height: '8.875rem',
                    marginLeft: '2rem',
                  }}
                />
              </ImageItem>
            </ImageRow>
          </>
        );
      case 2:
        return (
          <>
            <p>앗! 잠시 자리를 비운 사이, 누군가가 잠금장치를 망가뜨렸어요!</p>
            <p style={{ marginBottom: '1rem' }}>
              방해꾼이 잠금장치를 엉망으로 만들어버린 바람에, 문이 이상하게
              작동하기 시작했어요.
            </p>
            <p>
              아래 그림을 보고, 잠금장치에서 무엇이 잘못되었는지 설명해주세요.
            </p>
            <p>
              그 후 잠금장치가 올바르게 작동하도록 새로운 조건문을 직접
              작성해봅시다!
            </p>
            <ImageRow>
              <ImageItem>
                <small>열쇠 A</small>
                <img src={keyAOImg} alt='열쇠 A' />
              </ImageItem>
              <ImageItem>
                <small>열쇠 B</small>
                <img src={keyBOImg} alt='열쇠 B' />
              </ImageItem>
              <ImageItem>
                <small>열쇠 C</small>
                <img src={keyCXImg} alt='열쇠 C' />
              </ImageItem>
              <ImageItem>
                <img
                  src={dooropenImg}
                  alt='문'
                  style={{
                    width: '5.5rem',
                    height: '8.875rem',
                    marginLeft: '2rem',
                  }}
                />
              </ImageItem>
            </ImageRow>
          </>
        );
      case 3:
        return (
          <>
            <p>건축가로서 능력을 인정받은 당신!</p>
            <p style={{ marginBottom: '1rem' }}>
              이번에는 은행에서 새로운 잠금장치를 의뢰했어요.
            </p>
            <p>
              보다 뛰어난 보안을 위해, 이전보다 복잡한 규칙으로 문이 열리도록
              만들어야 해요.
            </p>
            <p>
              아래 그림을 보고, 새로운 잠금장치에 맞는 조건문을 직접
              작성해보세요!
            </p>
            <ImageRow style={{ marginTop: '0.5rem', gap: '0.75rem' }}>
              <LockSetGroup>
                <LockSet>
                  <KeyGroup>
                    <ImageItem>
                      <small
                        style={{
                          fontSize: '0.6075rem',
                          lineHeight: '0.91125rem',
                        }}
                      >
                        열쇠 A
                      </small>
                      <img
                        src={keyAImg}
                        alt='열쇠 A'
                        style={{ width: '3.52269rem', height: '5.43169rem' }}
                      />
                    </ImageItem>
                    <ImageItem>
                      <small
                        style={{
                          fontSize: '0.6075rem',
                          lineHeight: '0.91125rem',
                        }}
                      >
                        열쇠 B
                      </small>
                      <img
                        src={keyBImg}
                        alt='열쇠 B'
                        style={{ width: '3.52269rem', height: '5.43169rem' }}
                      />
                    </ImageItem>
                    <ImageItem>
                      <small
                        style={{
                          fontSize: '0.6075rem',
                          lineHeight: '0.91125rem',
                        }}
                      >
                        열쇠 C
                      </small>
                      <img
                        src={keyCImg}
                        alt='열쇠 C'
                        style={{ width: '3.52269rem', height: '5.43169rem' }}
                      />
                    </ImageItem>
                  </KeyGroup>
                </LockSet>
                <SetLabel>3개 중 하나의 열쇠로 열기</SetLabel>
              </LockSetGroup>
              <Arrow src={arrowrightIcon} />
              <LockSetGroup>
                <LockSet>
                  <KeyGroup>
                    <ImageItem>
                      <small
                        style={{
                          fontSize: '0.6075rem',
                          lineHeight: '0.91125rem',
                        }}
                      >
                        열쇠 1
                      </small>
                      <img
                        src={keyAImg}
                        alt='열쇠 1'
                        style={{ width: '3.52269rem', height: '5.43169rem' }}
                      />
                    </ImageItem>
                    <ImageItem>
                      <small
                        style={{
                          fontSize: '0.6075rem',
                          lineHeight: '0.91125rem',
                        }}
                      >
                        열쇠 2
                      </small>
                      <img
                        src={keyBImg}
                        alt='열쇠 2'
                        style={{ width: '3.52269rem', height: '5.43169rem' }}
                      />
                    </ImageItem>
                    <ImageItem>
                      <small
                        style={{
                          fontSize: '0.6075rem',
                          lineHeight: '0.91125rem',
                        }}
                      >
                        열쇠 3
                      </small>
                      <img
                        src={keyCImg}
                        alt='열쇠 3'
                        style={{ width: '3.52269rem', height: '5.43169rem' }}
                      />
                    </ImageItem>
                  </KeyGroup>
                </LockSet>
                <SetLabel>3개 중 하나의 열쇠로 열기</SetLabel>
              </LockSetGroup>
              <Arrow src={arrowrightIcon} />
              <ImageItem>
                <img
                  src={doorImg}
                  alt='문'
                  style={{ width: '5.5rem', height: '8.875rem' }}
                />
              </ImageItem>
            </ImageRow>
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
          stepId={2}
          stepNumber='02 조건'
          title={
            missionNumber === 1
              ? '건축가의 잠금장치: 하나의 열쇠로만'
              : missionNumber === 2
                ? '건축가의 잠금장치: 고장난 잠금장치'
                : '건축가의 잠금장치: 이중잠금'
          }
          initialStep={missionNumber}
          status={status}
        />

        <MainLayout>
          <LeftPanel>
            <MissionDescription>{renderMissionContent()}</MissionDescription>

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
                      key={missionId}
                      botIcon={botIcon}
                      initialMessage={`조건문은 다음과 같은 형식으로 작성해주세요!<br><span style="color:#868ba3;">예시) “만약 ○○라면, △△한다. 그렇지 않다면, ▽▽한다.”</span>`}
                      status={status}
                      historyId={historyId}
                      setImage={setServerImages}
                      initialMessages={initialMessages}
                      readOnly={isSolved}
                      setStatus={async (v) => {
                        setStatus(v);
                        if (v === 'success') {
                          setTimeout(async () => {
                            await saveSolution(true);
                            localStorage.setItem(
                              'shouldRefreshMissions',
                              'true',
                            );
                            if (onFinish) onFinish(true);
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
                case 2:
                  return (
                    <AnswerChat
                      key={missionBackendId}
                      botIcon={botIcon}
                      initialMessage={`잠금장치에서 무엇이 잘못되었는지와 새로운 조건문을 모두 작성해주세요.<br><br>1.잠금장치에서 무엇이 잘못되었는지는 다음과 같은 형식으로 작성해볼 수 있어요!<br><span style="color:#868ba3;">    예시) “지금은 ~라서 잠금장치가 제대로 작동하지 않아요.”</span><br><br>2. 조건문은 다음과 같은 형식으로 작성해주세요!<br><span style="color:#868ba3;">    예시) “만약 ○○라면, △△한다. 그렇지 않다면, ▽▽한다.”</span>`}
                      status={status}
                      historyId={historyId}
                      setImage={setServerImages}
                      initialMessages={initialMessages}
                      readOnly={isSolved}
                      setStatus={async (v) => {
                        setStatus(v);
                        if (v === 'success') {
                          setTimeout(async () => {
                            await saveSolution(true);
                            localStorage.setItem(
                              'shouldRefreshMissions',
                              'true',
                            );
                            if (onFinish) onFinish(true);
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
                      initialMessage={`2가지의 조건이 모두 반영되도록 새로운 조건문을 작성해주세요. <br><br>조건문은 다음과 같은 형식으로 작성해주세요!<br><span style="color:#868ba3; font-weight:500;">예시) “만약 ○○라면, △△한다. 그렇지 않다면, ▽▽한다.”</span>`}
                      status={status}
                      historyId={historyId}
                      setImage={setServerImages}
                      initialMessages={initialMessages}
                      readOnly={isSolved}
                      setStatus={async (v) => {
                        setStatus(v);
                        if (v === 'success') {
                          setTimeout(async () => {
                            await saveSolution(true);
                            localStorage.setItem(
                              'shouldRefreshMissions',
                              'true',
                            );
                            if (onFinish) onFinish(true);
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

export default MissionPage_02;

/* ---------- 스타일(기존 그대로) ---------- */
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
  border: 1px dashed var(--Gray-2, #868ba3);
  padding: 0.56rem 0.94rem;
`;
const KeyGroup = styled.div`
  display: flex;
  gap: 0.61rem;
`;
const SetLabel = styled.small`
  color: var(--Gray-2, #868ba3);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.75rem;
`;
const Arrow = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;
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
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;
const ImageItemBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 5.5rem;
    height: 9rem;
    object-fit: contain;
  }
`;
