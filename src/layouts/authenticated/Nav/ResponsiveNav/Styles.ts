import styled, { css, keyframes } from "styled-components";
import DoubleArrowOutlinedIcon from "@mui/icons-material/DoubleArrowOutlined";
import { breakpoints, hiddenScroll } from "@/styles";

interface SlideOutMenuProps {
  open: boolean;
}

export const SlideOutMenu = styled.div<SlideOutMenuProps>`
  position: fixed;
  top: 0;
  width: 45px;
  padding-top:5vh;
  right: ${(props) => (props.open ? "0" : "-200%")};
  height: 100%;
  // height: 100vh;
  overflow-y: auto;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transition: right 0.3s ease-in-out;
  z-index: 10;
  background-color: ${({ theme }) => theme.secondary};
  // ${hiddenScroll};
`;
export const AnimatedIconContainer = styled.div`
  width: 1rem;
  height: 4vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
`;

export const HamburgerSpan = styled.span<SlideOutMenuProps>`
  display: block;
  height: 2px;
  width: 100%;
  background-color: ${({ theme }) => theme.textColor};
  transition: all 0.3s ease-in-out;

  ${(props) =>
    props.open &&
    css`
      &:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
    `}
`;

export const LeftPanelSlideIconContainer = styled.div`
  // position: absolute;
  // top: 0;
  // left: 0;
`;

export const SlideOutForLeftPanel = styled.div<SlideOutMenuProps>`
  position: fixed;
  top: 5vh;
  left: ${(props) => (props.open ? "-5px" : "-200%")};
  height: 100%;
  overflow: auto;
  direction: rtl;
  transition: left 0.5s ease-in-out;
  z-index: 15;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: ${({ theme }) => theme.secondary};
  ${hiddenScroll};

  @media (min-width: ${breakpoints.mini}) and (max-width: ${breakpoints.mobile}) {
    width: 300px;
  }

  @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
    width: 320px;
  }
`;

const slideRight = keyframes`
0% {
transform: translateX(0);
}
50% {
transform: translateX(10px);
}
100% {
transform: translateX(0);
}`;

const slideLeft = keyframes`
0% {
transform: rotate(180deg) translateX(0);
}
50% {
transform: rotate(180deg) translateX(-10px);
}
100% {
transform: rotate(180deg) translateX(0);
}
`;

export const SlidingArrowRight = styled(DoubleArrowOutlinedIcon)`
  color: ${({ theme }) => theme.textColor};
  fontsize: "1rem";
  animation: ${slideRight} 2s linear infinite;
`;

export const SlidingArrowLeft = styled(DoubleArrowOutlinedIcon)`
  color: ${({ theme }) => theme.textColor};
  fontsize: "1rem";
  animation: ${slideLeft} 2s linear infinite;
`;
