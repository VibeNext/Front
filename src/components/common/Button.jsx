import styled from 'styled-components';

function Button({ children, ...rest }) {
  return <Root {...rest}>{children}</Root>;
}
const Root = styled.button`
  font-family: ${({ theme }) =>
    theme?.fonts?.families?.display || "'DungGeunMo', sans-serif"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background-color 0.15s ease,
    transform 0.05s ease;

  /* Able */
  background: ${({ theme }) => theme?.colors?.brand?.[1] || '#5C9DFF'};
  color: #ffffff;
  box-shadow: 0 0 10px 0 rgba(92, 157, 255, 0.5);

  /* Hover */
  &:hover {
    background: ${({ theme }) => theme?.colors?.brand?.[2] || '#7DB1FF'};
  }

  /* Pressed */
  &:active {
    background:
      linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
      ${({ theme }) => theme?.colors?.brand?.[1] || '#5C9DFF'};
  }

  /* Disable */
  &:disabled {
    background: #c4c7d3;
    color: #ffffff;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

export default Button;
