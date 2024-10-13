import styled, { css } from "styled-components";
import UIcon from "@mdi/react";

import { colors, fonts } from "@/styles";
import { ButtonColor } from "./types";

const BUTTON_HEIGHT = 40;

const disabledMixin = (backgroundColor: string) => css`
  background: ${backgroundColor || colors.palette.blue["300"]};
  cursor: not-allowed;
  opacity: 0.65;

  &:hover {
    background: ${backgroundColor || colors.palette.blue["300"]};
  }
`;

const hasIconMixin = css`
  align-items: center;
  border-radius: 6px;
  display: flex;
  width: auto;
`;

const secondaryMixin = css`
  background: transparent;
  border-color: rgb(207, 217, 222);
  color: ${colors.primary};

  &:hover {
    background: ${colors.whiteHover};
  }
`;

const successMixin = css`
  background: ${colors.palette.green["300"]};

  &:hover {
    background: ${colors.palette.green["400"]};
  }
`;

export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "borderRadius",
      "backgroundColor",
      "borderColor",
      "$color",
      "$hasIcon",
    ].includes(prop),
})<{
  $color: ButtonColor;
  $hasIcon: boolean;
  borderRadius: string;
  backgroundColor: string;
  borderColor: string;
}>`
  background: ${(props) => props.backgroundColor || colors.palette.blue["400"]};
  border-radius: ${(props) => props.borderRadius || `${BUTTON_HEIGHT / 2}px`};
  border: ${(props) => `1px solid ${props.backgroundColor}||transparent`};
  color: ${colors.white};
  cursor: pointer;
  display: block;
  font-family: ${fonts.family.default};
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
  height: ${`${BUTTON_HEIGHT}px`};
  padding: 5px 20px;
  transition: all 0.1s;

  &:hover {
    background: ${colors.palette.blue["500"]};
  }

  ${({ $color }) => {
    if ($color === ButtonColor.secondary) return secondaryMixin;
    if ($color === ButtonColor.success) return successMixin;
    return;
  }}

  ${(props) => props.disabled && disabledMixin(props.backgroundColor)};

  ${({ $hasIcon }) => $hasIcon && hasIconMixin}
`;

export const IconLeft = styled(UIcon)`
  margin-right: 6px;
`;

export const IconRight = styled(UIcon)`
  margin-left: 6px;
`;
