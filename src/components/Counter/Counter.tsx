import React from "react";
import "./counter.scss";
import plus_ico from "../../assets/image/me-plus.svg";
import minus_ico from "../../assets/image/me-minus.svg";

interface ICounter {
  value: number;
  changeValue: (n: number) => void;
  minValue?: number;
  maxValue?: number;
  increment?: number;
  showIncrementIcon?: boolean;
}

const setRightValue = (n: number, minV: number, maxV: number): number => {
  if (Number.isNaN(Number(n))) return 0;
  if (n >= minV && n <= maxV) return n;
  else if (n < minV) return minV;
  else return maxV;
};

export const Counter: React.FC<ICounter> = ({
  value = 0,
  changeValue,
  minValue = 0,
  maxValue = 100,
  increment = 1,
  showIncrementIcon = true,
}) => {
  // ? Set value used keyboard
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    changeValue(setRightValue(Number(event.target.value), minValue, maxValue));
  };
  // ? Set value used button plus/minus
  const changeCounter = (event: React.MouseEvent<HTMLImageElement>): void => {
    changeValue(
      setRightValue(
        event.currentTarget.getAttribute("alt") === "-"
          ? value - increment
          : value + increment,
        minValue,
        maxValue
      )
    );
    event.preventDefault();
  };

  return (
    <div className="m-counter">
      <div className="m-counter__wrapper">
        {showIncrementIcon && (
          <img
            src={minus_ico}
            alt="-"
            onClick={(event) => changeCounter(event)}
          />
        )}
        <input
          className="m-counter__input"
          type="number"
          step={increment}
          value={value}
          onChange={(event) => handleInput(event)}
        />
        {showIncrementIcon && (
          <img
            src={plus_ico}
            alt="+"
            onClick={(event) => changeCounter(event)}
          />
        )}
      </div>
    </div>
  );
};
