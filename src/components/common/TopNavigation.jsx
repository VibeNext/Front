import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuthStore from '../../stores/useAuthStore';

import LogoTextIcon from '../../assets/icons/NEXTVIBE.svg?react';
import LearningIcon from '../../assets/icons/book-open.svg?react';
import HomeIcon from '../../assets/icons/home.svg?react';
import UserIcon from '../../assets/icons/user.svg?react';
import LogoIcon from '../../assets/icons/서비스 로고.svg?react';

// 라우팅 전 임시 path (나중에 ROUTE_PATH로 교체)
const NAV_ITEMS = [
  { path: '/', label: '홈', Icon: HomeIcon },
  {
    path: '/learningstep',
    basePath: '/step',
    label: '학습 단계',
    Icon: LearningIcon,
  },
];

const TopNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  // 전역 인증 상태
  const { isAuthenticated, user } = useAuthStore();

  return (
    <SHeaderWrap>
      <SBar $isHome={isHome}>
        <SBrand
          onClick={() => navigate('/')}
          role='button'
          aria-label='홈으로 이동'
          $isHome={isHome}
        >
          <LogoIcon />
          <LogoTextIcon className='text-logo' />
        </SBrand>

        <SNav>
          {NAV_ITEMS.map(({ path, label, basePath, Icon }) => {
            const activeBase = basePath || path;
            const active =
              path === '/'
                ? location.pathname === '/' // 홈만 정확히 일치
                : location.pathname.startsWith(`${activeBase}/`) ||
                  location.pathname === path;
            return (
              <SNavBtn
                key={path}
                to={path}
                $active={active}
                aria-current={active ? 'page' : undefined}
                $isHome={isHome}
              >
                <SIcon $active={active} $isHome={isHome}>
                  <Icon />
                </SIcon>
                <SLabel $active={active} $isHome={isHome}>
                  {label}
                </SLabel>
              </SNavBtn>
            );
          })}
        </SNav>

        <SRight>
          {isAuthenticated ? (
            <ProfileBtn
              type='button'
              aria-label='프로필로 이동'
              onClick={() => navigate('/mypage')}
              title='프로필'
            >
              {/* 회원가입 시 부여된 아바타가 있다면 표시, 없으면 기본 아이콘 */}
              {user?.avatar ? (
                <SProfileImage src={user.avatar} alt='프로필 이미지' />
              ) : (
                <UserIcon />
              )}
            </ProfileBtn>
          ) : (
            // 로그아웃(미인증) 상태: 기존 before-login 우측 버튼 그대로
            <>
              <SButton onClick={() => navigate('/signup')} $isHome={isHome}>
                회원가입
              </SButton>
              <SButton
                onClick={() => navigate('/login')}
                $primary
                $isHome={isHome}
              >
                로그인
              </SButton>
            </>
          )}
        </SRight>
      </SBar>
    </SHeaderWrap>
  );
};

export default TopNavigation;

/* ---------------- styles ---------------- */
const SHeaderWrap = styled.div`
  position: sticky;
  z-index: 1000;
  top: 0;
`;

const SBar = styled.header`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 1rem 2.5rem;
  background: ${({ $isHome }) => ($isHome ? '#5C9DFF' : '#fff')};
  border-bottom: 1px solid
    ${({ $isHome }) =>
      $isHome ? 'var(--Gray-3, #c4c7d3)' : 'var(--Gray-3, #c4c7d3)'};
`;

const SBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-self: start;
  cursor: pointer;
  svg {
    height: 3.25rem;
    display: block;
  }
  .text-logo * {
    stroke: ${({ $isHome }) => ($isHome ? '#DEEBFF' : '#191927')};
    fill: ${({ $isHome }) => ($isHome ? '#DEEBFF' : '#191927')};
  }
`;

const SNav = styled.nav`
  display: flex;
  gap: 0.75rem;
  justify-self: center;
`;

const SNavBtn = styled(Link)`
  height: 3rem;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  background: ${({ $isHome, $active }) =>
    $isHome
      ? $active
        ? '#7DB1FF' // 홈 + active
        : '#5C9DFF' // 홈 + inactive
      : $active
        ? 'rgba(81,113,255,0.10)'
        : 'transparent'};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ $active }) =>
      $active ? 'rgba(81,113,255,0.10)' : 'rgba(0,0,0,0.04)'};
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(81, 113, 255, 0.35);
  }
`;

const SRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-self: end;
  width: 200px; /* 너희 디자인 기준 맞게 조정 가능 */
  justify-content: flex-end;
`;

const SIcon = styled.span`
  width: 1.75rem;
  height: 1.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  svg,
  svg * {
    stroke: ${({ $isHome, $active }) =>
      $isHome ? '#DEEBFF' : $active ? '#5C9DFF' : '#646879'};
    fill: ${({ $isHome }) => ($isHome ? 'none' : 'none')};
    transition:
      stroke 0.2s,
      fill 0.2s;
  }
`;

const SLabel = styled.span`
  font-size: 1.25rem;
  line-height: 1;
  color: ${({ $isHome, $active }) =>
    $isHome ? '#DEEBFF' : $active ? '#5C9DFF' : '#646879'};

  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  transition: color 0.2s ease;
`;

/* before-login 우측 버튼 스타일 재사용 */
const SButton = styled.button`
  font-family: Pretendard;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.25rem;

  height: 2.75rem;
  border-radius: 2.5rem;
  padding: 8px 16px;

  /* 홈일 때 버튼 색상 변경 */
  border: ${({ $isHome, $primary }) =>
    $isHome
      ? $primary
        ? '1px solid #DEEBFF' // 로그인 버튼
        : '1px solid transparent' // 회원가입 버튼
      : $primary
        ? '1px solid #DEEBFF'
        : '1px solid #ffffff'};

  background: ${({ $isHome, $primary }) =>
    $isHome ? 'transparent' : $primary ? '#DEEBFF' : 'transparent'};

  color: ${({ $isHome, $primary }) =>
    $isHome
      ? '#DEEBFF' // 홈일 때는 둘 다 #DEEBFF
      : $primary
        ? '#646879'
        : '#646879'};

  cursor: pointer;
  transition: all 0.2s ease;
`;

const ProfileBtn = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  line-height: 0;
`;

const SProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
