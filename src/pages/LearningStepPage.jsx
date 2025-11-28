import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Dialog from '../components/common/Dialog.jsx';
import MissionCard from '../components/common/MissionCard';
import TopNavigation from '../components/common/TopNavigation';
import useAuthStore from '../stores/useAuthStore';

import AlertIcon from '../assets/icons/alert.png';
import LineIcon from '../assets/icons/line2.png';

import { authClient } from '../apis/instance';

const LearningStepPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isAuthenticated } = useAuthStore();
  const grantType = user?.grantType;
  const accessToken = user?.accessToken;

  const [chapters, setChapters] = useState([]);
  const [missions, setMissions] = useState([]);

  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentMission, setCurrentMission] = useState(null);

  const [loginDialog, setLoginDialog] = useState(false);
  const [lockDialog, setLockDialog] = useState(false);

  const [historyMap, setHistoryMap] = useState({});

  const containerRef = useRef(null);
  const itemRefs = useRef({});
  const [hoverId, setHoverId] = useState(null);

  const fetchMissions = async () => {
    try {
      const headers = {};
      if (accessToken) {
        headers['Authorization'] = `${grantType} ${accessToken}`;
      }

      const API_BASE = import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_BASE}/missions`, { headers });
      const data = await res.json();

      // 📌 응답 전체 로그
      console.log('📌 Missions API Raw Response:', data);

      // 📌 mission 배열만 따로 확인
      console.log('📌 Missions List:', data.mission);

      const filteredChapters = data.chapter.filter((c) => c.id !== 3);
      const filteredMissions = data.mission.filter((m) => m.chapter !== 3);

      setChapters(filteredChapters);
      setMissions(filteredMissions);

      // (추가) 미션 로딩 후 각 미션 히스토리 병렬로 불러오기
      fetchAllHistories(filteredMissions);

      if (filteredChapters.length > 0) {
        setSelectedChapter(filteredChapters[0].id);
      }
    } catch (err) {
      console.error('❌ Failed to fetch missions:', err);
    }
  };

  // ⭐ 각 미션의 풀이 기록 불러오는 함수
  const fetchAllHistories = async (missions) => {
    const API_BASE = import.meta.env.VITE_API_URL;

    const promises = missions.map(async (m) => {
      try {
        const res = await fetch(`${API_BASE}/solutions/${m.id}`, {
          headers: {
            Authorization: `${grantType} ${accessToken}`,
          },
        });

        const data = await res.json();
        return { missionId: m.id, history: data || [] };
      } catch (err) {
        console.error(`❌ 히스토리 가져오기 실패: mission ${m.id}`, err);
        return { missionId: m.id, history: [] };
      }
    });

    const results = await Promise.all(promises);

    const map = {};
    results.forEach((r) => {
      map[r.missionId] = r.history;
    });

    setHistoryMap(map); // 저장
  };

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hour = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${month}.${day} ${hour}:${min}`;
  };

  // 최초 1회 미션 불러오기
  useEffect(() => {
    fetchMissions();
  }, [accessToken]);

  useEffect(() => {
    const handler = () => fetchMissions();
    window.addEventListener('focus', handler);
    return () => window.removeEventListener('focus', handler);
  }, []);

  // [수정 1] 무한 루프 방지를 위해 useMemo 사용
  const chapterMissions = useMemo(() => {
    return missions.filter((m) => m.chapter === selectedChapter);
  }, [missions, selectedChapter]);

