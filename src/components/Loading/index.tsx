import { SFC } from "@/types";
import * as S from "./Styles";
import { ProgressSpinner } from "primereact/progressspinner";
import logoPath from "@/assets/logoblack.png";

const LoadingComponent: SFC = () => {
  return (
    <S.Container>
      <S.LoadingOverlay>
        <S.CustomSpinnerWrapper>
          <ProgressSpinner
            style={{ width: "150px", height: "150px" }}
            strokeWidth="4"
          />
          <S.LogoContainer>
            <S.Logo src={logoPath} alt="App Logo" />
          </S.LogoContainer>
        </S.CustomSpinnerWrapper>
        <div>لطفا کمی منتظر بمانید...</div>
      </S.LoadingOverlay>
    </S.Container>
  );
};

export default LoadingComponent;
