import React from "react";
import "./editor.scss";
import { howGood } from "@logic";

import { useCurrentMonthYear, IResault } from "@context/CalendarContext";
import { Counter } from "@components/Counter/Counter";
import { StatusHealth } from "@components/StatusHealth/StatusHealth";

export const Editor: React.FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  const {
    selectedDate,
    getResaultOnDate,
    changeGlobalState,
  } = useCurrentMonthYear();

  const res: IResault = getResaultOnDate(selectedDate);
  const [editResault, setEditResault] = React.useState<IResault>(res);

  React.useEffect(() => {
    setEditResault((prev) => ({ ...prev, ...res }));
  }, [selectedDate]);

  const setPartState = (partialData: {
    [propName: string]: string | number;
  }): void => setEditResault((prev) => ({ ...prev, ...partialData }));

  const isActiveButClear: boolean =
    res.greenCounts !== editResault.greenCounts ||
    res.redCounts !== editResault.redCounts ||
    res.stepCounts !== editResault.stepCounts
      ? true
      : false;
  // ? Clear data in input
  const handlerClear = (): void =>
    setEditResault((prev: IResault) => ({
      ...prev,
      ...res,
    }));

  const handleEditData = (): void => {
    changeGlobalState({ [selectedDate]: editResault });
    handleClose();
  };
  return (
    <div className="m-editor">
      <button
        onClick={handlerClear}
        className="m-editor__clear-button"
        disabled={!isActiveButClear}
      >
        Clear all
      </button>
      <span></span>
      <label>Date</label>
      <div className="m-editor__date">
        <div className="m-editor__date-text">
          {`${selectedDate.slice(8, 10)}.${selectedDate.slice(
            5,
            7
          )}.${selectedDate.slice(0, 4)}`}
        </div>
      </div>
      <label>Green counts</label>
      <Counter
        value={editResault.greenCounts}
        changeValue={(n: number) => setPartState({ greenCounts: n })}
      />
      <label>Red counts</label>
      <Counter
        value={editResault.redCounts}
        changeValue={(n: number) => setPartState({ redCounts: n })}
      />
      <label>Steps counts</label>
      <Counter
        value={editResault.stepCounts}
        changeValue={(n: number) => setPartState({ stepCounts: n })}
        increment={10}
        showIncrementIcon={false}
        maxValue={30000}
      />
      <label>Your feelings</label>
      <StatusHealth
        status={
          howGood(
            editResault.greenCounts,
            editResault.redCounts,
            editResault.stepCounts
          ).status
        }
      />
      <div className="m-editor__control">
        <button className="m-cancel _icon-close-small" onClick={handleClose}>
          Cancel
        </button>
        <button
          className="m-save _icon-ok-small"
          disabled={!isActiveButClear}
          onClick={handleEditData}
        >
          Save
        </button>
      </div>
    </div>
  );
};
