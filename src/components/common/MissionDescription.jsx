import styled from 'styled-components';
import commentIcon from '../../assets/icons/comment.png';
import lineIcon from '../../assets/icons/Line23.png';

const MissionDescription = ({ instruction, images = [] }) => {
  return (
    <Wrapper>
      <Header>
        <HeaderIcon src={commentIcon}/>
        <HeaderText>문제 설명</HeaderText>
      </Header>

      <Line src={lineIcon} alt="divider" />

      {/* 문제 제목, 설명 */}
      <TextSection>
        <Instruction>{instruction}</Instruction>
      </TextSection>

      {/* 이미지 리스트 */}
      {images.length > 0 && (
        <ImageSection>
          {images.map((src, idx) => (
            <DescripImg key={idx} src={src} alt={`ingredient-${idx}`} />
          ))}
        </ImageSection>
      )}
    </Wrapper>
  );
};

export default MissionDescription;

//styled-components

const Wrapper = styled.div`
  width: 46.75rem;
  height: 24.375rem;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  background: #F5F5F7;
  overflow: hidden;
`;
//헤더
const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 24px;
  position: sticky;
  top: 0;
  z-index: 5;
  gap:12px;
`;

const HeaderIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const HeaderText = styled.h2`
  color: #191927;
  font-family: DungGeunMo;
  font-size: 20px;
  font-weight: 400;
`;

const Line = styled.img`
  width: 700px;
  height: 1px;
  padding-left: 24px;
`;

// 설명란
const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Instruction = styled.p`
  font-size: 1.125rem;
  color: #555;
  line-height: 1.6;
  margin: 0;
  white-space: pre-line;
  padding: 1.75rem 1.5rem 1.75rem 1.5rem;
`;

const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const DescripImg = styled.img`
  width: 90px;
  height: 90px;
  object-fit: contain;
  border-radius: 10px;
`;
