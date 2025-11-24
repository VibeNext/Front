import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Dialog from "../components/common/Dialog.jsx";
import MissionCard from "../components/common/MissionCard";
import TopNavigation from "../components/common/TopNavigation";
import useAuthStore from "../stores/useAuthStore";

import AlertIcon from "../assets/icons/alert.png";
import LineIcon from "../assets/icons/line2.png";

const LearningStepPage = () => {
  const navigate = useNavigate();
  const { user, accessToken, isAuthenticated } = useAuthStore();


  const [chapters, setChapters] = useState([]);
  const [missions, setMissions] = useState([]);

  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentMission, setCurrentMission] = useState(null);

  const [loginDialog, setLoginDialog] = useState(false);
  const [lockDialog, setLockDialog] = useState(false);

  const [solutionHistory, setSolutionHistory] = useState([]);

  const containerRef = useRef(null);
  const itemRefs = useRef({});
  const [hoverId, setHoverId] = useState(null);

  const fetchMissions = async () => {
    try {
      const headers = {};
      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const API_BASE = import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_BASE}/missions`, { headers });
      const data = await res.json();

      const filteredChapters = data.chapter.filter((c) => c.id !== 3);
      const filteredMissions = data.mission.filter((m) => m.chapter !== 3);

      setChapters(filteredChapters);
      setMissions(filteredMissions);

      if (filteredChapters.length > 0) {
        setSelectedChapter(filteredChapters[0].id);
      }
    } catch (err) {
      console.error("❌ Failed to fetch missions:", err);
    }
  };

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hour = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${month}.${day} ${hour}:${min}`;
  };
  

  // 최초 1회 미션 불러오기
  useEffect(() => {
    fetchMissions();
  }, [accessToken]);

  useEffect(() => {
    const handler = () => fetchMissions();
    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);
  }, []);

  // 선택된 챕터의 미션 목록
  const chapterMissions = missions.filter((m) => m.chapter === selectedChapter);

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

      container.scrollTo({ left: centerPos, behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timer);
  }, [currentMission]);

  const clickMission = (m) => {
    // 로그인 여부는 accessToken으로 체크
    if (!isAuthenticated) {
      setLoginDialog(true);
      return;
    }

    // Step01-Mission01은 항상 unlock
    const alwaysOpen = m.chapter === 1 && Number(m.number) === 1;

    const unlocked = alwaysOpen ? true : (m.is_unlocked ?? false);

    if (!unlocked) {
      setLockDialog(true);
      return;
    }

    navigate(`/step/${m.chapter}/mission/${m.number}`);
  };


  const selectedMissionData = missions.find(
    (m) => m.id === currentMission
  );

  // 풀이기록 조회 GET /solutions/{mission_id}
  useEffect(() => {
    if (!selectedMissionData || !accessToken) return;

    const fetchHistory = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL;

        const res = await fetch(`${API_BASE}/solutions/${selectedMissionData.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await res.json();
        setSolutionHistory(data || []);
      } catch (err) {
        console.error("❌ Failed to fetch solution history:", err);
      }
    };

    fetchHistory();
  }, [selectedMissionData, accessToken]);
  
  useEffect(() => {
      const shouldRefresh = localStorage.getItem("shouldRefreshMissions");

      if (shouldRefresh === "true") {
        fetchMissions();                      // 미션 정보 최신화
        localStorage.removeItem("shouldRefreshMissions");
      }
    }, []);

  return (
    <SPageContainer>
      <TopNavigation />

      {/* 로그인 필요 */}
      <Dialog
        isOpen={loginDialog}
        title="로그인이 필요해요!"
        description={`학습을 시작하기 위해서
        회원가입 또는 로그인을 먼저 진행해주세요.`}
        buttonText="로그인하러 가기"
        onButtonClick={() => navigate("/login")}
        onClose={() => setLoginDialog(false)}
        icon={<img src={AlertIcon} alt="alert" style={{ width: "3rem" }} />}
      />

      {/* 미션 잠김 */}
      <Dialog
        isOpen={lockDialog}
        title="미션이 현재 잠겨 있어요!"
        description={`해당 미션을 진행하려면
        이전 학습 단계를 먼저 완료해주세요.`}
        buttonText="확인"
        onButtonClick={() => setLockDialog(false)}
        onClose={() => setLockDialog(false)}
        icon={<img src={AlertIcon} alt="alert" style={{ width: "3rem" }} />}
      />

      <SWrapper>
        {/* 챕터 탭 */}
        <ChapterTabs>
          {chapters.map((c, idx) => {
            const locked = getChapterLocked(c.id);
            const active = selectedChapter === c.id;

            return (
              <div key={c.id} style={{ display: "flex", alignItems: "center" }}>
                <ChapterTab
                  active={active}
                  locked={locked}
                  onClick={() => setSelectedChapter(c.id)}
                >
                  {c.title}
                </ChapterTab>

                {idx === 0 && chapters.length > 1 && (
                  <LineImg src={LineIcon} alt="line" />
                )}
              </div>
            );
          })}
        </ChapterTabs>

        {/* 챕터 소제목 */}
        <div style={{ display: "flex", gap: "11rem", marginTop: "3rem" }}>
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
                size={hoverId === m.id ? "large" : "small"}
                theme={m.is_unlocked ? "light" : "dark"}
                missionNumber={m.number}
                title={m.title}
                description={m.description}
                imageSrc={m.image}
              />
            </MissionWrapper>
          ))}
        </MissionContainer>

        {/* 풀이기록 */}
        {solutionHistory.length > 0 && (
          <RecordBox>
            {solutionHistory.map((h, idx) => (
              <p 
                key={h.id} 
                onClick={() => navigate(`/solution-history/${h.id}`)}
                style={{cursor: "pointer"}}
              >
                풀이 기록 {idx + 1} : {formatDate(h.created_at)}
              </p>
            ))}
          </RecordBox>

        )}
      </SWrapper>
    </SPageContainer>
  );
};

export default LearningStepPage;


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

  color: ${({ active }) => (active ? "#191927" : "#646879")};
`;

const SubTitle = styled.div`
  display: flex;
  color: #FFF;
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
    if (locked) return "rgba(196, 199, 211, 0.75)";                // 모두 잠김 (회색)
    if (active) return "var(--Brand-2, #7DB1FF)";                  // 하나라도 열림 + 선택됨 (파랑)
    return "var(--Brand-4, #B1D0FF)";                              // 하나라도 열림 + 선택 안 됨 (밝은 파랑)
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
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 1rem;
  text-align: center;
  font-family: Pretendard;
`;

const LineImg = styled.img`
  width: 12.5rem;
  height: 0.1875rem;
`;