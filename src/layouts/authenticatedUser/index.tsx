import { SFC } from "@/types";
import Nav from "./Nav";
import MainArea from "./MainArea";
import * as S from "./Styles";
import ResponsiveNav from "./Nav/ResponsiveNav";

const AuthenticatedUser: SFC = () => {
  return (
    <>
      <S.HambugerMenuContainer>
        <ResponsiveNav />
      </S.HambugerMenuContainer>
      <S.Container>
        <Nav />
        <MainArea />
      </S.Container>
    </>
  );
};

export default AuthenticatedUser;
