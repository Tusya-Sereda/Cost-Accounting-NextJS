import React, { useState, useContext } from "react";
import { CostContext } from "../context/Context";
import TextNotes from "./TextNotes";
import InputNotes from "./InputNotes";
import style from "../styles/TaskContent.module.scss";

const TaskContent = () => {
  const { allCosts, sum, loading } = useContext(CostContext);
  const [editIndex, setEditIndex] = useState(-1);

  if (loading) {
    return <span>Loading....</span>;
  }

  return (
    <div className={style.task_content} data-testid="task_content">
      <div className={style.resultSum}>
        <span>{`Итого: ${sum}`}</span>
      </div>
      {!!allCosts.length &&
        allCosts.map((value, index) => (
          <div
            key={`${value.id}-cost`}
            id={`${value.id}-task`}
            data-testid={`${index}-task`}
            className={style.cost}
          >
            {editIndex !== index ? (
              <TextNotes
                oneCost={value}
                index={index}
                setEditIndex={setEditIndex}
                id="text_notes"
              />
            ) : (
              <InputNotes
                oneCost={value}
                setEditIndex={setEditIndex}
                id="input_notes"
              />
            )}
          </div>
        ))}
    </div>
  );
}

export default TaskContent;
