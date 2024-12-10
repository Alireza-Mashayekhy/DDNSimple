import styled from "styled-components";
import { breakpoints } from "@/styles";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: stretch;
  gap: 0.3rem;
  // @media (max-width: ${breakpoints.tablet}) {
  //   margin-top: 6vh;
  // }
  > div:nth-child(1) {
    width: 55px;
    @media (max-width: ${breakpoints.tablet}) {
      display: none;
    }
  }

  > div:nth-child(2) {
    overflow: auto;
    width: 0;
    flex-grow: 1;
  }
`;

export const HambugerMenuContainer = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  display: none;
  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5vh;
    width: calc(100% - 0.2rem);
    padding: 0 5px 0 0;
    margin: 0.1rem 0.1rem;
    // overflow: hidden;
    // position: fixed; /* Fixed position */
    // top: 0; /* Position at the top */
    z-index: 1000;
  }
`;
