import React from "react";
import IconButton from "@mui/material/IconButton";
import { colors } from "@/styles";
import { darkTheme, lightTheme } from "@/styles/theme";

interface FocusableIconProps {
  IconComponent: React.ElementType;
  px?: number | string;
  pl?: number | string;
  pr?: number | string;
  py?: number | string;
  iconProps?: object;
  buttonProps?: object;
  theme?: string;
  onClick?: () => void;
}

const FocusableIcon: React.FC<FocusableIconProps> = ({
  IconComponent,
  px,
  pl,
  pr,
  py,
  iconProps,
  theme,
  onClick,
  ...buttonProps
}) => {
  return (
    <IconButton
      {...buttonProps} // Spread any additional IconButton props
      sx={{
        color: theme === "dark" ? darkTheme.textColor : lightTheme.textColor,
        py: py,
        pl: pl,
        pr: pr,
        px: px,
        "&:focus": {
          backgroundColor:
            theme === "dark" ? darkTheme.secondary : lightTheme.secondary, // Use your theme's secondary color
          color: colors.selectBlueColor,
        },
        // ...(buttonProps.sx as SxProps<Theme>), // Allow custom styles to be passed
      }}
      tabIndex={0} // Makes the IconButton focusable
      onClick={onClick}
    >
      <IconComponent {...iconProps} />
    </IconButton>
  );
};

export default FocusableIcon;
