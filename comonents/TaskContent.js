import React, { useState, useContext } from "react";
import { CostContext } from "../context/Context";
import TextNotes from "./TextNotes";
import InputNotes from "./InputNotes";
import style from "../styles/TaskContent.module.scss";

export default function TaskContent() {
  const { allCosts, sum } = useContext(CostContext);
  const [editIndex, setEditIndex] = useState(-1);

  return (
    <>
      <div className={style.task_content} data-testid="task_content" key="TaskContent">
        <div className={style.resultSum}>
          <span>{`Итого: ${sum}`}</span>
        </div>
        {allCosts.length > 0 &&
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
                />
              ) : (
                <InputNotes oneCost={value} setEditIndex={setEditIndex} />
              )}
            </div>
          ))}
      </div>
    </>
  );
}
