import styled from 'styled-components';
import { Dialog } from 'primereact/dialog';
import { Avatar } from 'primereact/avatar';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

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

export const PhoneContainer = styled.div`
    font-size: 12px;
    background: ${({ theme }) => theme.secondary};
    padding: 5px 10px;
    border-radius: 5px;
    color: ${({ theme }) => theme.textColor};
    opacity: 0.5;
`;

export const Phone = styled.span`
    color: ${({ theme }) => theme.textColor};
    margin-right: 5px;
`;

export const Image = styled(Avatar)`
    width: 100px;
    height: 100px;
    min-width: 100px;
    min-height: 100px;
`;

export const UploadContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

export const ImageUpload = styled(FileUpload)`
    background: ${({ theme }) => theme.secondary};
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 5px;
    svg {
        margin-left: 10px;
    }
    .p-fileupload-choose-selected svg {
        display: none;
    }
`;

export const CancelUpload = styled.button`
    background: ${({ theme }) => theme.secondary};
    padding: 0 10px;
    font-size: 19px;
    outline: none;
    border: none;
    border-radius: 5px;
    color: ${({ theme }) => theme.textColor};
    cursor: pointer;
    span {
        display: flex;
        rotate: 45deg;
    }
`;

export const InputsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
    gap: 20px;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const InputLabel = styled.label`
    font-size: 12px;
    color: ${({ theme }) => theme.textColor};
    opacity: 0.5;
`;

export const Input = styled(InputText)`
    background: transparent;
    padding: 5px 10px;
    font-size: 14px;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    outline: none;
    color: ${({ theme }) => theme.textColor};
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

export const PasswordsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

export const PasswordToggle = styled.span`
    font-size: 12px;
    background: ${({ theme }) => theme.secondary};
    width: fit-content;
    padding: 5px 10px;
    border-radius: 5px;
    color: ${({ theme }) => theme.textColor};
    cursor: pointer;
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
