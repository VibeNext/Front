import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import nextBlack from '../../assets/icons/next_black.png';
import nextGray from '../../assets/icons/next_gray.png';
import Button from '../../components/common/Button.jsx';

const MissionHeader = ({ stepNumber, title, stepId, status }) => {
  const navigate = useNavigate();
  const { missionId } = useParams();
  const steps = ['Mission 01', 'Mission 02', 'Mission 03'];

  // 미션 클릭 시 이동
  const handleClick = (index) => {
    navigate(`/step/${stepId}/mission/${index + 1}`);
  };

  // “다음으로 / 학습 완료” 버튼 클릭 시 이동
  const handleNext = () => {
    if (status !== 'success') return;

    const currentMission = Number(missionId);

    // mission3 → 학습 완료 → /learningstep 이동
    if (currentMission === 3) {
      navigate('/learningstep');
      return;
    }

    // mission1 → 2, mission2 → 3
    navigate(`/step/${stepId}/mission/${currentMission + 1}`);
  };

  // mission3이면 버튼 이름 변경
  const buttonLabel = Number(missionId) === 3 ? '학습 완료' : '다음으로';

  return (
    <Wrapper>
      {/* 상단 경로 */}
      <TopRow>
        <StepBox>{stepNumber}</StepBox>

        {steps.map((label, index) => (
          <React.Fragment key={index}>
            <StepItem
              active={Number(missionId) === index + 1}
              onClick={() => handleClick(index)}
            >
              {label}
            </StepItem>
            {index < steps.length - 1 && (
              <Arrow
                src={
                  Number(missionId) === index + 1 ||
                  Number(missionId) === index + 2
                    ? nextBlack
                    : nextGray
                }
                alt='arrow'
              />
            )}
          </React.Fragment>
        ))}
      </TopRow>

      {/* 하단 제목 + 버튼 */}
      <BottomRow>
        <Title>{title}</Title>
        <NextButton disabled={status !== 'success'} onClick={handleNext}>
          {buttonLabel}
        </NextButton>
      </BottomRow>
    </Wrapper>
  );
};

export default MissionHeader;

/* ---------------- styles ---------------- */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 0rem 12.5rem 2rem 12.5rem;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StepBox = styled.div`
  background-color: #7db1ff;
  color: #fff;
  font-family: 'DungGeunMo', sans-serif;
  padding: 6px 18px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 400;
  user-select: none;
  pointer-events: none;
  margin-right: 16px;
`;

const StepItem = styled.span`
  color: ${({ active }) => (active ? '#191927' : '#868BA3')};
  font-weight: ${({ active }) => (active ? 500 : 400)};
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #191927;
  }
`;

const Arrow = styled.img`
  width: 24px;
  height: 24px;
  margin-top: 3.5px;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-family: 'DungGeunMo', sans-serif;
  font-size: 36px;
  color: #191927;
  font-weight: 400;
  margin: 0;
`;

const NextButton = styled(Button)`
  display: inline-flex;
  padding: 0.75rem 1.25rem;
  font-size: 1.25rem;
  font-weight: 400;
  border-radius: 1rem;
  height: 3.375rem;
  width: 7.5rem;
`;
