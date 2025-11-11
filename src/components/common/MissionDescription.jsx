import styled from 'styled-components';
import commentIcon from '../../assets/icons/comment.png';
import lineIcon from '../../assets/icons/Line23.png';

const MissionDescription = ({ children }) => {
  return (
    <Wrapper>
      <Header>
        <HeaderIcon src={commentIcon}/>
        <HeaderText>문제 설명</HeaderText>
      </Header>

      <Line src={lineIcon} alt="divider" />

      {/* MissionPage에서 전달한 내용 렌더링 */}
      <Content>{children}</Content>
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
const Content = styled.div`
  padding: 1.75rem 1.5rem;
  color: var(--Black, #191927);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;
