import styled from "styled-components";
import UIcon from "@mdi/react";
import { Button } from "primereact/button";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
  width: fit-content;
`;

export const AddButton = styled(Button)`
  font-size: 18px;
  border: 1px solid ${({ theme }) => theme.border};
  padding: 10px 15px;
  background: transparent;
  border-radius: 5px;
  color: ${({ theme }) => theme.textColor};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const AddIcon = styled(UIcon)``;

export const AddLabel = styled.span``;
