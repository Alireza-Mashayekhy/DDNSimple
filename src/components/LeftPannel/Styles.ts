import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textColor};
  margin-top: 4px;
  min-height: 100vh;
`;
