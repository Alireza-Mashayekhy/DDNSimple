import { SFC } from "@/types";
import * as S from "./Styles";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const CalendarDisplay: SFC = () => {
  const date = new Date();

  return (
    <>
      <S.CalendarContainer>
        <S.StyledCalendar
          monthYearSeparator="|"
          buttons={false}
          calendar={persian}
          locale={persian_fa}
        />
      </S.CalendarContainer>
      <S.SimpleCalendarContainer>
        {date.toLocaleDateString("fa-IR", {
          month: "long",
          year: "numeric",
          day: "numeric",
          calendar: "persian",
        })}
      </S.SimpleCalendarContainer>
    </>
  );
};

export default CalendarDisplay;
