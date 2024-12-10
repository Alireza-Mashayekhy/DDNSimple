import { SFC } from "@/types";
import * as S from "./Styles";
import Tooltip from "@mui/material/Tooltip";

export interface MenuButtonProps {
  icon: string;
  onClick?: () => void;
  text: string;
}

const MenuButton: SFC<MenuButtonProps> = ({
  className,
  icon,
  onClick,
  text,
}) => {
  return (
    <Tooltip
      title={<span style={{ fontFamily: "IRANSans" }}>{text}</span>}
      placement="left"
    >
      <S.MenuButton $isActive={false} className={className} onClick={onClick}>
        <S.Icon path={icon} size="26px" />
      </S.MenuButton>
    </Tooltip>
  );
};

export default MenuButton;
