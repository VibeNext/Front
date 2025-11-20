import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Dialog from "../components/common/Dialog.jsx";
import MissionCard from "../components/common/MissionCard";
import TopNavigation from "../components/common/TopNavigation";
import useAuthStore from "../stores/useAuthStore";

import AlertIcon from "../assets/icons/alert.png";
import LineIcon from "../assets/icons/line2.png";

/* ------ MOCK DATA ------ */
const mockData = {
  chapter: [
    { id: 1, title: "순차", subtitle: "요리사의 레시피" },
    { id: 2, title: "조건", subtitle: "건축가의 잠금장치" }
  ],
  mission: [
    { id: 11, chapter: 1, number: "01", title: "토마토 스프", isUnlocked: true },
    { id: 12, chapter: 1, number: "02", title: "버섯 스프", isUnlocked: true },
    { id: 13, chapter: 1, number: "03", title: "손님의 스프", isUnlocked: true },

    { id: 21, chapter: 2, number: "01", title: "하나의 열쇠로만", isUnlocked: true },
    { id: 22, chapter: 2, number: "02", title: "고장난 잠금장치", isUnlocked: false },
    { id: 23, chapter: 2, number: "03", title: "이중 잠금", isUnlocked: false },
  ]
};


// 특정 chapter가 잠긴 상태인지 반환
const isChapterLocked = (chapterId) => {
  const missions = mockData.mission.filter((m) => m.chapter === chapterId);
  return missions.every((m) => !m.isUnlocked);
};

const LearningStepPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [selectedChapter, setSelectedChapter] = useState(1);
  const [currentMission, setCurrentMission] = useState(null);

  const [loginDialog, setLoginDialog] = useState(false);
  const [lockDialog, setLockDialog] = useState(false);

  const containerRef = useRef(null);
  const itemRefs = useRef({});

  const missions = mockData.mission.filter((m) => m.chapter === selectedChapter);

  const [hoverId, setHoverId] = useState(null);

  useEffect(() => {
    setCurrentMission(missions[0]?.id);
  }, [selectedChapter]);

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
    // 1) 비로그인
    if (!user) {
      setLoginDialog(true);
      return;
    }

    // 2) 로그인했지만 잠김
    if (!m.isUnlocked) {
      setLockDialog(true);
      return;
    }

    // 3) 로그인 + 열림 → 학습 페이지 이동
    navigate(`/learning/${m.id}`);
  };


  const selectedMissionData = missions.find((m) => m.id === currentMission);

  return (
    <SPageContainer>
      <TopNavigation />

      <Dialog
        isOpen={loginDialog}
        title="로그인이 필요해요!"
        description={"학습을 시작하기 위해서\n회원가입 또는 로그인을 먼저 진행해주세요."}
        buttonText="로그인하러 가기"
        onButtonClick={() => navigate("/login")}
        onClose={() => setLoginDialog(false)}
        icon={<img src={AlertIcon} alt="alert" style={{ width: "3rem", height: "3rem", marginTop: "1.5rem" }} />}
      />

      <Dialog
        isOpen={lockDialog}
        title="미션이 현재 잠겨 있어요!"
        description="해당 미션을 진행하려면\n이전 학습 단계를 먼저 완료해주세요."
        buttonText="확인"
        onButtonClick={() => setLockDialog(false)}
        onClose={() => setLockDialog(false)}
        icon={<img src={AlertIcon} alt="alert" style={{ width: "3rem", height: "3rem" }} />}
      />

      <SWrapper>
        <ChapterTabs>
          {mockData.chapter.map((c, idx) => {
            const locked = isChapterLocked(c.id);
            const active = selectedChapter === c.id;

            return (
              <div key={c.id} style={{ display: "flex", alignItems: "center" }}>
                {/* 챕터 텍스트 */}
                <ChapterTab
                  active={active}
                  locked={locked}
                  onClick={() => setSelectedChapter(c.id)}
                >
                  {c.title}
                </ChapterTab>

                {idx === 0 && mockData.chapter.length > 1 && (
                  <LineImg
                    src={LineIcon} alt="line"
                  />
                )}
              </div>
            );
          })}
        </ChapterTabs>


        <div style={{ display: "flex", gap: "11.25rem", marginTop: "3.13rem" }}>
          {mockData.chapter.map((c) => {
            const active = selectedChapter === c.id;
            const locked = isChapterLocked(c.id);

            return (
              <SubTitle
                key={c.id}
                active={active}
                locked={locked}
                onClick={() => setSelectedChapter(c.id)}
                style={{ cursor: "pointer" }}
              >
                {c.subtitle}
              </SubTitle>
            );
          })}
        </div>



        <MissionContainer ref={containerRef}>
          {missions.map((m) => {
            return (
              <MissionWrapper
              key={m.id}
              onMouseEnter={() => setHoverId(m.id)}
              onMouseLeave={() => {
                if (!loginDialog && !lockDialog) {
                  setHoverId(null);
                }
              }}
              onClick={() => clickMission(m)}
            >
              <MissionCard
                size={hoverId === m.id ? "large" : "small"}
                theme={m.isUnlocked ? "light" : "dark"}
                missionNumber={m.number}
                title={m.title}
                description={m.description}
                imageSrc={m.image}
              />
            </MissionWrapper>

            );
          })}
        </MissionContainer>

        {/* 풀이 기록 */}
        {selectedMissionData?.history && (
          <RecordBox>
            <p>풀이 기록 1 : 11.03 18:23</p>
            <p>풀이 기록 2 : 11.03 20:23</p>
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
