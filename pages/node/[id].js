import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IconButton, TextField, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useKeyPress from "../../hooks/UseKeyPress";

export default function NodeId() {
  const [array, setArray] = useState(JSON.parse(localStorage.getItem("costs") || []));
  const [onePurchase, setOnePurchase] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [editIndex, setEditIndex] = useState(-1);
  const [changeWhere, setChangeWhere] = useState(array.reason);
  const [changeHowMany, setChangeHowMany] = useState(array.cost);
  const [valueKey, setValueKey] = useState(false);
  const someText = useKeyPress('s', 'a');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // setArray(JSON.parse(localStorage.getItem("costs") || []));
    if (array.length && id) {
      array.forEach((element, index) => {
        if (element.id === Number(router.query.id)) {
          setDeleteIndex(index);
          setOnePurchase(element);
          localStorage.setItem("onePurchase", JSON.stringify(element));
        }
      });
    }
  }, []);
  
  useEffect(()=>{
    if (someText) {
      console.log ('good');
      setEditIndex(deleteIndex);
    }
  },[someText])

  const deleteOnePurchase = (index) => {
    array.splice(index, 1);
    localStorage.setItem("costs", JSON.stringify(array));
    setDeleteIndex(-1);
    localStorage.clear();
  };

  const editOnePurchase = (index) => {
    setEditIndex(deleteIndex);
  };

  const backHandler = () => {
    setEditIndex(-1);
  };

  const checkHandler = (index) => {
    array[index].reason = changeWhere;
    array[index].cost = changeHowMany;
    localStorage.setItem("costs", JSON.stringify(array));
    setEditIndex(-1);
    localStorage.clear();
  };

  return (
    <div className="info_about_one_cost">
      <div className="content_purchase">
        {editIndex === -1 ? (
          <div className="text_purchase">
            <p> At ID number: {id} </p>
            <h1 className="title_where">{onePurchase.reason}</h1>
            <p className="title_how_many">{onePurchase.cost}</p>
          </div>
        ) : (
          <div className="add_new_content_on_one_purchase">
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
              value={changeHowMany}
              type="number"
              label="Сколько было потрачено:"
              onChange={(event) => setChangeHowMany(event.target.value)}
            />
          </div>
        )}
        <div className="button_one_purchase">
          {editIndex === -1 ? (
            <div>
              <Link href="/home">
                <IconButton
                  aria-label="delete"
                  className="button_delete_one"
                  onClick={() => deleteOnePurchase(deleteIndex)}
                >
                  <DeleteIcon fontSize="large" className="deleteOnePurchase" />
                </IconButton>
              </Link>
              <IconButton
                aria-label="edit"
                className="button_edit_one"
                onClick={() => editOnePurchase(editIndex)}
              >
                <EditIcon fontSize="large" className="editOnePurchase"/>
              </IconButton>
            </div>
          ) : (
            <div className="button_one_purchase">
              <Link href="/home">
                <IconButton
                  aria-label="delete"
                  className="button_oncheck"
                  onClick={() => checkHandler(editIndex)}
                >
                  <CheckCircleIcon fontSize="large" className="checkButton" />
                </IconButton>
              </Link>
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
      </div>
    </div>
  );
}
