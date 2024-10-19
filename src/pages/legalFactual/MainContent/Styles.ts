import { inputStyle } from '@/styles';
import { primeReactTreeTableStyle } from '@/styles/mixins';
import { AutoComplete } from 'primereact/autocomplete';
import styled from 'styled-components';
import { TreeTable } from 'primereact/treetable';
import { Dialog } from 'primereact/dialog';

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
    // background:  !important;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    position: absolute;
    width: 100%;
    height: 60vh;
`;
