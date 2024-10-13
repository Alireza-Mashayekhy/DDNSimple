import { SFC } from "@/types";
import * as S from "./Styles";

export interface ButtonProps {
  loading: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SendDataButton: SFC<ButtonProps> = ({ onClick, loading }) => {
  return (
    <S.StyledButton onClick={onClick} disabled={loading}>
      {loading && <S.StyledCircularProgress size={18} />}
      {loading ? "در حال ثبت..." : "ثبت"}
    </S.StyledButton>
  );
};

export default SendDataButton;
