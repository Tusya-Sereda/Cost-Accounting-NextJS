import React, { useState, useEffect, useContext } from "react";
import { CostContext } from "../context/Context";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TaskContent from "./TaskContent";
import useKeyPress from "../hooks/UseKeyPress";

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
  const [valuePlace, setPlace] = useState("");
  const [valueCost, setCost] = useState("");

  useEffect(() => {
    const array = JSON.parse(localStorage.getItem('costs')) || [];
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
      place: valuePlace,
      cost: +valueCost,
    });
    setAllCost(array);
    setSum( sum + +valueCost );
    setPlace("");
    setCost("");
    localStorage.setItem("costs", JSON.stringify(array));
  };

  return (
    <div className="add_input_content">
      <div className="add_content">
        <TextField
          className="inputWhere"
          variant="outlined"
          value={valuePlace}
          type="text"
          onChange={(event) => setPlace(event.target.value)}
          label="Куда было потрачено:"
        />
        <TextField
          className="inputHowMuch"
          variant="outlined"
          value={valueCost}
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