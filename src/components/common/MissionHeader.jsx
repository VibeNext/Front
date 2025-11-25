import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import nextBlack from '../../assets/icons/next_black.png';
import nextGray from '../../assets/icons/next_gray.png';
import Button from '../../components/common/Button.jsx';

const MissionHeader = ({ stepNumber, title, stepId, status }) => {
  const navigate = useNavigate();
  const { missionId } = useParams(); // URL에서 온 ID (예: 11, 12, 13)
  const steps = ['Mission 01', 'Mission 02', 'Mission 03'];

  // 1️⃣ 현재 미션의 '순서 번호' 구하기 (11 -> 1, 12 -> 2, 13 -> 3)
  const currentId = Number(missionId);
  const currentNumber = currentId % 10;

  // 2️⃣ 미션 탭 클릭 시 이동 (예: Step 1, Index 0 -> 11번으로 이동)
  const handleClick = (index) => {
    // stepId가 1이면 -> 10 + (0+1) = 11
    // stepId가 2이면 -> 20 + (0+1) = 21
    const targetId = Number(stepId) * 10 + (index + 1);
    navigate(`/step/${stepId}/mission/${targetId}`);
  };

  // 3️⃣ “다음으로 / 학습 완료” 버튼 클릭 시 이동
  const handleNext = () => {
    if (status !== 'success') return;

    // 마지막 미션(3번)이면 학습 완료 페이지로
    if (currentNumber === 3) {
      navigate('/learningstep');
      return;
    }

    // 아니면 다음 ID로 이동 (11 -> 12, 12 -> 13)
    navigate(`/step/${stepId}/mission/${currentId + 1}`);
  };

  // 버튼 라벨 (3번 미션일 때만 '학습 완료')
  const buttonLabel = currentNumber === 3 ? '학습 완료' : '다음으로';

  return (
    <Wrapper>
      {/* 상단 경로 */}
      <TopRow>
        <StepBox>{stepNumber}</StepBox>

        {steps.map((label, index) => (
          <React.Fragment key={index}>
            <StepItem
              // 현재 번호(1,2,3)와 인덱스+1이 같으면 활성화
              active={currentNumber === index + 1}
              onClick={() => handleClick(index)}
            >
              {label}
            </StepItem>
            {index < steps.length - 1 && (
              <Arrow
                src={
                  // 화살표 색상 로직도 1의 자리 숫자로 비교
                  currentNumber === index + 1 || currentNumber === index + 2
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

/* ---------------- styles (기존과 동일) ---------------- */
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
