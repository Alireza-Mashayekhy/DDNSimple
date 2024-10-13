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
