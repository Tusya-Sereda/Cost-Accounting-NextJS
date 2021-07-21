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
  const router = useRouter();
  const { id } = router.query;
  const { allCosts, setAllCost } = useContext(CostContext);
  const [array, setArray] = useState([]);
  const [onePurchase, setOnePurchase] = useState({});
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [editIndex, setEditIndex] = useState(-1);
  const [changeWhere, setChangeWhere] = useState(onePurchase.reason);
  const [changeHowMany, setChangeHowMany] = useState(onePurchase.cost);
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
}, [])

useEffect(() => {
  console.log('allCosts', allCosts);
  const onePurchase = [...allCosts];
  onePurchase.find( (element, index) => {
    if (String(element.id) === id) {
      setDeleteIndex(index);
      setOnePurchase(onePurchase);
      localStorage.setItem("onePurchase", JSON.stringify(element));
    }
  })
  // if (array.length && id ) {
  //   array.find( (element, index) => {
  //     if (String(element.id) === id) {
  //       setDeleteIndex(index);
  //       setOnePurchase(element);
  //       localStorage.setItem("onePurchase", JSON.stringify(element));
  //     } 
  //   })
  // }
}, [id]);
  
  useEffect(() => {
    if (someText) {
      console.log ('good');
      setEditIndex(deleteIndex);
    }
  }, [someText])

  const deleteOnePurchase = (index) => {
    const array = [...allCosts];
    array.splice(index, 1);
    localStorage.setItem("costs", JSON.stringify(array));
    setDeleteIndex(-1);
    localStorage.removeItem("onePurchase");
  };

  const editOnePurchase = (index) => {
    setEditIndex(index);
  };

  const backHandler = () => {
    setEditIndex(-1);
  };

  const checkHandler = (index) => {
    const array = [...allCosts];
    array[index].place = changeWhere;
    array[index].cost = changeHowMany;
    localStorage.setItem("costs", JSON.stringify(array));
    setEditIndex(-1);
    localStorage.removeItem("onePurchase");
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
            <h1 className="title_where">{onePurchase.place}</h1>
            <p className="title_how_many">{onePurchase.cost}</p>
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
