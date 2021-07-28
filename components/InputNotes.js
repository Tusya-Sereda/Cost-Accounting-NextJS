import React, {useState, useContext} from "react";
import { CostContext } from "../context/Context";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../query/user";
import { IconButton } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import style from '../styles/InputNotes.module.scss';

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
    <div className={style.input_note}>
      <div className={style.input_info_task}>
        <TextField
          className={style.input_reason}
          variant="outlined"
          value={valueWhere}
          type="text"
          label="Куда было потрачено:"
          onChange={(event) => setValueWhere(event.target.value)}
          data-testid='changeWhere'
        />
        <TextField
          className={style.input_how_much}
          variant="outlined"
          value={valueHowMuch}
          type="number"
          label="Сколько было потрачено:"
          onChange={(event) => setValueHowMuch(event.target.value)}
          data-testid='changeHowMuch'
        />
      </div>
      <div className={style.button}>
        <IconButton
          aria-label="check"
          className={style.button_oncheck}
          onClick={() => checkHandler(oneCost.id)}
          data-testid='checkButton'
        >
          <CheckCircleIcon fontSize="large" className={style.checkButton} />
        </IconButton>
        <IconButton
          aria-label="back"
          className={style.button_back}
          onClick={() => backHandler()}
          data-testid='backButton'
        >
          <ArrowBackIcon fontSize="large" className={style.backButton} />
        </IconButton>
      </div>
    </div>
  );
};

export default InputNotes;
