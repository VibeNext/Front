import React, { useState } from 'react';
import styled from 'styled-components';
import nextBlack from '../../assets/icons/next_black.png';
import nextGray from '../../assets/icons/next_gray.png';

const MissionStepNav = ({ initialStep = 1, onStepChange, stepNumber, title}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const steps = ['Mission 01', 'Mission 02', 'Mission 03'];

  const handleClick = (index) => {
    setCurrentStep(index + 1);
    if (onStepChange) onStepChange(index + 1);
  };

  return (
    <Wrapper>
      <Container>
        <StepBox>{stepNumber}</StepBox>

        {steps.map((label, index) => (
          <React.Fragment key={index}>
            <StepItem
              active={currentStep === index + 1}
              onClick={() => handleClick(index)}
            >
              {label}
            </StepItem>
            {index < steps.length - 1 && (
              <Arrow
                src={currentStep === index + 1 ? nextBlack : nextGray}
                alt="arrow"
              />
            )}
          </React.Fragment>
        ))}
      </Container>

      {/* 아래 제목 영역 추가 */}
      <Title>{title}</Title>
    </Wrapper>
  );
};

export default MissionStepNav;


//styled-components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 30px;
  border-radius: 12px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StepBox = styled.div`
  background-color: #7DB1FF;
  color: #fff;
  font-family: 'DungGeunMo', sans-serif;
  padding: 6px 18px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 400;
  user-select: none;
  pointer-events: none; //클릭 차단 
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

const Title = styled.h2`
  font-family: 'DungGeunMo', sans-serif;
  font-size: 36px;
  color: #191927;
  font-weight: 400;
  margin: 0;
`;
