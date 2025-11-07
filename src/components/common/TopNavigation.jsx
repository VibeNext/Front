import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LogoTextIcon from '../../assets/icons/NEXTVIBE.svg?react';
import BadgeIcon from '../../assets/icons/badge.svg?react';
import LearningIcon from '../../assets/icons/book-open.svg?react';
import HomeIcon from '../../assets/icons/home.svg?react';
import UserIcon from '../../assets/icons/user.svg?react';
import LogoIcon from '../../assets/icons/서비스 로고.svg?react';

// 라우팅 전 임시 path (나중에 ROUTE_PATH로 교체)
const NAV_ITEMS = [
  { path: '/home', label: '홈', Icon: HomeIcon },
  { path: '/learning', label: '학습 단계', Icon: LearningIcon },
  { path: '/badge', label: '학습 뱃지', Icon: BadgeIcon },
];

const TopNavigation = () => {
  const [activePath, setActivePath] = useState('/home');

  return (
    <SHeaderWrap>
      <SBar>
        <SBrand>
          <LogoIcon />
          <LogoTextIcon />
        </SBrand>

        <SNav>
          {NAV_ITEMS.map(({ path, label, Icon }) => {
            const active = activePath.startsWith(path);
            return (
              <SNavBtn
                key={path}
                to={path}
                type='button'
                $active={active}
                onClick={() => setActivePath(path)}
                aria-current={active ? 'page' : undefined}
              >
                <SIcon $active={active}>
                  <Icon />
                </SIcon>
                <SLabel $active={active}>{label}</SLabel>
              </SNavBtn>
            );
          })}
        </SNav>

        <SRight>
          <UserIcon />
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
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 1rem 2.5rem;
  background: #fff;
  border-radius: 8px;
  border-bottom: 1px solid var(--Gray-3, #c4c7d3);
`;

const SBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-self: start;
  svg {
    height: 3.25rem;
    display: block;
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
  background: ${({ $active }) =>
    $active ? 'rgba(81,113,255,0.10)' : 'transparent'};
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
  justify-self: end;
`;
const SIcon = styled.span`
  width: 1.75rem;
  height: 1.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  svg,
  svg * {
    stroke: ${({ $active }) => ($active ? '#5C9DFF' : '#646879')};
    fill: ${({ $active }) => ($active ? '#EFF5FF' : 'none')};
    transition:
      stroke 0.2s,
      fill 0.2s;
  }
`;

const SLabel = styled.span`
  font-size: 1.25rem;
  line-height: 1;
  color: ${({ $active }) => ($active ? '#5C9DFF' : '#646879')};
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  transition: color 0.2s ease;
`;
