import styled from "styled-components";
import { breakpoints } from "@/styles";

export const Container = styled.div`
  min-height: 5vh;
  margin-bottom:0.5rem;
  padding:5px 0;
  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5vh;
    width: 100%;
    padding: 0 5px;
  }
`;
