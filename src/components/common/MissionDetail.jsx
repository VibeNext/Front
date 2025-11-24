import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import MissionPage_01 from '../../pages/MissionPage_01.jsx';
import MissionPage_02 from '../../pages/MissionPage_02.jsx';
import MissionPage_03 from '../../pages/MissionPage_03.jsx';

import { createSolution, getMissionDetail, patchSolution } from '../../services/api';

const MissionDetail = () => {
  const { missionId } = useParams();
  const navigate = useNavigate();

  const [mission, setMission] = useState(null);
  const [solutionId, setSolutionId] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1) 미션 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMissionDetail(missionId);
        setMission(data);

        // 2) 풀이기록 생성 POST /solutions/{missionId}
        const res = await createSolution(missionId);
        setSolutionId(res.solution_history_id);

        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("미션을 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchData();
  }, [missionId]);

  // 3) MissionPage에서 풀이 종료 시 실행됨
  const handleFinish = async (isSolved) => {
    try {
      await patchSolution(solutionId, isSolved);
      navigate(`/solution/${solutionId}`);
    } catch (err) {
      console.error(err);
      alert("풀이기록 저장 중 오류 발생");
    }
  };

  const renderMissionPage = () => {
    if (!mission) return null;

    const step = Number(mission.step_id);

    switch (step) {
      case 1:
        return (
          <MissionPage_01
            mission={mission}
            solutionId={solutionId}
            onFinish={handleFinish}
          />
        );
      case 2:
        return (
          <MissionPage_02
            mission={mission}
            solutionId={solutionId}
            onFinish={handleFinish}
          />
        );
      case 3:
        return (
          <MissionPage_03
            mission={mission}
            solutionId={solutionId}
            onFinish={handleFinish}
          />
        );
      default:
        return <div>잘못된 미션입니다.</div>;
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <Wrapper>
      {/* ❌ TopNavigation 삭제 */}
      {renderMissionPage()}
    </Wrapper>
  );
};

export default MissionDetail;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #fff;
`;
