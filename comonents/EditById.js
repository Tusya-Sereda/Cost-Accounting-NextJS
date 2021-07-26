import React, { useState, useRef, useContext } from "react";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../query/user";
import { CostContext } from "../context/Context";
import useOutsideClick from "../hooks/useOutsideClick";
import { IconButton, TextField } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

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
    // e.preventDefault();
    // e.stopPropagation();
    console.log("---------edit");
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
    <div ref={ref}>
      <div className="add_new_content_on_one_purchase" >
        <TextField
          className="inputWhere"
          variant="outlined"
          value={changeWhere}
          type="text"
          onChange={(event) => setChangeWhere(event.target.value)}
          label="Куда было потрачено:"
        />
        <TextField
          className="inputHowMuch"
          variant="outlined"
          value={changeHowMuch}
          type="number"
          label="Сколько было потрачено:"
          onChange={(event) => setChangeHowMuch(event.target.value)}
        />
      </div>
      <div>
        <IconButton
          className="button_oncheck"
          onClick={checkHandler}
        >
          <CheckCircleIcon fontSize="large" className="checkButton"   />
        </IconButton>
        <IconButton
          aria-label="back"
          className="button_back"
          onClick={backHandler}
        >
          <ArrowBackIcon fontSize="large" className="backButton" />
        </IconButton>
      </div>
    </div>
  );
};

export default EditById;
