import { Field as UField } from 'formik';
import styled from 'styled-components';

import { colors, fonts, inputStyle } from '@/styles';

export const ErrorMessage = styled.div`
    color: ${colors.palette.red['400']};
    font-size: 12px;
    margin-top: 6px;
    padding-right: 40px;
    position: absolute;
    // top: 7px;
    right: 0;
`;
export const Label = styled.label<{ isFocused: boolean }>`
    font-size: ${fonts.size.m};
    margin-bottom: 8px;
    text-align: right;
    color: black !important;
    transition: all 0.2s ease;
    position: absolute;
    right: 40px;
    z-index: 1;
    transform: ${({ isFocused }) =>
        isFocused ? 'translateY(-20px)' : 'translateY(0)'};
    font-size: ${({ isFocused }) => (isFocused ? '13px' : '15px')};
`;

export const Field = styled(UField)`
    ${inputStyle};
    color: black !important;
    border: 1px solid
        ${({ $error, theme }) =>
            $error ? colors.palette.red['400'] : theme.border};
    border-bottom: 1px solid ${({ $error }) => ($error ? 'red' : 'black')} !important;
    display: block;
    width: 100%;
    border-radius: 5px;
`;

export const SecondaryContainer = styled.div`
    margin-bottom: 32px;
    text-align: right;
`;

export const Icon = styled.div`
    margin-bottom: 32px;
    text-align: left;
`;
