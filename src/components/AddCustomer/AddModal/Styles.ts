import styled from 'styled-components';
import UIcon from '@mdi/react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

export const Container = styled(Dialog)`
    background: ${({ theme }) => theme.strippedRow};
    border-radius: 10px;

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
        align-items: center;
        gap: 30px;
    }
`;

export const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 25px;
`;

export const InputContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 5px;
`;

export const InputLabel = styled.label`
    font-size: 12px;
    color: ${({ theme }) => theme.textColor};
    opacity: 0.5;
`;

export const Input = styled(AutoComplete)`
    input {
        width: 100%;
        background: transparent;
        padding: 5px 10px;
        font-size: 14px;
        border: none;
        border-bottom: 1px solid ${({ theme }) => theme.border};
        outline: none;
        border-radius: 0px;
        color: ${({ theme }) => theme.textColor} !important;
        &:focus {
            box-shadow: none !important;
        }
    }
    svg {
        left: 5px;
    }
`;

export const InputDropdown = styled(Dropdown)`
    background: transparent !important;
    padding: 5px 10px;
    font-size: 14px;
    border: none !important;
    border-bottom: 1px solid ${({ theme }) => theme.border} !important;
    color: ${({ theme }) => theme.textColor};
    border-radius: 0 !important;
    * {
        background: transparent !important;
    }
`;

export const CalendarInput = styled(Calendar)`
    border-bottom: 1px solid ${({ theme }) => theme.border};
    input {
        background: transparent;
        padding: 5px 10px;
        font-size: 14px;
        border: none;
        outline: none;
        color: ${({ theme }) => theme.textColor};
    }
    .p-datepicker {
        background: red;
        padding: 5px 10px;
        font-size: 14px;
        border: none;
        outline: none;
        color: ${({ theme }) => theme.textColor};
    }
`;

export const FooterContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    // padding: 20px;
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
