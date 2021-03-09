import React from "react";
import "./modal.scss";

interface IModal {
  handleClose: () => void;
  isShow: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<IModal> = ({ handleClose, isShow, children }) => {
  const toogleShow: string = isShow ? "m-modal show" : "m-modal hide";
  return (
    <div className={toogleShow}>
      <section className="m-modal__main">
        {children}
        <button onClick={handleClose}>&#10005;</button>
      </section>
    </div>
  );
};
