import { useLocation } from "react-router-dom";

import { SFC } from "@/types";
import * as S from "./Styles";
import Tooltip from "@mui/material/Tooltip";

export interface MenuLinkProps {
  icon: string;
  rootPath: string;
  text: string;
  to: string;
}

const MenuLink: SFC<MenuLinkProps> = ({
  className,
  icon,
  rootPath,
  text,
  to,
}) => {
  const location = useLocation();

  return (
    <Tooltip
      title={<span style={{ fontFamily: "IRANSans" }}>{text}</span>}
      placement="left"
    >
      <S.MenuLink
        $isActive={location.pathname.includes(rootPath)}
        className={className}
        to={to}
      >
        <S.Icon path={icon} size="26px" />
      </S.MenuLink>
    </Tooltip>
  );
};

export default MenuLink;
