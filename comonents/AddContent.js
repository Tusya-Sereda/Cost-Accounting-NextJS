import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../query /user";
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
  const { setAllCost, loading } = useContext(CostContext);
  const [createUser] = useMutation(CREATE_USER);
  const [valuePlace, setPlace] = useState('');
  const [valueCost, setCost] = useState('');

  const onCLickButton = () => {
    createUser({
      variables: {
        input: {
          place: valuePlace,
          cost: +valueCost,
        },
      },
    }).then(({ data }) => {
      setAllCost((prev) => [...prev, data.createUser]); //спредим нового (одного пользователя) и добавляем (перезаписываем) в массив
    });
    setPlace('');
    setCost('');
  };

  if (loading) {
    return <span>Loading....</span>;
  }


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
