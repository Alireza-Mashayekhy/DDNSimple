import { inputStyle } from '@/styles';
import { inputTextStyle } from '@/styles/mixins';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import styled from 'styled-components';
import UIcon from '@mdi/react';

export const Container = styled.div`
    padding: 20px;
    padding-top: 50px;
    position: relative;
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

export const FloatLabelInput = styled(InputText)`
    background-color: transparent !important;
    color: ${({ theme }) => theme.textColor} !important;
    margin: 0 !important;
    width: 190px;
    height: 35px;
    border-radius: 0px;
    outline: none !important;
    border: none !important;
    direction: ltr;
    border-bottom: 1px solid ${({ theme }) => theme.textColor} !important;
    font-size: 0.875rem;
    &:focus {
        outline: none !important;
        border: none !important;
        box-shadow: none !important;
        border-bottom: 1px solid ${({ theme }) => theme.textColor} !important;
    }
`;

export const FloatNumInput = styled(InputNumber)`
    input {
        background-color: transparent !important;
        color: ${({ theme }) => theme.textColor} !important;
        margin: 0 !important;
        width: 190px;
        height: 35px;
        border-radius: 0px;
        outline: none !important;
        border: none !important;
        direction: ltr;
        border-bottom: 1px solid ${({ theme }) => theme.textColor} !important;
        font-size: 0.875rem;
        &:focus {
            outline: none !important;
            border: none !important;
            box-shadow: none !important;
            border-bottom: 1px solid ${({ theme }) => theme.textColor} !important;
        }
    }
`;

export const FloatLabelSection = styled(FloatLabel)`
    &:focus {
        outline: none !important;
        border: none !important;
        border-bottom: 1px solid ${({ theme }) => theme.textColor} !important;
    }
    label {
        color: ${({ theme }) => theme.textColor} !important;
    }
`;

export const Background = styled.div<{ $url: string }>`
    background:
        linear-gradient(
            to top,
            ${({ theme }) => theme.secondary} 50%,
            ${({ theme }) => theme.secondaryOpacity} 100%
        ),
        ${({ $url }) => `url(${$url})`} no-repeat center center;
    // background:  !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    position: absolute;
    width: 100%;
    height: 60vh;
`;
export const RemoveMessage = styled.span`
    color: ${({ theme }) => theme.textColor};
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

export const DeleteButton = styled(Button)`
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
