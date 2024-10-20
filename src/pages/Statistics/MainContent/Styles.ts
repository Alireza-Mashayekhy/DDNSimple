import { inputStyle } from '@/styles';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
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
    height: 50vh;
`;

export const DropdownStyle = styled(Dropdown)`
    ${inputStyle};
    height: 35px;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.textColorSecondary};
    background-color: ${({ theme }) => theme.primary} !important;
    .p-dropdown-label {
        padding: 0.3rem 1rem !important;
        height: 100%;
        border-radius: 0px !important;
    }
    .p-dropdown-trigger {
        background-color: ${({ theme }) => theme.primary} !important;
        color: ${({ theme }) => theme.textColor} !important;
        border-radius: 0px !important;
    }
`;
