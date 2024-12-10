import styled from 'styled-components';
import { Avatar } from 'primereact/avatar';
import UIcon from '@mdi/react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';

interface ItemImageProps {
    width?: string;
}
interface ItemAttributeProps {
    justify?: string;
}

interface ClearProps {
    position?: string;
    top?: string;
    right?: string;
}

interface SelectInputProps {
    position?: string;
    top?: string;
    left?: string;
}

export const DownloadButton = styled(Button)`
    font-size: 14px;
    border: 1px solid ${({ theme }) => theme.border};
    padding: 8px 15px;
    background: transparent;
    border-radius: 5px;
    color: ${({ theme }) => theme.textColor};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    transition: all 0.5s;
`;

export const RemoveModal = styled(Dialog)`
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
        gap: 30px;
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

export const RemoveMessage = styled.span`
    color: ${({ theme }) => theme.textColor};
`;

export const Background = styled.div<{ $url: string }>`
    background:
        linear-gradient(
            to top,
            ${({ theme }) => theme.secondary} 50%,
            ${({ theme }) => theme.secondaryOpacity} 100%
        ),
        ${({ $url }) => `url(${$url})`} no-repeat;
    // background:  !important;
    background-size: cover !important;
    background-position: bottom center !important;
    background-repeat: no-repeat !important;
    position: absolute;
    width: 100%;
    height: 70vh;
    top: 0px;
    right: 0px;
`;

export const ClearIcon = styled(UIcon)`
    color: ${({ theme }) => theme.textColor};
`;

export const DialogStyle = styled(Dialog)`
    .p-icon {
        color: ${({ theme }) => theme.textColor} !important;
    }
    .p-dialog-footer {
        background: ${({ theme }) => theme.primary} !important;
    }
`;

export const totalText = styled.div`
    color: ${({ theme }) => theme.textColor} !important;
    position: relative;
`;
