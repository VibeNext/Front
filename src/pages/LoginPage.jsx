import { useState } from 'react';
import styled from 'styled-components';
import TopNavigationBeforeLogin from '../components/common/TopnNavigationBeforeLogin';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('로그인 시도:', { email, password });
  };

  return (
    <SPageContainer>
      <TopNavigationBeforeLogin />
      <SWrapper>
        <SFormContainer>
          <STitle>로그인</STitle>
          <SDescription>NEXTVIBE와 함께 컴퓨팅 사고력을 높이세요!</SDescription>

          <SForm onSubmit={handleLogin}>
            <SLabel>이메일</SLabel>
            <SInput
              type='email'
              placeholder='이메일을 입력해주세요.'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <SLabel>비밀번호</SLabel>
            <SInput
              type='password'
              placeholder='비밀번호를 입력해주세요.'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <SButton type='submit'>로그인</SButton>
          </SForm>

          <SBottomText>
            아직 계정이 없으신가요? <a href='/signup'>회원가입하기</a>
          </SBottomText>
        </SFormContainer>
      </SWrapper>
    </SPageContainer>
  );
};

export default LoginPage;

/* ---------------- styles ---------------- */

const SPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #ffffff;
`;

const SWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  align-items: center; /* ✅ 수직 중앙 */
  justify-content: center; /* ✅ 수평 중앙 */
`;

const SFormContainer = styled.div`
  width: 31.8rem; /* ✅ Figma 기준 폭 */
  display: flex;
  flex-direction: column;
`;

const STitle = styled.h1`
  color: var(--Black, #191927);
  font-family: Pretendard;
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 1.25rem;
`;

const SDescription = styled.p`
  color: var(--Gray-2, #868ba3);
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem; /* 150% */
  text-align: left;
  margin-bottom: 1.5rem;
`;

const SForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const SLabel = styled.label`
  color: var(--Gray-1, #646879);
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5rem; /* 150% */
  text-align: left;
  margin-bottom: 0.5rem;
`;

const SInput = styled.input`
  width: 100%;
  height: 3.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e0e2eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: var(--Gray-5, #f5f5f7);
  transition: all 0.2s ease;

  &::placeholder {
    color: #a0a3aa;
  }

  &:focus {
    border-color: #5171ff;
    outline: none;
    background-color: #f7f8fa;
    box-shadow: 0 0 0 2px rgba(81, 113, 255, 0.15);
  }
  margin-bottom: 1.5rem;
`;

const SButton = styled.button`
  width: 100%;
  height: 3.5rem;
  border: none;
  border-radius: 0.5rem;
  background: var(--Brand-1, #5c9dff);
  color: #fff;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem; /* 120% */
  cursor: pointer;
  transition: background 0.2s ease;
`;

const SBottomText = styled.p`
  margin-top: 1.5rem;
  font-size: 0.95rem;
  color: #666;
  text-align: center;

  a {
    color: #5c9dff;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
