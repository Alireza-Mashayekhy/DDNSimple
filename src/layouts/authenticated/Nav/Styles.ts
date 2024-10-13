import { hiddenScroll } from "@/styles";
import styled from "styled-components";


export const Bottom = styled.div``;

export const Container = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.secondary};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow-y: auto;
  margin: 5px 0px;
  ${hiddenScroll};
`;
export const Logo = styled.img`
  // border-radius: 50%; // Makes the image circular
  width: 45px; // Set the width as desired
  height: 45px; // Set the height as desired
  margin: 0.1rem auto 0.5rem auto;
  display: block;
`;
export const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 5px;
`;

export const FlexItem = styled.div`
  margin-top: 0.5rem;
  &:last-child {
    margin-top: auto; /* This will push the last item to the bottom */
  }
`;