<<<<<<< HEAD
    if (incomingId) {
      const parsed = Number(incomingId);
      if (!isNaN(parsed)) {
        console.log('📌 기존 historyId 재사용:', parsed);
        setHistoryId(parsed);
=======
  const getChapterLocked = (chapterId) => {
    const ms = missions.filter((m) => m.chapter === chapterId);

    if (!accessToken) return true;

    return ms.every((m) => m.is_unlocked === false);
  };

  // 챕터 바뀌면 첫 번째 미션 선택
  useEffect(() => {
    if (chapterMissions.length > 0) {
      setCurrentMission(chapterMissions[0].id);
    }
  }, [selectedChapter, chapterMissions]);

  // 현재 미션 중앙으로 스크롤 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      const container = containerRef.current;
      const el = itemRefs.current[currentMission];

      if (!container || !el) return;

      const centerPos =
        el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2;

      container.scrollTo({ left: centerPos, behavior: 'smooth' });
    }, 100);

    return () => clearTimeout(timer);
  }, [currentMission]);

  // [수정 2] 클릭 시 미리 API 호출하여 ID 생성 후 이동
  const clickMission = async (m) => {
    // 1. 로그인 체크
    if (!isAuthenticated) {
      setLoginDialog(true);
      return;
    }

    // 2. 잠금 체크
    const alwaysOpen = m.chapter === 1 && Number(m.number) === 1;
    const unlocked = alwaysOpen ? true : (m.is_unlocked ?? false);

    if (!unlocked) {
      setLockDialog(true);
      return;
    }

    // 3. 풀이 기록 생성 API 호출
    try {
      console.log(`📡 풀이 기록 생성 요청: Mission ID ${m.id}`);

      // POST /solutions/ 요청
      const res = await authClient.post(`/solutions/${m.id}/`, {});
      const createdHistoryId =
        res.data.id || res.data.solution_id || res.data.history_id;
      console.log('🎉 생성된 History ID:', createdHistoryId);

      if (!createdHistoryId) {
        alert('서버에서 ID를 받아오지 못했습니다.');
>>>>>>> 1be0aedef23d66028c6d7dacf90f1fbb1ae12dab
        return;
      }

<<<<<<< HEAD
    // 새 기록 생성
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

        if (newId) setHistoryId(newId);
      } catch (err) {
        console.error('❌ 기록 생성 실패:', err);
      }
    };
    createHistory();
  }, [missionBackendId, location.state, queryHistoryId]);

  /* 🔥 추가: 기존 풀이 기록 상세조회 */
  useEffect(() => {
    if (!historyId) return;

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
  }, [historyId]);

  const saveSolution = async (isSolved) => {
    if (!historyId) return;
    try {
      const res = await authClient.patch(`/solutions/update/${historyId}`, {
        is_solved: isSolved,
=======
      // 4. ID를 가지고 페이지 이동 (state로 전달)
      navigate(`/step/${m.chapter}/mission/${m.id}`, {
        state: { historyId: createdHistoryId },
>>>>>>> 1be0aedef23d66028c6d7dacf90f1fbb1ae12dab
      });
    } catch (err) {
      console.error('❌ 풀이 기록 생성 실패:', err);
      alert('미션 시작 중 오류가 발생했습니다.');
    }
  };

  const selectedMissionData = missions.find((m) => m.id === currentMission);

  useEffect(() => {
    const shouldRefresh = localStorage.getItem('shouldRefreshMissions');

    if (shouldRefresh === 'true') {
      fetchMissions();
      localStorage.removeItem('shouldRefreshMissions');
    }
  }, [location.pathname]);

  return (
    <SPageContainer>
      <TopNavigation />

      {/* 로그인 필요 */}
      <Dialog
        isOpen={loginDialog}
        title='로그인이 필요해요!'
        description={`학습을 시작하기 위해서
        회원가입 또는 로그인을 먼저 진행해주세요.`}
        buttonText='로그인하러 가기'
        onButtonClick={() => navigate('/login')}
        onClose={() => setLoginDialog(false)}
        icon={<img src={AlertIcon} alt='alert' style={{ width: '3rem' }} />}
      />

      {/* 미션 잠김 */}
      <Dialog
        isOpen={lockDialog}
        title='미션이 현재 잠겨 있어요!'
        description={`해당 미션을 진행하려면
        이전 학습 단계를 먼저 완료해주세요.`}
        buttonText='확인'
        onButtonClick={() => setLockDialog(false)}
        onClose={() => setLockDialog(false)}
        icon={<img src={AlertIcon} alt='alert' style={{ width: '3rem' }} />}
      />

<<<<<<< HEAD
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
=======
      <SWrapper>
        {/* 챕터 탭 */}
        <ChapterTabs>
          {chapters.map((c, idx) => {
            const locked = getChapterLocked(c.id);
            const active = selectedChapter === c.id;

            return (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center' }}>
                <ChapterTab
                  active={active}
                  locked={locked}
                  onClick={() => setSelectedChapter(c.id)}
                >
                  {c.title}
                </ChapterTab>

                {idx === 0 && chapters.length > 1 && (
                  <LineImg src={LineIcon} alt='line' />
                )}
              </div>
            );
          })}
        </ChapterTabs>

        {/* 챕터 소제목 */}
        <div style={{ display: 'flex', gap: '11rem', marginTop: '3rem' }}>
          {chapters.map((c) => {
            const active = selectedChapter === c.id;
            const locked = getChapterLocked(c.id);

            return (
              <SubTitle
                key={c.id}
                active={active}
                locked={locked}
                onClick={() => setSelectedChapter(c.id)}
              >
                {c.subtitle}
              </SubTitle>
            );
          })}
        </div>

        {/* 미션 카드 */}
        <MissionContainer ref={containerRef}>
          {chapterMissions.map((m) => (
            <MissionWrapper
              key={m.id}
              onMouseEnter={() => setHoverId(m.id)}
              onMouseLeave={() => setHoverId(null)}
              onClick={() => clickMission(m)}
              ref={(el) => (itemRefs.current[m.id] = el)}
            >
              <MissionCard
                size={hoverId === m.id ? 'large' : 'small'}
                theme={m.is_unlocked ? 'light' : 'dark'}
                missionNumber={m.number}
                title={m.title}
                description={m.description}
                imageSrc={m.image}
              />

              {/* ⭐ 각 미션 카드 아래 자신의 풀이기록 표시 */}
              {historyMap[m.id] && historyMap[m.id].length > 0 && (
                <RecordBox>
                  {historyMap[m.id].map((h, idx) => (
                    <p
                      key={h.id}
                      onClick={() =>
                        navigate(
                          `/step/${m.chapter}/mission/${m.id}?historyId=${h.id}`,
                          {
                            state: {
                              historyId: h.id, // 기존
                              isSolved: h.is_solved, // 추가
                            },
                          },
                        )
                      }
                      style={{ cursor: 'pointer' }}
                    >
                      풀이 기록 {idx + 1} : {formatDate(h.updated_at)}
                    </p>
                  ))}
                </RecordBox>
              )}
            </MissionWrapper>
          ))}
        </MissionContainer>
      </SWrapper>
    </SPageContainer>
>>>>>>> 1be0aedef23d66028c6d7dacf90f1fbb1ae12dab
  );
};

export default LearningStepPage;

/* 스타일 컴포넌트 (기존과 동일) */
const SPageContainer = styled.div`
  background: linear-gradient(180deg, #fff 0%, #b1d0ff 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const SWrapper = styled.div`
  position: relative;
  padding-top: 6.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChapterTabs = styled.div`
  display: flex;
  justify-content: center;
`;

const ChapterTab = styled.button`
  color: var(--Black, #191927);
  font-family: DungGeunMo;
  font-size: 2.75rem;
  cursor: pointer;
  margin-left: 4.5rem;
  margin-right: 4.5rem;

  color: ${({ active }) => (active ? '#191927' : '#646879')};
`;

const SubTitle = styled.div`
  display: flex;
  color: #fff;
  font-family: Pretendard;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  padding: 0.88rem 2rem;
  border-radius: 1rem;
  border: none;
  background-color: ${({ locked, active }) => {
    if (locked) return 'rgba(196, 199, 211, 0.75)';
    if (active) return 'var(--Brand-2, #7DB1FF)';
    return 'var(--Brand-4, #B1D0FF)';
  }};
`;

const MissionContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  gap: 2rem;

  overflow-x: scroll;
  scrollbar-width: none;
  overflow: visible;

  padding: 2rem 0;

  width: 100%;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const MissionWrapper = styled.div`
  flex-shrink: 0;
  cursor: pointer;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center; /* 카드 + 기록 모두 중앙정렬 */

  overflow: visible;

  transition:
    transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1),
    opacity 0.3s ease,
    margin 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);

  transform-origin: center center;

  margin-left: 2rem;
  margin-right: 2rem;

  &:hover {
    transform: scale(1.15);
  }
`;

const RecordBox = styled.div`
  margin: auto;
  margin-top: 3.25rem;
  display: inline-flex;
  padding: 24px 36px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 16px;
  border: 2px solid #fff;
  background: var(
    --,
    linear-gradient(
      180deg,
      rgba(134, 139, 163, 0.05) 0%,
      rgba(134, 139, 163, 0.2) 100%
    )
  );
  color: var(--Gray-1, #646879);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 30px */
`;

const LineImg = styled.img`
  width: 12.5rem;
  height: 0.1875rem;
`;
<<<<<<< HEAD

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
=======
>>>>>>> 1be0aedef23d66028c6d7dacf90f1fbb1ae12dab
