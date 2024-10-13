import { SFC } from "@/types";
import * as S from "./Styles";
import Header from "./Header";
import CalendarDisplay from "./Calendar";

const NewsFeedColumn: SFC = () => {
  return (
    <S.Container>
      <Header />
      <CalendarDisplay />
    </S.Container>
  );
};

export default NewsFeedColumn;
