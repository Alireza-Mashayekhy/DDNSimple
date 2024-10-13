import { SFC } from "@/types";
import * as S from "./Styles";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

const Toggler: SFC<{
  isSecondColumnVisible: boolean;
  toggleSecondColumn: () => void;
}> = ({
  isSecondColumnVisible,
  toggleSecondColumn,
}) => {
  return (
    <S.IconContainer onClick={toggleSecondColumn}>
      {isSecondColumnVisible ? (
        <PushPinOutlinedIcon sx={{ fontSize: "1rem" }} />
      ) : (
        <PushPinIcon sx={{ fontSize: "1rem" }} />
      )}
    </S.IconContainer>
  );
};

export default Toggler;
