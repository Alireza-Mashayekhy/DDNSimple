import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
from {
opacity: 0;
transform: translateY(-20px);
}
to {
opacity: 1;
transform: translateY(0);
}
`;

const gradientAnimation = keyframes`
0%, 100% {
background-color: #5788b5; /* Original color */
}
50% {
background-color: #3b5979; /* Darker shade of the original color */
}

`;

export const Container = styled.div`
  animation: ${fadeIn} 1s ease-out forwards,
    ${gradientAnimation} 7s ease-in-out infinite;
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`;
