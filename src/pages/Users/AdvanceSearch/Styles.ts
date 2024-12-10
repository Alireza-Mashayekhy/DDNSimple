import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import styled from 'styled-components';
import UIcon from '@mdi/react';

export const DialogStyle = styled(Dialog)`
    .p-icon {
        color: ${({ theme }) => theme.textColor} !important;
    }
    .p-dialog-footer {
        background: ${({ theme }) => theme.primary} !important;
    }
`;

export const AddButton = styled(Button)`
    font-size: 14px;
    border: 1px solid ${({ theme }) => theme.textColor};
    padding: 8px 15px;
    background: transparent;
    border-radius: 8px;
    color: ${({ theme }) => theme.textColor};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
`;

export const AddIcon = styled(UIcon)``;

export const AddLabel = styled.span``;

export const DownloadButton = styled(Button)`
    font-size: 14px;
    border: 1px solid ${({ theme }) => theme.textColor};
    padding: 8px 80px;
    background: transparent;
    border-radius: 8px;
    color: ${({ theme }) => theme.textColor};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
`;
