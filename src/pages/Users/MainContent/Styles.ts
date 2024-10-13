import { inputStyle } from '@/styles';
import { inputTextStyle } from '@/styles/mixins';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import styled from 'styled-components';

export const Container = styled.div`
    padding: 10px;
    text-align: center;
`;
export const Input = styled(InputText)`
    ${inputTextStyle}
    border: 1px solid ${({ theme }) => theme.border} !important
`;

export const DialogStyle = styled(Dialog)`
    .p-icon {
        color: ${({ theme }) => theme.textColor} !important;
    }
    .p-dialog-footer {
        background: ${({ theme }) => theme.primary} !important;
    }
`;
