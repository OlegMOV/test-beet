import React from "react";
import {
  useCurrentMonthYear,
  MonthNames,
} from "@context/CalendarContext";
import "./months.scss";
import arrowLeft from "@assets/image/me-shot-arrow-left.svg";
import arrowRight from "@assets/image/me-shot-arrow-right.svg";

export const Months: React.FC = () => {
  const {
    currentMonthYear,
    changeMonthYear,
  } = useCurrentMonthYear();

  const changeMonth = (ev: React.MouseEvent<HTMLButtonElement>): void => {
    let prevMonth: number = currentMonthYear[0],
      prevYear: number = currentMonthYear[1];
    if (ev.currentTarget.name === "prev") {
      changeMonthYear(
        prevMonth === 0 ? 10 : prevMonth - 1,
        prevMonth === 0 ? prevYear - 1 : prevYear
      );
    } else {
      changeMonthYear(
        prevMonth === 10 ? 0 : prevMonth + 1,
        prevMonth === 10 ? prevYear + 1 : prevYear
      );
    }
  };

  return (
    <div className="m-month">
      <button className="m-month__next" name="prev" onClick={changeMonth}>
        <img src={arrowLeft} alt="<" />
      </button>
      <div className="m-month__name">{`${MonthNames[currentMonthYear[0]]} ${
        currentMonthYear[1]
      }`}</div>
      <button className="m-month__next" name="next" onClick={changeMonth}>
        <img src={arrowRight} alt=">" />
      </button>
    </div>
  );
};
