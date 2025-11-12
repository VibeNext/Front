import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TopNavigation from '../components/common/TopNavigation';
import useAuthStore from '../stores/useAuthStore';

const MyPage = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <SPage>
      <TopNavigation />
      <SContainer>
        <SProfileSection>
          <SProfileWrapper>
            <SProfileImage src={user?.avatar} alt='프로필 이미지' />
          </SProfileWrapper>
        </SProfileSection>

        <SFormSection>
          <SLabel>이름</SLabel>
          <SInput type='text' value={user?.name ?? ''} readOnly />
          <SButton onClick={handleLogout}>로그아웃</SButton>
        </SFormSection>
      </SContainer>
    </SPage>
  );
};

export default MyPage;

/* ---------------- styles ---------------- */
const SPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #ffffff;
`;

/* 전체 레이아웃 균형 */
const SContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 7.75rem; /* TopNavigation 아래 여백 */
  min-height: calc(100vh - 5rem); /* TopNavigation 높이 제외 영역 */
`;

const SProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

/* 프로필 프레임 */
const SProfileWrapper = styled.div`
  width: 18.75rem; /* 300px */
  height: 18.75rem;
  border-radius: 18.75rem;
  border: 2px solid var(--Gray-3, #c4c7d3);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #fff;
  flex-shrink: 0;
  margin-bottom: 7.75rem;
`;

/* 내부 이미지 */
const SProfileImage = styled.img`
  width: 14.5rem;
  height: 14.625rem;
  object-fit: contain;
  display: block;
  border-radius: 50%;
  pointer-events: none;
`;

const SFormSection = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SLabel = styled.label`
  color: #718096;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  align-self: flex-start;
  line-height: 1.5rem;
  margin-bottom: 1rem;
`;

const SInput = styled.input`
  width: 31.8125rem;
  height: 3.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.75rem;
  background: var(--Text-Color-100, #f9fafb);
  color: #718096;
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  margin-bottom: 7rem;
`;

const SButton = styled.button`
  width: 100%;
  height: 3.5rem;
  background: #5c9dff;
  color: white;
  font-family: Pretendard;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem;
  cursor: pointer;
  transition: background 0.2s ease;
`;
