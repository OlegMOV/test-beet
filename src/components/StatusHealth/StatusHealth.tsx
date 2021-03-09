import React from "react";
import "./statushealth.scss";
import { IHealth } from "../../allInterfaces";
import happy from "../../assets/image/me-emoji-happy.svg";
import neutral from "../../assets/image/me-emoji-neutral.svg";
import sad from "../../assets/image/me-emoji-sad.svg";

export const StatusHealth: React.FC<IHealth> = ({ status = "choose" }) => {
  return (
    <div className="m-status">
      <div className={`m-status__line${status === "happy" ? " active" : ""}`}>
        <img src={happy} alt="" />
      </div>
      <div className={`m-status__line${status === "neutral" ? " active" : ""}`}>
        <img src={neutral} alt="" />
      </div>
      <div className={`m-status__line${status === "sad" ? " active" : ""}`}>
        <img src={sad} alt="" />
      </div>
    </div>
  );
};
