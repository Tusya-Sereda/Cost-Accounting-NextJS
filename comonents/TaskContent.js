import React, { useState, useContext } from "react";
import { CostContext } from "../context/Context";
import TextNotes from "./TextNotes";
import InputNotes from "./InputNotes";

export default function TaskContent() {
  const { allCosts, sum } = useContext(CostContext);
  const [editIndex, setEditIndex] = useState(-1);

  return (
    <div className="task_content">
      <div>
        <span>{`Итого: ${sum}`}</span>
      </div>
      {allCosts.length > 0 &&
        allCosts.map((value, index) => (
          <div
            key={`${value.id}-cost`}
            id={`${value.id}-task`}
            className="cost"
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
  );
}
