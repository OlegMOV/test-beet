import React from "react";
import { Day } from "@components/Day/Day";
import "./board.scss";
import { useCurrentMonthYear, WeekDays } from "@context/CalendarContext";
import { Popup } from "@components/Popup/Popup";
import { IPopup } from "@interfaces";
import { createBoardMonth } from "@logic";
import { statusAPI } from "@api";

export const Board: React.FC<{ toogleModal: (m: number) => void }> = ({
  toogleModal,
}) => {
  const {
    currentMonthYear: [curMonth, curYear],
    whatAPI,
  } = useCurrentMonthYear();
  const [currentData, setCurrentData] = React.useState<IPopup>({
    curDay: "",
    x: 0,
    y: 0,
  });
  const [days, setDays] = React.useState<Date[]>([]);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const rf = ref?.current
    const listenClick = (event: MouseEvent | TouchEvent) => {
      if (!rf || rf.contains(event.target as Node)) {
        return;
      }
      setCurrentData({ curDay: "", x: 0, y: 0 });
    };
    document.addEventListener(`mousedown`, listenClick);
    document.addEventListener(`touchstart`, listenClick);
    return () => {
      document.removeEventListener(`mousedown`, listenClick);
      document.removeEventListener(`touchstart`, listenClick);
    };
  }, []);
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
    <div className={sizeBoard} ref={ref}>
      {}
      {Object.keys(WeekDays)
        .filter((x) => !(parseInt(x) >= 0))
        .map((_, i) => (
          <div className="m-board__weekdays" key={i}>
            {whatAPI === statusAPI.LOADING && i === 3 && <h4>Loading...</h4>}
            {whatAPI === statusAPI.ERROR && i === 3 && <h4>Error API</h4>}
            {whatAPI === statusAPI.SUCCESS && WeekDays[i]}
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
