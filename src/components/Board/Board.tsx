import React from "react";
import { Day } from "../Day/Day";
import "./board.scss";
import {
  useCurrentMonthYear,
  WeekDays,
} from "../../ContextCalendar/CalendarContext";
import { Popup } from "../Popup/Popup";
import { IPopup } from "../../allInterfaces";
import { createBoardMonth } from "../../logics/logics";

export const Board: React.FC<{ toogleModal: (m: number) => void }> = ({
  toogleModal,
}) => {
  const {
    currentMonthYear: [curMonth, curYear],
  } = useCurrentMonthYear();
  const [currentData, setCurrentData] = React.useState<IPopup>({
    curDay: "",
    x: 0,
    y: 0,
  });
  const [days, setDays] = React.useState<Date[]>([]);
  React.useEffect(() => {
    setDays(createBoardMonth(curMonth, curYear));
    setCurrentData({ curDay: "", x: 0, y: 0 });
  }, [curMonth, curYear]);
  // * Change columns amount
  const sizeBoard: string = `m-board ${days.length > 35 ? "large" : ""}`;

  const getPopUp = (data: IPopup): void => {
    if (data.curDay === currentData.curDay)
      setCurrentData({ curDay: "", x: 0, y: 0 });
    else setCurrentData(data);
  };

  return (
    <div className={sizeBoard}>
      {Object.keys(WeekDays)
        .filter((x) => !(parseInt(x) >= 0))
        .map((_, i) => (
          <div className="m-board__weekdays" key={i}>
            {WeekDays[i]}
          </div>
        ))}
      {days.map((day_, ind) => (
        <Day
          date={day_}
          key={ind}
          toogleModal={toogleModal}
          popupDialog={getPopUp}
        />
      ))}
      {currentData.curDay.length > 0 && <Popup data={currentData} />}
    </div>
  );
};
