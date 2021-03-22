import { IHealth } from "../allInterfaces";
import { IResault } from "../ContextCalendar/CalendarContext";

export const howGood = (g: number, r: number, step: number): IHealth => {
  let res: number = 0;
  if (g === 0 && r === 0 && step === 0) return { status: "choose" };
  try {
    if (r === 0) r = 1;
    res = (g + Math.floor(step / 1000)) / r;
  } catch {
    return { status: "choose" };
  }
  if (res > 2) return { status: "happy" };
  else if (res <= 1) return { status: "sad" };
  else return { status: "neutral" };
};

export const createBoardMonth = (m: number, y: number): Array<Date> => {
  let firstDay: number = new Date(y, m, 1).getDay();
  let listD: Date[] = [];
  const sizeBoard: number =
    firstDay + new Date(y, m + 1, 0).getDate() > 35 ? 42 : 35;
  for (let cell in Array.from({ length: sizeBoard }, (_, i) => i)) {
    listD.push(new Date(y, m, Number(cell) - firstDay + 1, 12, 0, 1, 0));
  }
  return listD;
};

export const isDraggableDay = (d: Date): boolean => {
  // if (d.isWeekend()) return true;
  // return false;
  return true;
};

export const isGetStar = (
  res: IResault
): { possibleGreen: number; possibleGoldStar: number } => {
  try {
    const totalResault: number =
      Math.floor(res.greenCounts / 2) +
      Math.floor(res.stepCounts / 1000) -
      res.redCounts;
    return {
      possibleGreen: Math.floor(
        (totalResault - res.amountGreenStar * 3 - res.amountGoldStar * 9) / 3
      ),
      possibleGoldStar: Math.floor(res.amountGreenStar / 3),
    };
  } catch {
    return { possibleGreen: 0, possibleGoldStar: 0 };
  }
};
