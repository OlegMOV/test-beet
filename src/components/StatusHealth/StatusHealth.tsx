import React from "react";
import "./statushealth.scss";
import { IHealth } from "@interfaces";
import happy from "@assets/image/me-emoji-happy.svg";
import neutral from "@assets/image/me-emoji-neutral.svg";
import sad from "@assets/image/me-emoji-sad.svg";

export const StatusHealth: React.FC<IHealth> = ({ status = "choose" }) => {
  return (
    <div className="m-status">
      {[
        [happy, "happy"],
        [neutral, "neutral"],
        [sad, "sad"],
      ].map((item) => (
        <div
          key={item[1]}
          className={`m-status__line${
            status === item[1] ? " active" : ""
          }`}
        >
          <img src={item[0]} alt="" />
        </div>
      ))}
      {/* <div className={`m-status__line${status === "happy" ? " active" : ""}`}>
        <img src={happy} alt="" />
      </div>
      <div className={`m-status__line${status === "neutral" ? " active" : ""}`}>
        <img src={neutral} alt="" />
      </div>
      <div className={`m-status__line${status === "sad" ? " active" : ""}`}>
        <img src={sad} alt="" />
      </div> */}
    </div>
  );
};
