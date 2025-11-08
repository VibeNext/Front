import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import nextBlack from '../../assets/icons/next_black.png';
import nextGray from '../../assets/icons/next_gray.png';

const MissionHeader = ({ stepNumber, title, stepId }) => {
  const navigate = useNavigate();
  const { missionId } = useParams(); // 현재 경로 파라미터 읽기
  const steps = ['Mission 01', 'Mission 02', 'Mission 03'];

  const handleClick = (index) => {
    navigate(`/step/${stepId}/mission/${index + 1}`);
  };

  return (
    <Wrapper>
      <Container>
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
                alt="arrow"
              />
            )}
          </React.Fragment>
        ))}
      </Container>

      <Title>{title}</Title>
    </Wrapper>
  );
};

export default MissionHeader;


//styled-components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0rem 74.88rem 2.44rem 12.5rem ;
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
