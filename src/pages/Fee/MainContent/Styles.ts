import { inputStyle } from '@/styles';
import { AutoComplete } from 'primereact/autocomplete';
import { InputNumber } from 'primereact/inputnumber';
import styled from 'styled-components';

export const Container = styled.div`
    padding: 10px;
    text-align: center;
`;

export const Input = styled(AutoComplete)`
    ${inputStyle}
`;

export const NumInput = styled(InputNumber)`
    ${inputStyle}
`;
