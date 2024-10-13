import styled from "styled-components";

import { colors, fonts } from "@/styles";

export const Container = styled.div``;

export const ErrorMessage = styled.div`
  color: ${colors.palette.red["400"]};
  font-size: 10px;
  margin-top: 6px;
`;

export const Label = styled.h2`
  color: ${({ theme }) => theme.textColor};
  font-size: ${fonts.size.m};
  font-weight: ${fonts.weight.semiBold};
  margin-bottom: 8px;
`;

export const Option = styled.option`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textColor};
  font-size: ${fonts.size.m};
  font-weight: ${fonts.weight.semiBold};
line-height: 2; /* Increase line height */
padding: 0.5em 0;
`;

export const OptionEmptyState = styled.div`
  padding: 16px;
`;

export const SecondaryContainer = styled.div`
  margin-bottom: 24px;
`;

export const Select = styled.select<{
  $error: boolean | string;
}>`
  appearance: none;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textColor};
  border-radius: 5px;
  border: 1px solid
    ${({ $error, theme }) =>
      $error ? colors.palette.red["400"] : theme.border};
  display: block;
  // height: 35px;
  padding: 10px 15px;
  width: 100%;
  font-size: ${fonts.size.m};
  font-weight: ${fonts.weight.semiBold};
  font-family: inherit;

  &:focus {
    border: 1px solid
      ${({ $error }) =>
        $error ? colors.palette.red["400"] : colors.palette.blue["200"]};
  }

  &:hover {
    cursor: pointer;
  }

  &:hover:not(:focus) {
    border: 1px solid
      ${({ $error }) => ($error ? colors.palette.red["400"] : "#cbd0d9")};
  }
`;
