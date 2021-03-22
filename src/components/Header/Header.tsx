import React from "react";
import "./header.scss";
import { Months } from "@components/Months/Months";
import { HeaderButton } from "@components/HeaderButton/HeaderButton";
import { useCurrentMonthYear } from "@context/CalendarContext";
import { isDraggableDay } from "@logic";

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
