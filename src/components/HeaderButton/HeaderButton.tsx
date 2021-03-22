import React from "react";
import "./headerbutton.scss";
import greenstar from "@assets/image/star-green.svg";
import goldstar from "@assets/image/star-gold.svg";
import help from "@assets/image/help.svg";
import { useCurrentMonthYear } from "@context/CalendarContext";

export type TypeButton = "greenstar" | "goldstar" | "help" | "text" | "";
interface IButtonHeader {
  typeButton: TypeButton;
  text: string;
  isDragable?: boolean;
  onclick?: () => void;
}

export const HeaderButton: React.FC<IButtonHeader> = ({
  typeButton,
  text = "",
  isDragable = false,
  onclick,
}) => {
  const { setDraggedStar } = useCurrentMonthYear();
  const classes: string = `me-header-button ${typeButton}`;

  const dragStarHandler = (): void => {
    if (setDraggedStar) {
      setDraggedStar(typeButton);
    }
  };

  return (
    <div className={classes} onClick={onclick}>
      {typeButton !== "text" && (
        <img
          className={`${isDragable ? "grabbable" : ""}`}
          src={
            typeButton === "greenstar"
              ? greenstar
              : typeButton === "goldstar"
              ? goldstar
              : help
          }
          alt=""
          draggable={isDragable}
          onDragStart={dragStarHandler}
        />
      )}
      {text.length > 0 && <span>{text}</span>}
    </div>
  );
};
