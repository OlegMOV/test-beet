export interface IHealth {
  status: "happy" | "neutral" | "sad" | "choose";
}

export interface IPopup {
  curDay: string; 
  x: number; 
  y: number
}