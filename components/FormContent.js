import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import { CostContext } from "../context/Context";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../query/user";
import { TextField, Button } from "@material-ui/core";
import style from "../styles/FormContent.module.scss";

const useStyles = makeStyles(() => ({
  noBorder: {
    border: "none",
  },
}));

const FormContent = () => {
  const classes = useStyles();
  const { setAllCost, loading } = useContext(CostContext);
  const [createUser] = useMutation(CREATE_USER);
  const [valuePlace, setPlace] = useState("");
  const [valueCost, setCost] = useState("");
console.log(valueCost);
  const onClickButton = () => {
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
    <div className={style.add_content} data-testid='add_content'>
      <TextField
        id={style.inputWhere}
        variant="outlined"
        value={valuePlace}
        type="text"
        onChange={(event) => setPlace(event.target.value)}
        label="Куда было потрачено:"
        required
        autoFocus
        data-testid="inputWhere"
        classes={{notchedOutline:classes.input}}
        InputProps={{
          classes:{notchedOutline:classes.noBorder}
        }}
      />
      <TextField
        id={style.inputHowMuch}
        variant="outlined"
        value={valueCost}
        type="number"
        label="Сколько было потрачено:"
        required
        onChange={(event) => setCost(event.target.value)}
        data-testid="inputHowMuch"
        classes={{notchedOutline:classes.input}}
        InputProps={{
          classes:{notchedOutline:classes.noBorder}
        }}
      />
      <Button
        id={style.buttonAdd}
        variant="contained"
        color="secondary"
        onClick={onClickButton}
        data-testid="buttonAdd"
      >
        Add
      </Button>
    </div>
  );
};

export default FormContent;
