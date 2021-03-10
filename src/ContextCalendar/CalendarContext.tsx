import React from "react";
import { TypeButton } from "../components/HeaderButton/HeaderButton";

// * Limit stars on the month
const limitGreen: number = 21;
const limitGold: number = 7;

export enum MonthNames {
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
}
export enum WeekDays {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}
// * Interface for item Global state
export interface IResault {
  redCounts: number;
  greenCounts: number;
  stepCounts: number;
  amountGreenStar: number;
  amountGoldStar: number;
}
// * Interface for Global state
export interface IStateResaults {
  [keyDate: string]: IResault;
}
// * Interface for context
interface ICalendar {
  readonly currentMonthYear: [m: number, y: number]; // ? Current month and year
  changeMonthYear: (m: number, y: number) => void; // ? Set current month and year
  readonly selectedDate: string; // ? Selected date
  changeSelectedDate: (d: string) => void; // ? Change selected date
  readonly getDraggedStar: TypeButton; // ? How star dragg
  readonly totalState: IStateResaults; // ? Global state
  changeGlobalState: (data: IStateResaults) => void; // ? Update global State
  getResaultOnDate: (d: string) => IResault; // ? Get data from global state on selected date
  getStarOnMonth: (typeStar: "amountGreenStar" | "amountGoldStar") => number; // ? Get amount green | gold star in selected month
  setDraggedStar?: (drg: TypeButton) => void; // ? set Dragged star
}

let initialState: IStateResaults = {
  "2021-02-26": {
    redCounts: 3,
    greenCounts: 7,
    stepCounts: 1000,
    amountGreenStar: 0,
    amountGoldStar: 0,
  },
  "2021-03-04": {
    redCounts: 5,
    greenCounts: 12,
    stepCounts: 4500,
    amountGreenStar: 2,
    amountGoldStar: 0,
  },
  "2021-03-06": {
    redCounts: 1,
    greenCounts: 6,
    stepCounts: 2000,
    amountGreenStar: 1,
    amountGoldStar: 0,
  },
  "2021-03-08": {
    redCounts: 5,
    greenCounts: 14,
    stepCounts: 8000,
    amountGreenStar: 0,
    amountGoldStar: 1,
  },
};
// * Initial Context
const CalendarContext = React.createContext<ICalendar>({
  currentMonthYear: [new Date().getMonth(), new Date().getFullYear()],
  changeMonthYear: () => console.log("void"),
  selectedDate: "",
  changeSelectedDate: () => console.log("void"),
  totalState: initialState,
  getDraggedStar: "",
  changeGlobalState: (initialState) => console.log("void"),
  getResaultOnDate: () => ({
    redCounts: 0,
    greenCounts: 0,
    stepCounts: 0,
    amountGreenStar: 0,
    amountGoldStar: 0,
  }),
  getStarOnMonth: () => 0,
  setDraggedStar: () => console.log("void"),
});
// * Hook for get Context data
export const useCurrentMonthYear = () => {
  return React.useContext(CalendarContext);
};

export const CalendarContextProvider: React.FC<React.ReactNode> = ({
  children,
}) => {
  // * Global state
  const [resaults, setResaults] = React.useState<IStateResaults>(initialState);
  // * Current month and year
  const [curMonthYear, setCurMonthYear] = React.useState<[number, number]>([
    new Date().getMonth(),
    new Date().getFullYear(),
  ]);
  // * Selected date
  const [currentDate, setCurrentDate] = React.useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  // * Dragged star
  const [draggedStar, setDraggedStar] = React.useState<TypeButton>("");
  // * Set current month and year
  const handlerCurrentMonthYear = (m: number, y: number): void => {
    setCurMonthYear([m, y]);
  };
  // * Set item into Global state
  const handleItemGlobalState = (data: IStateResaults): void => {
    setResaults((prev) => ({ ...prev, ...data }));
    setDraggedStar("")
  };
  // * Get item Global state
  const getResult: (d: string) => IResault = (d: string) => {
    if (Object.keys(resaults).includes(d)) return resaults[d];
    return {
      redCounts: 0,
      greenCounts: 0,
      stepCounts: 0,
      amountGreenStar: 0,
      amountGoldStar: 0,
    };
  };
  // * Calculate amount stars on current month
  const getAmountStar: (
    typeStar: "amountGreenStar" | "amountGoldStar"
  ) => number = (typeStar) => {
    let res = Object.keys(resaults)
      .filter((i) => Number(i.slice(5, 7)) === curMonthYear[0] + 1)
      .map((i) => resaults[i])
      .reduce((acc, i) => acc + i[typeStar], 0);
    return typeStar === "amountGreenStar" ? limitGreen - res : limitGold - res;
  };
  return (
    <CalendarContext.Provider
      value={{
        currentMonthYear: curMonthYear,
        changeMonthYear: handlerCurrentMonthYear,
        selectedDate: currentDate,
        changeSelectedDate: setCurrentDate,
        totalState: resaults,
        getDraggedStar: draggedStar,
        changeGlobalState: handleItemGlobalState,
        getResaultOnDate: getResult,
        getStarOnMonth: getAmountStar,
        setDraggedStar: setDraggedStar,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
