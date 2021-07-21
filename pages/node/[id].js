import React, { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { CostContext } from "../../context/Context";
import useKeyPress from "../../hooks/UseKeyPress";
import useOutsideClick from "../../hooks/useOutsideClick";
import useWindowSize from "../../hooks/useWindowSize";
import { IconButton, TextField, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function NodeId() {
  const { allCosts, setAllCost, sum, setSum } = useContext(CostContext);
  const router = useRouter();
  const { id } = router.query;
  const [array, setArray] = useState([]);
  const [onePurchase, setOnePurchase] = useState({});
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [editIndex, setEditIndex] = useState(-1);
  const [changeWhere, setChangeWhere] = useState(onePurchase?.place);
  const [changeHowMuch, setChangeHowMuch] = useState(onePurchase?.cost);
  const someText = useKeyPress('s', 'a');

  const ref = useRef();
  const [isModalOpen ,setModalOpen] = useState(false);
  useOutsideClick(ref, () => setModalOpen(false));
  useOutsideClick(ref, () => setEditIndex(-1));
  
  const sizeWindow = useWindowSize();

  console.log('width:', sizeWindow.width, 'height:', sizeWindow.height);

  const getArray = () => {
    const result  = JSON.parse(localStorage.getItem("costs")) || [];
    setArray(result);
  }

useEffect(() => {
  getArray()
}, []);

useEffect(() => {
  const purchase = [...array];
  // const oneNote = purchase.find( note => note.id == id);
  const oneNote = purchase.find( (note, index) => {
    if (note.id == id) {
      setDeleteIndex(index);
      return note;
    }
  })
  setOnePurchase(oneNote);
}, [id, array]);
  
  useEffect(() => {
    if (someText) {
      console.log ('good');
      setEditIndex(deleteIndex);
    }
  }, [someText])

  const deleteOnePurchase = (index) => {
    const delArray = [...array];
    delArray.splice(index, 1);
    localStorage.setItem("costs", JSON.stringify(delArray));
    setDeleteIndex(-1);
  };

  const editOnePurchase = (index) => {
    setEditIndex(index);
  };

  const backHandler = () => {
    setEditIndex(-1);
  };

  console.log('array', array);
  console.log('deleteIndex', deleteIndex);

  const checkHandler = (index) => {
    const checkArray = [...array];
    checkArray[index].place = changeWhere;
    checkArray[index].cost = changeHowMuch;
    localStorage.setItem("costs", JSON.stringify(checkArray));
    setAllCost(checkArray);
    setEditIndex(-1);
  };

  return (
    <div className="info_about_one_cost">
      {sizeWindow.width}px / {sizeWindow.height}px
      <div>
        { isModalOpen ? (
          <div ref={ref}>
            Hey, I'm a modal.
          </div>
        ): (
          <button onClick={ () => setModalOpen(true)}> Open Modal</button>
        )}
      </div>
      <div className="content_purchase">
        {editIndex === -1 ? (
          <div className="text_purchase" onClick={ () => setEditIndex(deleteIndex)}>
            <p> At ID number: {id} </p>
            <h1 className="title_where">{onePurchase?.place}</h1>
            <p className="title_how_many">{onePurchase?.cost}</p>
          </div>
        ) : (
          <div className="add_new_content_on_one_purchase" ref={ref}>
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
                onClick={() => editOnePurchase(deleteIndex)}
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
                  onClick={() => checkHandler(deleteIndex)}
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
