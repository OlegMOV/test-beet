import React from "react";
import "./header.scss";
import { Months } from "../Months/Months";
import { HeaderButton } from "../HeaderButton/HeaderButton";
import { useCurrentMonthYear } from "../../ContextCalendar/CalendarContext";
import { isDraggableDay } from "../../logics/logics";

export const Header: React.FC<{ toogleModal: (m: number) => void }> = ({
  toogleModal,
}) => {
  const { changeMonthYear, getStarOnMonth } = useCurrentMonthYear();
  // * Set today
  const setToday = (): void => {
    changeMonthYear(new Date().getMonth(), new Date().getFullYear());
    
  };
  //  * Show help modal
  const showHelp = (): void => toogleModal(2);

  return (
    <div className="m-header">
      <Months />
      <div className="m-wrapper">
        <HeaderButton
          typeButton="greenstar"
          text={`${getStarOnMonth("amountGreenStar")}`}
          isDragable={isDraggableDay(new Date())}
        />
        <HeaderButton
          typeButton="goldstar"
          text={`${getStarOnMonth("amountGoldStar")}`}
          isDragable={isDraggableDay(new Date())}
        />
        <HeaderButton typeButton="help" text={""} onclick={showHelp} />
        <HeaderButton typeButton="text" text={"Today"} onclick={setToday} />
      </div>
    </div>
  );
};
