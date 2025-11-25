// Step 03 반복 페이지

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AnswerChat from '../components/common/AnswerChat.jsx';
import AnswerCheckContainer from '../components/common/AnswerCheckContainer/AnswerCheck.jsx';
import MissionDescription from '../components/common/MissionDescription.jsx';
import MissionHeader from '../components/common/MissionHeader.jsx';
import TopNavigation from '../components/common/TopNavigation.jsx';
import useAuthStore from '../stores/useAuthStore';

import robotTaleImg from '../assets/icons/robot_tail.png';
import trashTaleImg from '../assets/icons/trash_tail.png';
//import tailImg from '../assets/icons/orinigal_tail.png';
import botIcon from '../assets/icons/bot3.png';
import mission2Img from '../assets/icons/missionpage_3/3-2.svg';
import mission3Img from '../assets/icons/missionpage_3/3-3.svg';

import defaultImg from '../assets/icons/missionpage_3/default3.svg';

const MissionPage_03 = ({ onFinish }) => {
  const [status, setStatus] = useState('default');
  const { missionId } = useParams();
  const mission = Number(missionId);

  const { accessToken } = useAuthStore();
  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setStatus('default');
  }, [missionId]);

  // ⭐ POST /solutions (풀이 저장)
  const saveSolution = async () => {
    try {
      const res = await fetch(`${API_BASE}/solutions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          mission_id: Number(missionId),
          status: 'success',
        }),
      });

      const data = await res.json();
      console.log('📌 Step03 풀이 저장 성공:', data);
    } catch (err) {
      console.error('❌ Step03 풀이 저장 실패:', err);
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
            <p>
              똑똑한 당신은 로봇 개발자! 오늘은 로봇 청소기를 개발하고 있어요.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              아래 그림을 보고, 로봇이 모든 쓰레기를 청소할 수 있도록 명령을
              입력해보세요.
            </p>
            <p style={{ color: '#868BA3' }}>
              * 이 로봇 청소기는 한 번에 한 가지 일만 할 수 있어요.
            </p>
            <p style={{ color: '#868BA3' }}>
              ** '앞으로 한 칸 이동'하거나 ‘현재 위치한 한 칸만 청소’할 수
              있어요.
            </p>
            <ImageRow>
              <ImageItem>
                <img src={robotTaleImg} alt='로봇 청소기' />
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
            <p style={{ marginBottom: '1rem' }}>
              로봇 청소기 반복문이 잘못된 이유를 설명하고, 모든 쓰레기를
              청소하도록 새로운 반복문을 작성해봅시다!
            </p>
            <p style={{ color: '#868BA3' }}>
              * 이 로봇 청소기는 한 번에 한 가지 일만 할 수 있어요.
            </p>
            <p style={{ color: '#868BA3' }}>
              ** ‘앞으로 한 칸 이동’하거나 ‘회전(왼쪽/오른쪽 90도)’할 수 있어요.
            </p>

            <ImageWrapper>
              <img src={mission2Img} alt='미션2 문제풀이' />
            </ImageWrapper>
          </>
        );

      case 3:
        return (
          <>
            <p>이번에는 지그재그로 놓인 쓰레기를 모두 청소해야 해요!</p>
            <p style={{ marginBottom: '1rem' }}>
              아래 그림을 보고, 모든 쓰레기를 깨끗이 청소하도록 새로운 반복문을
              직접 작성해봅시다!
            </p>
            <p style={{ color: '#868BA3' }}>
              * 이 로봇 청소기는 한 번에 한 가지 일만 할 수 있어요.
            </p>
            <p style={{ color: '#868BA3' }}>
              ** ‘앞으로 한 칸 이동’하거나 ‘회전(왼쪽/오른쪽 90도)’할 수 있어요.
            </p>
            <ImageWrapperZigzag>
              <img src={mission3Img} alt='로봇 청소기 3단계 문제' />
            </ImageWrapperZigzag>
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
          stepNumber='03 반복'
          title={
            mission === 1
              ? '개발자의 로봇청소기: 직선'
              : mission === 2
                ? '개발자의 로봇청소기: 2x2'
                : '개발자의 로봇청소기: 지그재그'
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

          {/* 오른쪽: 문제 풀이 */}
          <RightPanel>
            {(() => {
              switch (mission) {
                case 1:
                  return (
                    <AnswerChat
                      key={missionId}
                      botIcon={botIcon}
                      initialMessage={`같은 일을 여러 번 해야 할 땐, 똑같은 명령을 여러 번 쓰는 대신 이렇게 작성해보세요!<br><span style="color:#868ba3;">예시) “(행동)을 N번 반복한다.”</span>`}
                      correctMessage={`<strong style="color:#37AF00;">정답입니다!</strong><br><br>훌륭한 개발이었어요! 로봇 청소기가 모든 쓰레기를 깨끗하게 청소했어요.<br><span style="color:#868ba3; font-weight:500;">'(앞으로 이동하고, 청소하기)를 5번 반복한다’는 내용을 포함한다면 정답으로 인정됩니다.</span>`}
                      wrongMessage={`<strong style="color:#FF644F;">오답입니다!</strong><br><br>반복문을 다시 점검해주세요.<br><span style="color:#868ba3; font-weight:500;">* 피드백 문장 (해당 반복문이 왜 잘못되었을까요? 반복문을 작성할 때는 반복할 행동과 횟수가 모두 정확해야 한다는 사실을 기억해요!)</span>`}
                      status={status}
                      setStatus={async (v) => {
                        setStatus(v);

                        if (v === 'success') {
                          setTimeout(async () => {
                            await saveSolution();
                            localStorage.setItem(
                              'shouldRefreshMissions',
                              'true',
                            );
                            onFinish(true);
                          }, 1200); // 메시지 자연스럽게 보이게 1.2초
                        }

                        if (v === 'fail') {
                          setTimeout(() => {
                            onFinish(false);
                          }, 1200); // ⬅ 1.2초 메시지 유지
                        }
                      }}
                    />
                  );

                case 2:
                  return (
                    <AnswerChat
                      key={missionId}
                      botIcon={botIcon}
                      initialMessage={`주어진 반복문이 잘못된 이유와 새로운 반복문을 모두 작성해주세요.<br><br>1. 잘못된 이유는 이렇게 작성해볼 수 있어요!<br><span style="color:#868ba3;">    예시) “지금 반복문은 ~라서 로봇 청소기가 제대로 작동하지 않아요.”</span><br><br>2. 반복문을 쓸 때는 ‘무엇을 얼마나 반복할지’가 정확해야 해요.<br>    반복하는 행동, 방향 혹은 횟수가 잘못되면, 결과도 완전히 달라질 수 있어요!<br><span style="color:#868ba3;">    예시) “(행동 → 방향)을 N번 반복한다.”</span>`}
                      correctMessage={`<strong style="color:#37AF00;">정답입니다!</strong><br><br>와! 로봇 청소기가 다시 정상적으로 작동하고 있어요. 그럼 마지막 단계로 넘어가서 개발의 고수가 되어볼까요?<br><span style="color:#868ba3; font-weight:500;">1. 반복문이 잘못된 이유를 정확히 찾아 설명한다면 정답으로 인정됩니다.</span><br><span style="color:#868ba3; font-weight:500;">2. 로봇 청소기가 모든 쓰레기를 청소하도록 새로운 조건문을 작성한다면 정답으로 인정됩니다. </span>`}
                      wrongMessage={`<strong style="color:#FF644F;">오답입니다!</strong><br><br>작성한 답변을 다시 점검해주세요.<br><span style="color:#868ba3; font-weight:500;">1. 피드백 문장 (반복문을 작성할 때는 반복할 행동과 횟수뿐만 아니라, 방향까지 모두 정확해야 한다는 사실을 기억해요!)</span><br><span style="color:#868ba3; font-weight:500;">2. 피드백 문장 (해당 반복문이 왜 잘못되었을까요? 반복문을 작성할 때는 반복할 행동과 횟수뿐만 아니라, 방향까지 모두 정확해야 한다는 사실을 기억해요!)</span>`}
                      status={status}
                      setStatus={async (v) => {
                        setStatus(v);

                        if (v === 'success') {
                          setTimeout(async () => {
                            await saveSolution();
                            localStorage.setItem(
                              'shouldRefreshMissions',
                              'true',
                            );
                            onFinish(true);
                          }, 1200); // 메시지 자연스럽게 보이게 1.2초
                        }

                        if (v === 'fail') {
                          setTimeout(() => {
                            onFinish(false);
                          }, 1200); // ⬅ 1.2초 메시지 유지
                        }
                      }}
                    />
                  );

                case 3:
                  return (
                    <AnswerChat
                      key={missionId}
                      botIcon={botIcon}
                      initialMessage={`문제에 맞는 새로운 반복문을 작성해주세요.<br>이번에는 청소 후에 회전하는 동작도 함께 반복해야 해요.<br><br>복잡한 반복문은 이렇게 작성해보세요.<br><span style="color:#868ba3; font-weight:500;">예시)  “(동작 1 → 동작 2 → 동작 3)을 N번 반복한다.”</span>`}
                      correctMessage={`<strong style="color:#37AF00;">지그재그로 놓여있던 모든 쓰레기가 완벽히 청소되었어요!</strong><br><br>로봇 청소기의 반복된 동작과 횟수, 방향까지 완벽히 컨트롤할 수 있는 당신은 개발의 고수!<br><span style="color:#868ba3; font-weight:500;">‘(앞으로 이동하고, 청소하고, 오른쪽(또는 왼쪽)으로 회전하고, 앞으로 이동하고, 청소하고, 반대 방향으로 회전하기)를 3번 반복한다'는 내용을 포함한다면 정답으로 인정됩니다.</span>`}
                      wrongMessage={`<strong style="color:#FF644F;">아직 쓰레기가 모두 치워지지 않았어요!</strong><br><br>반복문을 다시 점검해주세요.<br><span style="color:#868ba3; font-weight:500;">* 피드백 문장 (해당 반복문이 왜 잘못되었을까요? 반복문을 작성할 때는 반복할 동작과 횟수뿐만 아니라, 방향까지 모두 정확해야 한다는 사실을 기억해요!)</span>`}
                      status={status}
                      setStatus={async (v) => {
                        setStatus(v);

                        if (v === 'success') {
                          setTimeout(async () => {
                            await saveSolution();
                            localStorage.setItem(
                              'shouldRefreshMissions',
                              'true',
                            );
                            onFinish(true);
                          }, 1200); // 메시지 자연스럽게 보이게 1.2초
                        }

                        if (v === 'fail') {
                          setTimeout(() => {
                            onFinish(false);
                          }, 1200); // ⬅ 1.2초 메시지 유지
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
  margin-top: 2.64rem;
`;
const ImageItem = styled.div`
  width: 6rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;

  /* 여백 완전 제거 */
  margin: 0;
  padding: 0;

  /* 인접 타일 사이 공백 제거 */
  &:not(:last-child) {
    margin-right: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  img {
    width: 100%;
    max-width: 600px;
    height: auto;
    object-fit: contain;
  }
`;

// 기존 ImageWrapper 그대로 두고, 아래에 추가
const ImageWrapperZigzag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  img {
    width: 387.7998046875px;
    height: 145.2285919189453px;
    max-width: 90%;
    max-height: 380px;
    object-fit: contain;
    display: block;
  }
`;
