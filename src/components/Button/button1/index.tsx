import React from "react";
import * as S from "./styles";
import { Button } from "@mui/material";

import styled from "styled-components";

const StyledButton = styled(Button)`
  ${S.button1}; // Apply the CSS module using styled-components
`;

interface ButtonProps {
  children: string;
  type?: "submit" | "button" | "reset" | undefined; // Optional "type" prop with allowed values
  variant?: "outlined" | "contained" | "text";
  onClick: () => void;
  disabled?: boolean;
}

const ButtonN1: React.FC<ButtonProps> = (props) => {
  const {
    children,
    type = "button",
    variant = "outlined",
    disabled = false,
    onClick,
  } = props; // Set default value for "type" prop

  return (
    <StyledButton
      type={type}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default ButtonN1;
