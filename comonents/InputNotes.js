import React, {useState, useContext} from "react";
import { CostContext } from "../context/Context";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../query/user";
import { IconButton } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const InputNotes = ({oneCost, setEditIndex}) => {
  const { setAllCost, sum } = useContext(CostContext);
  const [valueWhere, setValueWhere] = useState('');
  const [valueHowMuch, setValueHowMuch] = useState('');
  const [updateUser] = useMutation(UPDATE_USER);

  const checkHandler = (currentId) => {
    if (valueWhere && valueHowMuch) {
      try {
        updateUser({
          variables: {
            id: currentId,
            place: valueWhere,
            cost: +valueHowMuch,
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
      setValueWhere('');
      setValueHowMuch('');
    } else {
      alert("Не заполнены все поля");
    }
  };

  const backHandler = () => {
    setEditIndex(-1);
    setValueWhere('');
    setValueHowMuch('');
  };

  return (
    <div className="input_note">
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
      <div className="button">
        <IconButton
          aria-label="delete"
          className="button_oncheck"
          onClick={() => checkHandler(oneCost.id)}
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
    </div>
  );
};

export default InputNotes;
