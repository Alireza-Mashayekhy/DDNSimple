import styled from "styled-components";
import { breakpoints, fonts } from "@/styles";
import { Calendar } from "react-multi-date-picker";

export const CalendarContainer = styled.div`
  text-align: center;
  padding: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

export const MonthYearHeader = styled.div`
  font-size: 0.8rem;
  margin-bottom: 0.3rem;
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
`;

export const Day = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isToday"].includes(prop),
})<{ isToday: boolean }>`
  padding: 10px;
  border-radius: ${({ isToday }) => (isToday ? "20%" : "0")};
  background-color: ${({ isToday }) => (isToday ? "#add8e6" : "none")};
`;

export const SimpleCalendarContainer = styled.div`
  display: none;
  @media (max-width: ${breakpoints.tablet}) {
    display: block;
    color: ${({ theme }) => theme.textColor};
    direction: rtl;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    text-align: center;
    padding: 10px;
  }
`;

export const StyledCalendar = styled(Calendar)`
  background-color: ${({ theme }) => theme.secondary};
  // color: ${({ theme }) => theme.textColor};
  width: 100%; /* Adjust width as needed */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px auto; /* Adjust margin as needed */
  border-radius: 5px; /* Optional: Add rounded corners */
  // padding: 5px; /* Optional: Add padding */
  font-weight: ${fonts.weight.semiBold};
  .rmdp-day {
    color: #808080;
    // color: ${({ theme }) => theme.color} !important;
  }
  .rmdp-header-values {
    color: #808080;
    // color: ${({ theme }) => theme.monthYearColor} !important;
  }
`;
