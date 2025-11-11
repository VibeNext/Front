import styled, { css } from 'styled-components';

const MissionCard = ({
  size = 'small', // 'small' | 'large'
  theme = 'light', // 'light' | 'dark'
  missionNumber,
  title,
  description,
  imageSrc,
}) => {
  return (
    <CardContainer size={size} themeType={theme}>
      <MissionText size={size} themeType={theme}>
        {size === 'large' ? `Mission ${missionNumber}` : missionNumber}
      </MissionText>
      <Title size={size} themeType={theme}>
        {title}
      </Title>
      {size === 'large' && (
        <>
          <ImageWrapper size={size}>
            <img src={imageSrc} alt={title} />
          </ImageWrapper>
          <Description size={size} themeType={theme}>
            {description}
          </Description>
        </>
      )}
    </CardContainer>
  );
};

export default MissionCard;

// ---------------- styled-components ----------------
const CardContainer = styled.div`
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  ${({ size }) =>
    size === 'large'
      ? css`
          width: 25rem;
          height: 25rem;
          padding: 1.5rem;
        `
      : css`
          width: 12.5rem;
          height: 12.5rem;
          padding: 1rem;
        `}

  ${({ themeType }) =>
    themeType === 'dark'
      ? css`
          /* 다크 버전 */
          border: 2px solid var(--Gray-4, #f1f1f5);
          background: linear-gradient(
            180deg,
            rgba(134, 139, 163, 0.05) 0%,
            rgba(134, 139, 163, 0.2) 100%
          );
          box-shadow: 12.155px 12.155px 24.309px 0 rgba(134, 139, 163, 0.1);
        `
      : css`
          /* 라이트 버전 */
          border: 2px solid #fff;

          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0.4) 100%
          );

          box-shadow: 12.155px 12.155px 24.309px 0 rgba(134, 139, 163, 0.1);
        `}
`;

const MissionText = styled.p`
  font-family: DungGeunMo;
  font-size: ${({ size }) => (size === 'large' ? '1.5rem' : '1.75rem')};
  color: ${({ themeType }) => (themeType === 'dark' ? '#7DB1FF' : '#5C9DFF')};
  font-weight: 400;
  line-height: normal;
  text-align: center;
  margin-bottom: ${({ size }) => (size === 'large' ? '0.75rem' : '0.5rem')};
`;

const Title = styled.h2`
  font-family: DungGeunMo;
  font-size: ${({ size }) => (size === 'large' ? '1.75rem' : '1.5rem')};
  font-weight: 400;
  line-height: 1.4;
  color: ${({ themeType }) => (themeType === 'dark' ? '#646879' : '#191927')};
  margin-bottom: ${({ size }) => (size === 'large' ? '1.25rem' : '0.75rem')};
  text-align: center;
`;

const ImageWrapper = styled.div`
  width: ${({ size }) => (size === 'large' ? '11.25rem' : '7rem')};
  height: ${({ size }) => (size === 'large' ? '11.25rem' : '7rem')};
  margin-bottom: ${({ size }) => (size === 'large' ? '1.25rem' : '1rem')};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Description = styled.p`
  font-family: Pretendard;
  font-size: ${({ size }) => (size === 'large' ? '0.9375rem' : '0.8125rem')};
  font-weight: 400;
  color: ${({ themeType }) =>
    themeType === 'dark' ? 'var(--Gray-2, #868ba3)' : 'var(--Gray-1, #646879)'};
  text-align: center;
  line-height: 1.5;
  margin-top: ${({ size }) => (size === 'large' ? '0.5rem' : '0.25rem')};
  max-width: 80%;
  white-space: pre-line;
`;
