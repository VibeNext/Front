import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { signUpApi } from '../apis/auth';
import CheckIcon from '../assets/icons/check.svg?react';
import Dialog from '../components/common/Dialog.jsx';
import TopNavigation from '../components/common/TopNavigation.jsx';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setError,
    watch,
  } = useForm({ mode: 'onBlur' });

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      // 회원가입 API 요청
      await signUpApi({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      // 자동 로그인 제거
      // 회원가입 성공 → 다이얼로그
      setIsDialogOpen(true);
    } catch (error) {
      const err = error.response?.data;

      if (err?.email)
        setError('email', { type: 'manual', message: err.email[0] });
      if (err?.password)
        setError('password', { type: 'manual', message: err.password[0] });
      if (err?.name) setError('name', { type: 'manual', message: err.name[0] });

      if (!err) {
        setError('email', {
          type: 'manual',
          message: '회원가입 중 문제가 발생했습니다.',
        });
      }
    }
  };

  return (
    <SPageContainer>
      <TopNavigation />
      <SWrapper>
        <SFormContainer>
          <STitle>회원가입</STitle>
          <SDescription>NEXTVIBE와 함께 컴퓨팅 사고력을 높이세요!</SDescription>

          <SForm onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* 이름 필드 */}
            <div>
              <SLabel htmlFor='name'>이름</SLabel>
              <SInput
                id='name'
                type='text'
                placeholder='이름을 입력해주세요.'
                {...register('name', {
                  required: '이름을 입력해 주세요.',
                  maxLength: {
                    value: 6,
                    message: '이름은 공백 포함 최대 6자까지 입력 가능해요.',
                  },
                })}
                $hasError={!!errors.name}
              />
              {errors.name && (
                <SErrorMessage>{errors.name.message}</SErrorMessage>
              )}
            </div>

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
                    message: '올바른 이메일 형식이 아닙니다.',
                  },
                })}
                $hasError={!!errors.email}
              />
              {errors.email && (
                <SErrorMessage>{errors.email.message}</SErrorMessage>
              )}
            </div>

            {/* 비밀번호 필드 */}
            <div>
              <SLabel htmlFor='password'>비밀번호</SLabel>
              <SInput
                id='password'
                type='password'
                placeholder='비밀번호를 입력해주세요.'
                autoComplete='new-password'
                {...register('password', {
                  required: '비밀번호를 입력해 주세요.',
                  minLength: {
                    value: 8,
                    message: '비밀번호는 8자리 이상이어야 합니다.',
                  },
                })}
                $hasError={!!errors.password}
              />
              {errors.password && (
                <SErrorMessage>{errors.password.message}</SErrorMessage>
              )}
            </div>

            {/* 비밀번호 확인 필드 */}
            <div>
              <SLabel htmlFor='passwordConfirm'>비밀번호 확인</SLabel>
              <SInput
                id='passwordConfirm'
                type='password'
                placeholder='비밀번호를 다시 입력해주세요.'
                autoComplete='new-password'
                {...register('passwordConfirm', {
                  required: '비밀번호를 다시 입력해 주세요.',
                  validate: (value) =>
                    value === password || '비밀번호가 일치하지 않아요.',
                })}
                $hasError={!!errors.passwordConfirm}
              />
              {errors.passwordConfirm && (
                <SErrorMessage>{errors.passwordConfirm.message}</SErrorMessage>
              )}
            </div>

            {/* 버튼 */}
            <SButton
              type='submit'
              disabled={!isValid || isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? '회원가입 중...' : '회원가입'}
            </SButton>
          </SForm>

          <SBottomText>
            이미 계정이 있으신가요? <a href='/login'>로그인하기</a>
          </SBottomText>
        </SFormContainer>
      </SWrapper>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        icon={<CheckIcon width='3rem' height='3rem' />}
        title='회원가입이 완료되었어요!'
        description={`이제 NEXTVIBE의 학습을 시작해보세요.`}
        buttonText='로그인하러 가기'
        onButtonClick={async () => {
          await new Promise((r) => setTimeout(r, 200)); // 잠깐 대기 (persist 저장 시간 확보)
          navigate('/login'); // 로그인 페이지로 이동
        }}
      />
    </SPageContainer>
  );
};

export default SignUpPage;

/* ---------- LoginPage 스타일 그대로 ---------- */
const SPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #ffffff;
`;

const SWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1600px) {
    transform: scale(0.9);
  }

  @media (max-width: 1440px) {
    transform: scale(0.85);
  }

  @media (max-width: 1280px) {
    transform: scale(0.8);
  }

  @media (max-width: 1024px) {
    transform: scale(0.7);
  }

  transform-origin: center;
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
  font-weight: 700;
  margin-bottom: 1.25rem;
`;

const SDescription = styled.p`
  color: var(--Gray-2, #868ba3);
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
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
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem; /* 150% */
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

  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: #ff9a8c;
    `}

  &:focus {
    outline: none;
    ${({ $hasError }) =>
      !$hasError
        ? css`
            background-color: #eff5ff;
            border-color: #5c9dff;
            box-shadow: 0 0 0 2px rgba(81, 113, 255, 0.15);
          `
        : css`
            border-color: #ff9a8c;
            box-shadow: 0 0 0 2px rgba(255, 92, 92, 0.2);
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
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  margin-top: 1.5rem;

  &:disabled {
    background: #c4c7d3;
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

const SErrorMessage = styled.p`
  color: #ff5c5c;
  font-size: 0.875rem;
  margin-bottom: 1rem;
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
