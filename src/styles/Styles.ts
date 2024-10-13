import styled, { css } from 'styled-components';
import { DataTable } from 'primereact/datatable';
import { narrowScroll, primeReactDataTableStyle } from './mixins';

const iranSansFont = css`
    font-family: 'IranSans', sans-serif;
`;

export const Text = styled.p`
    ${iranSansFont}
`;

export const TableContainer = styled.div`
    padding: 5px 10px;
    overflow: auto;
    ${narrowScroll};
    ${iranSansFont}
`;

export const StyledDataTable = styled(DataTable)`
    ${primeReactDataTableStyle};
    ${iranSansFont}
    .p-datatable-tbody > tr > td {
        padding: 5px;
        font-weight: normal !important;
        font-size: 14px !important;
    }
    .p-datatable-thead > tr > th {
        padding: 5px;
        font-weight: bold !important;
        font-size: 16px !important;
    }
    .p-datatable-thead > tr > th {
        // background-color:#041f59;
    }
`;

export const Button = styled.button`
    border: 1px solid ${({ theme }) => theme.border};
    background-color: transparent;
    color: ${({ theme }) => theme.textColor};
    cursor: pointer;
    padding: 2px 5px;
    border-radius: 4px;
    font-size: 1rem;
    margin-right: 5px;
    ${iranSansFont}
`;

export const ButtonContainer = styled.div`
    margin-top: 2rem;
    text-align: left !important;
    margin-left: 1rem;
    ${iranSansFont}
`;

export const OperationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    ${iranSansFont}
`;
