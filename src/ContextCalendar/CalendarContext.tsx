import React from "react";
import { TypeButton } from "@components/HeaderButton/HeaderButton";
import { IDataAPI, methodAPI, statusAPI, useFetchAPI } from "@api";
import * as path from "path";

// * Limit stars on the month
const limitGreen: number = 21;
const limitGold: number = 7;

// * URL API, users id
const urlAPI: string = "https://test-beetroot.herokuapp.com/achieves";
const userID: string = "60508d17f0eddc279bda88bb";

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
  readonly whatAPI: statusAPI;
}

let initialState: IStateResaults = {
  "2021-02-26": {
    redCounts: 3,
    greenCounts: 7,
    stepCounts: 1000,
    amountGreenStar: 0,
    amountGoldStar: 0,
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
  whatAPI: statusAPI.SUCCESS,
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
  // * Hook for API
  const [resaultsAPI, createQuery, isLoading] = useFetchAPI();
  // * Set current month and year
  const handlerCurrentMonthYear = (m: number, y: number): void => {
    setCurMonthYear([m, y]);
  };
  // * Set item into Global state / API
  const handleItemGlobalState = (data: IStateResaults): void => {
    // setResaults((prev) => ({ ...prev, ...data }));
    if (Object.keys(data).length === 1) {
      let methodapi: methodAPI = methodAPI.post;
      let dateEdit: string = Object.keys(data)[0];
      if (Object.keys(resaults).includes(dateEdit)) methodapi = methodAPI.put;
      let temp: IDataAPI = {
        redBalls: Number(data[dateEdit].redCounts) || 0,
        greenBalls: Number(data[dateEdit].greenCounts) || 0,
        countSteps: Number(data[dateEdit].stepCounts) || 0,
        greenStars: Number(data[dateEdit].amountGreenStar) || 0,
        goldStars: Number(data[dateEdit].amountGoldStar) || 0,
        date: dateEdit,
        personID: userID,
      };
      createQuery({
        url: urlAPI,
        params: "",
        method: methodapi,
        data: temp,
      });
    }
    setDraggedStar("");
  };
  // * Initial state from API
  React.useEffect(() => {
    createQuery({
      url: path.join(urlAPI, "month", userID),
      params: { month: curMonthYear[0] + 1, year: curMonthYear[1] },
      method: methodAPI.get,
    });
  }, []);
  // * Change local state
  React.useEffect(() => {
    if (typeof resaultsAPI === "string" || resaultsAPI === []) return;
    let temp: IStateResaults = Object.fromEntries(
      resaultsAPI.map((item) => [
        [String(item.date)],
        {
          redCounts: Number(item.redBalls) || 0,
          greenCounts: Number(item.greenBalls) || 0,
          stepCounts: Number(item.countSteps) || 0,
          amountGreenStar: Number(item.greenStars) || 0,
          amountGoldStar: Number(item.goldStars) || 0,
        },
      ])
    );
    setResaults((prev) => ({ ...prev, ...temp }));
    // handleItemGlobalState(temp);
  }, [resaultsAPI]);
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
        whatAPI: isLoading,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
