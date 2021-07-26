import React, { useState, useContext } from "react";
import { CostContext } from "../context/Context";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../query/user";
import { TextField, Button } from "@material-ui/core";

const FormContent = () => {
  const { setAllCost, loading } = useContext(CostContext);
  const [createUser] = useMutation(CREATE_USER);
  const [valuePlace, setPlace] = useState("");
  const [valueCost, setCost] = useState("");

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
    setPlace("");
    setCost("");
  };

  if (loading) {
    return <span>Loading....</span>;
  }

  return (
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
  );
};

export default FormContent;
