import styled from 'styled-components';
import CloseIcon from '../../assets/icons/close.svg?react'; // SVG 파일 import (vite-plugin-svgr 필요)
const Dialog = ({
  isOpen,
  onClose,
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
  showButton = true,
  width,
  height,
  padding,
  iconSize,
}) => {
  if (!isOpen) return null;

  return (
    <Backdrop onClick={onClose}>
      <DialogContainer
        width={width}
        height={height}
        padding={padding}
        onClick={(e) => e.stopPropagation()}
      >
        {!showButton && (
          <CloseButton onClick={onClose}>
            <CloseIcon width='100%' height='100%' />
          </CloseButton>
        )}

        <IconWrapper $iconSize={iconSize}>{icon}</IconWrapper>

        {title && <Title>{title}</Title>}
        {description && (
          <Description showButton={showButton}>{description}</Description>
        )}

        {showButton && (
          <ActionButton
            onClick={() => {
              onButtonClick?.();
              onClose();
            }}
          >
            {buttonText || '확인'}
          </ActionButton>
        )}
      </DialogContainer>
    </Backdrop>
  );
};

export default Dialog;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const DialogContainer = styled.div`
  position: relative;
  background: #fff;
  border-radius: 1rem;
  padding: ${({ padding }) => padding || '1.5rem'};
  width: ${({ width }) => width || '24.5rem'};
  height: ${({ height }) => height || '22.185rem'};
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  width: 2.25rem;
  height: 2.25rem;
  aspect-ratio: 1/1;
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3.31rem;
  width: ${({ $iconSize }) => $iconSize || '3rem'};
  height: ${({ $iconSize }) => $iconSize || '3rem'};
  aspect-ratio: 1/1;
`;

const Title = styled.h2`
  color: var(--Brand-1, #5c9dff);
  text-align: center;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const Description = styled.p`
  color: var(--Gray-1, #646879);
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: ${({ showButton }) => (showButton ? '3rem' : '0')};
  white-space: pre-line;
`;

const ActionButton = styled.button`
  width: 18.5rem;
  height: 2.75rem;
  border: none;
  border-radius: 8px;
  background: var(--Brand-1, #5c9dff);
  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;
