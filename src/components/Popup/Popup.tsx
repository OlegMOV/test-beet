import React from "react";
import "./popup.scss";
import CSS from "csstype";
import {
  useCurrentMonthYear,
  IResault,
} from "@context/CalendarContext";
import { howGood } from "@logic";
import { IHealth, IPopup } from "@interfaces";
import greenBall from "@assets/image/me-green-ball.svg";
import redBall from "@assets/image/me-red-ball.svg";
import steps from "@assets/image/me-steps.svg";
import happy from "@assets/image/me-emoji-happy.svg";
import neutral from "@assets/image/me-emoji-neutral.svg";
import sad from "@assets/image/me-emoji-sad.svg";

const weightCounts = (n: number): string => `${n > 0 ? "active" : ""}`;

export const Popup: React.FC<{ data: IPopup }> = ({ data }) => {
  const { getResaultOnDate } = useCurrentMonthYear();

  const currentPosition: CSS.Properties = {
    top: `${data.y}px`,
    left: `${data.x}px`,
  };

  // * Get resaults on this day
  const res: IResault = getResaultOnDate(data.curDay);
  // * Choose emoji
  const mood: IHealth = howGood(res.greenCounts, res.redCounts, res.stepCounts);
  // * Upper last icon emoji
  const styleEmoji: CSS.Properties = {
    height: "24px",
    width: "24px",
    marginRight: "6px",
  };

  if (data.curDay.length < 10) return null;
  return (
    <div className="me-popup" style={currentPosition}>
      <div className="me-popup__line">
        <img src={greenBall} alt="o" />
        <span className={weightCounts(res.greenCounts)}>{res.greenCounts}</span>
        natural foods eaten
      </div>
      <div className="me-popup__line">
        <img src={redBall} alt="o" />
        <span className={weightCounts(res.redCounts)}>{res.redCounts}</span>
        non-natural foods eaten
      </div>
      <div className="me-popup__line">
        <img src={steps} alt="o" />
        <span className={weightCounts(res.stepCounts)}>{res.stepCounts}</span>
        steps done
      </div>
      <div className="me-popup__line">
        <img
          src={
            mood.status === "happy"
              ? happy
              : mood.status === "sad"
              ? sad
              : neutral
          }
          alt="o"
          style={styleEmoji}
        />
        <span className={`${mood.status === "choose" ? "" : "active"}`}>
          {mood.status}
        </span>
        mood
      </div>
    </div>
  );
};
