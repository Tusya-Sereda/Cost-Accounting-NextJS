import React, { useState, useEffect, useContext } from "react";
import { CostContext } from "../context/Context";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TaskContent from "./TaskContent";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function AddContent() {
  const classes = useStyles();
  const { allCosts, setAllCost, sum, setSum} = useContext(CostContext);
  const [inputReason, setReason] = useState("");
  const [inputCost, setCost] = useState("");

  useEffect(() => {
    const array = JSON.parse(localStorage.getItem('costs', allCosts) || []);
    if (array) {
      setAllCost(array);
      let resultSum = 0;
      array.map( value => {
        resultSum += + value.cost;
      })
      setSum(resultSum);
    }
    // async function load() {
    //   const response = await fetch("http://localhost:4200/costs");
    //   const json = await response.json();
    //   setAllCost(json);
    // }
    // load();
  }, []);

  const onCLickButton = () => {
    const array = [...allCosts];
    const arrLength = array.length;
    array.push({
      id: arrLength,
      reason: inputReason,
      cost: +inputCost,
    });
    setAllCost(array);
    setSum( sum + +inputCost );
    setReason("");
    setCost("");
    localStorage.setItem("costs", JSON.stringify(array));
  };

  return (
    <div className="add_input_content">
      <div className="add_content">
        <TextField
          className="inputWhere"
          variant="outlined"
          value={inputReason}
          type="text"
          onChange={(event) => setReason(event.target.value)}
          label="Куда было потрачено:"
        />
        <TextField
          className="inputHowMuch"
          variant="outlined"
          value={inputCost}
          type="number"
          label="Сколько было потрачено:"
          onChange={(event) => setCost(event.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onCLickButton()}
        >
          Add
        </Button>
      </div>
      <TaskContent />
    </div>
  );
}