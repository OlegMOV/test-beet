export {};

declare global {
  interface Date {
    addDays(days: number, useThis?: boolean): Date;
    isToday(): boolean;
    // clone(): Date;
    isAnotherMonth(date: Date): boolean;
    isWeekend(): boolean;
    isSameDate(date: Date): boolean;
    isInterval(date: Date, n: number): boolean;
    // getStringDate(): String;
  }
}

Date.prototype.addDays = function (days: number): Date {
  if (!days) return this;
  let date = this;
  date.setDate(date.getDate() + days);

  return date;
};

Date.prototype.isToday = function (): boolean {
  let today = new Date();
  return this.isSameDate(today);
};

Date.prototype.isInterval = function (date: Date, n: number): boolean {
  let curDate = this;
  let diff: number = Math.round(
    (curDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diff === 0 || Math.sign(diff) === Math.sign(n)) {
    if (0 <= Math.abs(diff) && Math.abs(diff) <= Math.abs(n)) return true;
  }
  return false;
};
// Date.prototype.clone = function (): Date{
//    return new Date(+this);
// };

Date.prototype.isAnotherMonth = function (date: Date): boolean {
  return date && this.getMonth() !== date.getMonth();
};

Date.prototype.isWeekend = function (): boolean {
  return this.getDay() === 0 || this.getDay() === 6;
};

Date.prototype.isSameDate = function (date: Date): boolean {
  return (
    date &&
    this.getFullYear() === date.getFullYear() &&
    this.getMonth() === date.getMonth() &&
    this.getDate() === date.getDate()
  );
};

// Date.prototype.getStringDate = function (): String {
//     //Month names in Brazilian Portuguese
//     let monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
//     //Month names in English
//     //let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//     let today = new Date();
//     if (this.getMonth() == today.getMonth() && this.getDay() == today.getDay()) {
//         return "Hoje";
//         //return "Today";
//     } else if (this.getMonth() == today.getMonth() && this.getDay() == today.getDay() + 1) {
//         return "Amanhã";
//         //return "Tomorrow";
//     } else if (this.getMonth() == today.getMonth() && this.getDay() == today.getDay() - 1) {
//         return "Ontem";
//         //return "Yesterday";
//     } else {
//         return this.getDay() + ' de ' + this.monthNames[this.getMonth()] + ' de ' + this.getFullYear();
//         //return this.monthNames[this.getMonth()] + ' ' + this.getDay() + ', ' +  this.getFullYear();
//     }
// }
