import React from "react";
import "./help.scss";
import greenBall from "@assets/image/me-green-ball.svg";
import redBall from "@assets/image/me-red-ball.svg";
import steps from "@assets/image/me-steps.svg";
import greenstar from "@assets/image/star-green.svg";
import goldstar from "@assets/image/star-gold.svg";
import me_ok from "@assets/image/me-ok.svg";
import ico_arrow from "@assets/image/arrow.svg";
import arrow_shot from "@assets/image/arrow_shot.svg";

export const Help: React.FC = () => {
  return (
    <div className="me-help">
      <div className="me-help__title">Explanation</div>
      <div className="me-help__section-title">
        How do I achieve a check mark?
      </div>
      <div className="me-help__section-images">
        <img src={greenBall} alt="" />
        <img src={arrow_shot} alt="" className="small" />
        <span>2</span>
        <img src={ico_arrow} alt="" className="small" />
        <img src={me_ok} alt="" />
      </div>

      <div className="me-help__section-text">
        Get 2 Green counts a day and earn green check mark
      </div>
      <div className="me-help__section-images">
        <img src={steps} alt="" />
        <img src={arrow_shot} alt="" className="small" />
        <span>1000</span>
        <img src={ico_arrow} alt="" className="small" />
        <img src={me_ok} alt="" />
      </div>

      <div className="me-help__section-text">
        Get 1000 steps and earn green check mark
      </div>
      <div className="me-help__section-images">
        <img src={redBall} alt="" />
        <img src={arrow_shot} alt="" className="small" />
        <span>1</span>
        <img src={ico_arrow} alt="" className="small" />
        (
        <img src={me_ok} alt="" />)
      </div>
      <div className="me-help__section-text">
        Get 1 Red counts a day and lost green check mark
      </div>

      <div className="me-help__section-title">How do I achive a star?</div>
      <div className="me-help__section-images">
        <img src={me_ok} alt="" />
        <img src={me_ok} alt="" />
        <img src={me_ok} alt="" />
        <img src={ico_arrow} alt="" className="small" />
        <img src={greenstar} alt="" className="greenstar" />
      </div>
      <div className="me-help__section-text">
        Get 3 green check marks a day - add a green star to your calendar
      </div>

      <div className="me-help__section-title">How do I achive a gold star?</div>
      <div className="me-help__section-images">
        <div>
          <img src={greenstar} alt="" className="greenstar" />
          <img src={greenstar} alt="" className="greenstar" />
          <img src={greenstar} alt="" className="greenstar" />
        </div>
        <img src={ico_arrow} alt="" className="small" />
        <img src={goldstar} alt="" className={Object.keys({ goldstar })[0]} />
      </div>
      <div className="me-help__section-text">
        Get 3 green stars - add a gold star to your calendar
      </div>
    </div>
  );
};
