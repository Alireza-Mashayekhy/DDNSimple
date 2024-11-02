import { inputStyle } from '@/styles';
import { dropDownStyle, primeReactTreeTableStyle } from '@/styles/mixins';
import { AutoComplete } from 'primereact/autocomplete';
import styled from 'styled-components';
import { TreeTable } from 'primereact/treetable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';

export const Container = styled.div`
    padding: 10px;
    text-align: center;
`;

export const Input = styled(AutoComplete)`
    ${inputStyle}
`;

export const TreeTableStyle = styled(TreeTable)`
    ${primeReactTreeTableStyle}
`;

export const DialogStyle = styled(Dialog)`
    .p-icon {
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
    background-size: cover !important;
    background-repeat: no-repeat !important;
    position: absolute;
    width: 100%;
    height: 60vh;
`;

export const DropDownStyle = styled(Dropdown)`
    ${dropDownStyle}
`;
