import { inputStyle } from '@/styles';
import { dropDownStyle } from '@/styles/mixins';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
    padding-top: 50px;
    position: relative;
    text-align: center;
`;

export const Input = styled(AutoComplete)`
    ${inputStyle}
`;

export const NumInput = styled(InputNumber)`
    ${inputStyle}
`;

export const DropDownStyle = styled(Dropdown)`
    ${dropDownStyle}
`;

export const TextInput = styled(InputText)`
    background-color: ${({ theme }) => theme.primary} !important;
    color: ${({ theme }) => theme.textColor} !important;
    margin: 0 !important;
    width: 190px;
    height: 35px;
    font-size: 0.875rem;
    &::placeholder {
        color: ${({ theme }) => theme.hoverText};
        opacity: 1;
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
    height: 70vh;
`;
