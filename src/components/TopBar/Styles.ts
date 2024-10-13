import styled from "styled-components";
import { breakpoints, colors } from "@/styles";

export const FlexContainer = styled.div`
  // background-color: ${colors.backgroundLightDark};
  // display: flex;
  // align-items: center;
  // gap: 2rem;
`;
export const FlexItem = styled.div`
  flex-basis: 50%;
  @media (min-width: ${breakpoints.mini}) and (max-width: ${breakpoints.tablet}) {
    flex-basis: calc(30%);
  }
  @media (min-width: ${breakpoints.tablet}) {
    flex-basis: calc(20%);
  }
`;

export const Gap = styled.div`
  width: 0;
  flex-grow: 1;
`;
export const ImageContainer = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  max-width: 30px;
  max-height: 30px;
  border-radius: 50%;
  overflow: hidden;
`;

export const IMG = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
