import { inputStyle } from '@/styles';
import { inputTextStyle } from '@/styles/mixins';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import styled from 'styled-components';

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
    background-position: center !important;
    background-repeat: no-repeat !important;
    position: absolute;
    width: 100%;
    height: 60vh;
`;
