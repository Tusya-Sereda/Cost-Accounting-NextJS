import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { CostContext } from "../context/Context";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { TextField } from "@material-ui/core";

export default function TaskContent() {
  const { allCosts, setAllCost, sum, setSum } = useContext(CostContext);
  const [valueWhere, setValueWhere] = useState(allCosts.reason);
  const [valueHowMuch, setValueHowMuch] = useState(allCosts.cost);
  const [editIndex, setEditIndex] = useState(-1);

  const deleteHandler = (index) => {
    const array = [...allCosts];
    const resultSum = setSum(sum - array[index].cost);
    array.splice(index, 1);
    setAllCost(array);
    localStorage.setItem("costs", JSON.stringify(array));
  };

  const editHandler = (index) => {
    setEditIndex(index);
  };

  const checkHandler = (index) => {
    if (valueWhere && valueHowMuch) {
      const array = [...allCosts];
      array[index].reason = valueWhere;
      array[index].cost = valueHowMuch;
      setAllCost(array);
      localStorage.setItem("costs", JSON.stringify(array));
      setEditIndex(-1);
    } else {
      setEditIndex(-1);
    }
  };

  const backHandler = () => {
    setEditIndex(-1);
  };
  
  return (
    <div className="task_content">
      <div>
        <p>{`Итого: ${sum}`}</p>
      </div>
      {allCosts.map((value, index) => (
        <div key={`key-${index}`} id={`${index}-task`} className="cost">
          {editIndex !== index ? (
            <Link href={`/node/${value.id}`}>
              <div
                className="info_about_task"
              >
                <div className="cost_value">
                  <p>{value.reason}</p>
                </div>
                <div className="cost_value">
                  <p>{value.cost}</p>
                </div>
              </div>
            </Link>
          ) : (
            <div className="input_info_task">
              <TextField
                className="input_reason"
                variant="outlined"
                value={valueWhere}
                type="text"
                label="Куда было потрачено:"
                onChange={(event) => setValueWhere(event.target.value)}
              />
              <TextField
                className="input_how_much"
                variant="outlined"
                value={valueHowMuch}
                type="number"
                label="Сколько было потрачено:"
                onChange={(event) => setValueHowMuch(event.target.value)}
              />
            </div>
          )}
          {editIndex !== index ? (
            <div className="button">
              <IconButton
                aria-label="delete"
                className="button_delete"
                onClick={() => deleteHandler(index)}
              >
                <DeleteIcon fontSize="large" className="deleteButton" />
              </IconButton>
              <IconButton
                aria-label="edit"
                className="button_edit"
                onClick={() => editHandler(index)}
              >
                <EditIcon fontSize="large" className="editButton" />
              </IconButton>
            </div>
          ) : (
            <div className="button">
              <IconButton
                aria-label="delete"
                className="button_oncheck"
                onClick={() => checkHandler(index)}
              >
                <CheckCircleIcon fontSize="large" className="checkButton" />
              </IconButton>
              <IconButton
                aria-label="edit"
                className="button_back"
                onClick={() => backHandler()}
              >
                <ArrowBackIcon fontSize="large" className="backButton" />
              </IconButton>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
