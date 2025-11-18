import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import TopNavigation from '../components/common/TopNavigation.jsx';
import useAuthStore from '../stores/useAuthStore';

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    // 버튼 제어를 위해 isValid, isSubmitting, setError 추가
    formState: { errors, isValid, isSubmitting },
    setError,
  } = useForm({
    mode: 'onBlur',
  });

  const watchEmail = watch('email');

  //  API 호출
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'https://nextvibe.up.railway.app/accounts/login',
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // 요청 성공 → 토큰 저장
      const { grant_type, access, refresh } = response.data;

      const login = useAuthStore.getState().login;
      login({
        email: data.email,
        grantType: grant_type,
        accessToken: access.token,
        refreshToken: refresh.token,
        accessExpireAt: access.expire_at,
        refreshExpireAt: refresh.expire_at,
      });

      // 홈 화면으로 이동
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error);

      const errorData = error.response?.data;

      // 백엔드에서 내려주는 다양한 오류 케이스 처리
      if (errorData?.invalid_credentials) {
        setError('password', {
          type: 'manual',
          message: '이메일 또는 비밀번호가 일치하지 않아요.',
        });
      } else if (errorData?.email) {
        setError('email', {
          type: 'manual',
          message: errorData.email[0],
        });
      } else if (errorData?.password) {
        setError('password', {
          type: 'manual',
          message: errorData.password[0],
        });
      } else {
        setError('email', {
          type: 'manual',
          message: '로그인 중 문제가 발생했어요.',
        });
      }
    }
  };

  return (
    <SPageContainer>
      <TopNavigation />
      <SWrapper>
        <SFormContainer>
          <STitle>로그인</STitle>
          <SDescription>NEXTVIBE와 함께 컴퓨팅 사고력을 높이세요!</SDescription>

          <SForm onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* 이메일 필드 */}
            <div>
              <SLabel htmlFor='email'>이메일</SLabel>
              <SInput
                id='email'
                type='email'
                placeholder='이메일을 입력해주세요.'
                autoComplete='email'
                aria-invalid={!!errors.email}
                {...register('email', {
                  required: '이메일을 입력해 주세요.',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '올바른 이메일 형식이 아닙니다.', // 입력 중 오류 메시지
                  },
                })}
                $hasError={!!errors.email}
              />
              {/* 오류 메시지 표시 */}
              {errors.email && (
                <SErrorMessage id='email-error'>
                  {errors.email?.message}
                </SErrorMessage>
              )}
            </div>

            {/* 비밀번호 필드 */}
            <div>
              <SLabel htmlFor='password'>비밀번호</SLabel>
              <SInput
                id='password'
                type='password'
                placeholder='비밀번호를 입력해주세요.'
                autoComplete='current-password'
                aria-invalid={!!errors.password}
                // register와 유효성 검사 규칙 적용
                {...register('password', {
                  required: '비밀번호를 입력해 주세요.',
                  minLength:
                    watchEmail === 'admin@email.com'
                      ? undefined
                      : {
                          value: 8,
                          message: '비밀번호는 8자리 이상이어야 합니다.',
                        },
                })}
                $hasError={!!errors.password}
              />
              {/*  오류 메시지 표시 */}
              {errors.password && (
                <SErrorMessage id='password-error'>
                  {errors.password?.message}
                </SErrorMessage>
              )}
            </div>

            {/*  버튼 disabled 제어 및 로딩 상태 표시 */}
            <SButton
              type='submit'
              $marginTop='1.5rem'
              disabled={!isValid || isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? '로그인 중...' : '로그인'}
            </SButton>
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
  align-items: center;
`;

const SFormContainer = styled.div`
  width: 31.8rem;
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
  display: block;
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

  /*  1. 기본 스타일: 오류 없을 때와 오류 있을 때의 기본 테두리 */
  ${({ $hasError }) =>
    $hasError &&
    css`
      /* 오류가 있을 때 기본 테두리 색상 */
      border-color: #ff9a8c;
    `}

  /* 2. 포커스 스타일*/
  &:focus {
    outline: none;

    ${({ $hasError }) =>
      !$hasError
        ? css`
            /* 에러 없을 때 포커스: #eff5ff  */
            background-color: #eff5ff;
            border-color: #5c9dff;
            box-shadow: 0 0 0 2px rgba(81, 113, 255, 0.15);
          `
        : css`
            /* 에러 있을 때 포커스: 오류 스타일 유지 */
            border-color: #ff9a8c;
            box-shadow: 0 0 0 2px rgba(255, 92, 92, 0.2);
            background-color: #f5f5f7;
          `}
  }

  margin-bottom: 0.5rem;
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

  margin-top: ${({ $marginTop }) => $marginTop || '0'}; /* 마진 prop 사용 */

  /* disabled 상태 스타일 */
  &:disabled {
    background: #c4c7d3;
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

// 오류 메시지 스타일 추가
const SErrorMessage = styled.p`
  color: #ff5c5c;
  font-size: 0.875rem;
  text-align: left;
  margin-bottom: 1rem; /* 다음 필드와의 간격 */
  margin-left: 0.1rem;
  font-weight: 500;
`;

const SBottomText = styled.p`
  margin-top: 1.5rem;
  font-size: 0.95rem;
  color: #718096;
  text-align: center;

  a {
    color: #5c9dff;
    font-weight: 700;
    text-decoration: none;
  }
`;
