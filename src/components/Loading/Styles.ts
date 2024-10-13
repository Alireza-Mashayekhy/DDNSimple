import styled from "styled-components";
import { colors, fonts } from "@/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(2px);
  z-index: 100;

  > div:nth-child(2) {
    color: ${colors.white};
    font-weight: ${fonts.weight.semiBold};
  }
`;
export const CustomSpinnerWrapper = styled.div`
  position: relative;
  display: block;
`;

export const LogoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px; /* Adjust size as needed */
  height: 50px;
  z-index: 1;
`;

export const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
export const LoadingOverlay = styled.div``;
