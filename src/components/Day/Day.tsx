import React from "react";
import "./day.scss";
import {
  useCurrentMonthYear,
  MonthNames,
  IResault,
  IStateResaults,
} from "@context/CalendarContext";
import "../../date.extensions";
import { howGood, isGetStar } from "@logic";
import greenstar from "@assets/image/star-green.svg";
import goldstar from "@assets/image/star-gold.svg";
import me_ok from "@assets/image/me-ok.svg";
import { IPopup } from "@interfaces";

interface IDay {
  date: Date;
  toogleModal: (m: number) => void;
  popupDialog?: (data: IPopup) => void;
  tasks?: {
    task: string;
  };
}
const prefixClass: string = "me-day";
enum WeekDays {
  sun,
  mon,
  tue,
  wed,
  thu,
  fri,
  sat,
}

const transformDate = (d: Date): string => {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)
    .toISOString()
    .slice(0, 10);
};

const totalResault = (data: IResault): number => {
  let res: number = Math.floor(
    Math.floor(data.greenCounts / 2) +
      Math.floor(data.stepCounts / 1000) -
      data.redCounts -
      data.amountGreenStar * 3 -
      data.amountGoldStar * 9
  );
  return res > 0 ? res : 0;
};
const today: Date = new Date(new Date().setHours(12, 0, 0, 0));

export const Day: React.FC<IDay> = ({ date, toogleModal, popupDialog }) => {
  // * Hooks for get current date and data
  const {
    currentMonthYear: [curMonth],
    changeSelectedDate,
    getResaultOnDate,
    getDraggedStar,
    changeGlobalState,
  } = useCurrentMonthYear();
  // * Get resaults on this day
  const res: IResault = getResaultOnDate(transformDate(date));
  // * Create Class CSS for this day
  const classDay: string = `${prefixClass} ${WeekDays[date.getDay()]} ${
    howGood(res.greenCounts, res.redCounts, res.stepCounts).status
  }`;
  // * Craete class for date
  const classDate: string = `${prefixClass}__date${
    date.isToday() ? " today" : ""
  }${date.getMonth() === curMonth ? "" : " another"}`;
  // * Is editable day
  const isEditable: boolean = date.isInterval(today, -2);
  // * Show/hide modal
  const showMd = (): void => {
    toogleModal(1);
    changeSelectedDate(transformDate(date));
  };
  // * Add name month to 1st day next month
  const labelDate: string = `${date.getDate()} ${
    date.getMonth() > curMonth && date.getDate() === 1
      ? MonthNames[date.getMonth() === 11 ? 0 : date.getMonth()].slice(0, 3)
      : ""
  }`;
  // * Change background when drag element above
  const starOnCard = (ev: React.DragEvent): void => {
    ev.preventDefault();
    if (ev.currentTarget.parentElement)
      ev.currentTarget.parentElement.style.backgroundColor =
        "rgba(87, 148, 116, 0.08)";
  };
  // * Back to old background
  const endOnCard = (ev: React.DragEvent): void => {
    if (ev.currentTarget.parentElement)
      ev.currentTarget.parentElement.style.backgroundColor = "#FFFFFF";
  };
  // * Add star to Global state
  const setStar = (ev: React.DragEvent): void => {
    if (ev.currentTarget.parentElement)
      ev.currentTarget.parentElement.style.backgroundColor = "#FFFFFF";
    const getPossible = isGetStar(res);
    if (getDraggedStar === "greenstar" && getPossible.possibleGreen > 0) {
      let data: IResault = { ...res, amountGreenStar: res.amountGreenStar + 1 };
      let temp: IStateResaults = { [transformDate(date)]: data };
      changeGlobalState(temp);
      return;
    }
    if (getDraggedStar === "goldstar" && getPossible.possibleGoldStar > 0) {
      let data: IResault = {
        ...res,
        amountGreenStar: res.amountGreenStar - 3,
        amountGoldStar: res.amountGoldStar + 1,
      };
      let temp: IStateResaults = { [transformDate(date)]: data };
      changeGlobalState(temp);
      return;
    }
  };

  const handlerHover = (ev: React.MouseEvent): void => {
    if (popupDialog)
      popupDialog({
        curDay: "",
        x: 0,
        y: 0,
      });
    let board = ev.currentTarget as HTMLDivElement;
    const widthPopup: number = 285; // ? width popup FC
    // ! Need adaptive Y
    let widthBoard: number = board.offsetParent?.clientWidth || 0; // ? width parent FC
    // let heightBoard = board.offsetParent?.clientHeight || 0;
    const {
      width: widthDay,
      // height: heightDay,
      left: xClient,
      top: yClient,
    } = board.getClientRects()[0];
    let offsetLeftBoard = board.parentElement?.offsetLeft || 0;
    let offsetTopBoard = board.parentElement?.offsetTop || 0;
    let xCandidate = xClient + widthDay + 15 - offsetLeftBoard;
    if (xCandidate + widthPopup > widthBoard) {
      xCandidate = xClient - 15 - widthPopup - offsetLeftBoard;
    }
    if (popupDialog)
      popupDialog({
        curDay: transformDate(date),
        x: xCandidate,
        y: yClient - offsetTopBoard,
      });
    ev.stopPropagation();
  };
  return (
    <div className={classDay} onClick={handlerHover}>
      <div className={classDate}>{labelDate}</div>
      {isEditable && (
        <div
          className={`${prefixClass}__update`}
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();
            showMd();
          }}
        >
          Update
        </div>
      )}
      <div
        className="me-day__body"
        onDragOver={starOnCard}
        onDragLeave={endOnCard}
        onDrop={setStar}
      >
        {res.greenCounts > 0 &&
          Array(totalResault(res))
            .fill("")
            .map((i, ind) => (
              <img src={me_ok} alt="!" key={ind} draggable={false} />
            ))}
        {res.amountGreenStar > 0 &&
          Array(res.amountGreenStar)
            .fill("")
            .map((i, ind) => (
              <img src={greenstar} alt="" key={ind} draggable={false} />
            ))}
        {res.amountGoldStar > 0 &&
          Array(res.amountGoldStar)
            .fill("")
            .map((i, ind) => (
              <img src={goldstar} alt="" key={ind} draggable={false} />
            ))}
      </div>
    </div>
  );
};
