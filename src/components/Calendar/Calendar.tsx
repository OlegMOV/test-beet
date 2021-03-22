import React from "react";
import { CalendarContextProvider } from "../../ContextCalendar/CalendarContext";
import { Board } from "../Board/Board";
import { Editor } from "../Editor/Editor";
import { Header } from "../Header/Header";
import { Help } from "../Help/Help";
import { Modal } from "../Modal/Modal";
import "./calendar.scss";

export const Calendar: React.FC = () => {
  const [showModal, setShowModal] = React.useState<number>(0);
  const hideModal = () => {
    setShowModal(0);
  };

  return (
    <div className="m-calendar">
      <div className="main-wrapper">
        <CalendarContextProvider>
          <Header toogleModal={setShowModal} />
          <Board toogleModal={setShowModal} />
          <Modal
            isShow={!!showModal}
            handleClose={hideModal}
            children={
              showModal === 1 ? <Editor handleClose={hideModal} /> : <Help />
            }
          />
        </CalendarContextProvider>
      </div>
    </div>
  );
};
