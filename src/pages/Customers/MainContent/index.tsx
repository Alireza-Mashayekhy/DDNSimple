import { SFC } from "@/types";
import * as S from "./Styles";
import Customers from "@/components/Customers";

const MainContent: SFC = () => {
  return (
    <S.Container>
      <Customers />
    </S.Container>
  );
};

export default MainContent;
