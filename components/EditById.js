import React, { useState, useRef, useContext } from "react";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../query/user";
import { CostContext } from "../context/Context";
import useOutsideClick from "../hooks/useOutsideClick";
import { IconButton, TextField } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import style from "../styles/onePurchase.module.scss";

const EditById = ({ setEditIndex, onePurchase }) => {
  const { setAllCost } = useContext(CostContext);
  const [changeWhere, setChangeWhere] = useState("");
  const [changeHowMuch, setChangeHowMuch] = useState("");
  const ref = useRef();
  const [updateUser] = useMutation(UPDATE_USER);

  useOutsideClick(ref, () => setEditIndex(-1));

  const backHandler = () => {
    setEditIndex(-1);
  };

  const checkHandler = () => {
    if (changeWhere && changeHowMuch) {
      try {
        updateUser({
          variables: {
            id: onePurchase?.id,
            place: changeWhere,
            cost: +changeHowMuch,
          },
        }).then(({ data }) => {
          setAllCost((current) =>
            current.map((value) => {
              if (value.id === data.updateUser.id) {
                return data.updateUser;
              }
              return value;
            })
          );
        });
      } catch (error) {
        alert(error);
      }
      setEditIndex(-1);
      setChangeWhere("");
      setChangeHowMuch("");
    } else {
      alert("Не заполнены все поля");
    }
  };

  return (
    <div className={style.edit_by_id} ref={ref}>
      <div className={style.add_new_content_on_one_purchase}>
        <TextField
          className={style.changeWhere}
          variant="outlined"
          value={changeWhere}
          type="text"
          onChange={(event) => setChangeWhere(event.target.value)}
          label="Куда было потрачено:"
          data-testid='changeInfoWhere'
        />
        <TextField
          className={style.changeHowMuch}
          variant="outlined"
          value={changeHowMuch}
          type="number"
          label="Сколько было потрачено:"
          onChange={(event) => setChangeHowMuch(event.target.value)}
          data-testid='changeInfoHowMuch'
        />
      </div>
      <div className={style.buttons}>
        <IconButton className={style.button_oncheck} onClick={checkHandler} data-testid='checkInfoButton'>
          <CheckCircleIcon fontSize="large" className={style.checkButton} />
        </IconButton>
        <IconButton
          aria-label="back"
          className={style.button_back}
          onClick={backHandler}
        >
          <ArrowBackIcon fontSize="large" className={style.backButton} />
        </IconButton>
      </div>
    </div>
  );
};

export default EditById;
