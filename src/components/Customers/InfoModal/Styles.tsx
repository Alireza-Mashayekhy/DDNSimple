import styled from "styled-components";
import UIcon from "@mdi/react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export const Container = styled(Dialog)`
  background: ${({ theme }) => theme.strippedRow};
  border-radius: 10px;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.secondary};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.textColor};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.textColorSecondary};
  }
  scrollbar-color: ${({ theme }) => theme.primary}
    ${({ theme }) => theme.strippedRow};
  scrollbar-width: thin;

  .p-dialog-header {
    padding: 20px;
    button {
      color: ${({ theme }) => theme.textColor};
      outline: none;
      border: none;
    }
  }
  .p-dialog-content {
    padding: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.textColor};
`;

export const DLButton = styled(Button)`
  font-size: 16px;
  padding: 10px 20px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.textColor};
  border-radius: 5px;
  border: none;
  outline: none;
`;

export const InfoContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 25px;
`;

export const InfoHeader = styled.span`
  font-weight: 700;
  margin-left: 5px;
`;

export const Info = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  color: ${({ theme }) => theme.textColorSecondary};
`;

export const TableContainer = styled(DataTable)`
  width: 100%;
  background: ${({ theme }) => theme.primary};
  border-radius: 10px;
  min-height: 300px;
  height: 300px;
  overflow: auto;
  th {
    border-bottom: 1px solid ${({ theme }) => theme.border};
    padding: 20px;
  }
  td {
    padding: 20px;
  }
  tr:nth-child(even) {
    background: ${({ theme }) => theme.secondary};
  }

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.secondary};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.textColor};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.textColorSecondary};
  }
  scrollbar-color: ${({ theme }) => theme.textColor}
    ${({ theme }) => theme.secondary};
  scrollbar-width: thin;
`;

export const TableColumn = styled(Column)`
  font-size: 16px;
`;

export const ChartContainer = styled.div`
  width: 100%;
  min-height: 310px;
  overflow-y: visible;
  overflow-x: auto;
  .recharts-wrapper {
    margin: 0 auto;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
`;

export const FooterButton = styled(Button)`
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textColor};
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  outline: none;
  width: fit-content;
  height: fit-content;
`;
