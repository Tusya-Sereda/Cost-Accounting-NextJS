import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useKeyPress from "../../hooks/UseKeyPress";
import useOutsideClick from "../../hooks/useOutsideClick";
import { IconButton, TextField, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function NodeId() {
  const router = useRouter();
  const { id } = router.query;
  const [array, setArray] = useState([]);
  const [onePurchase, setOnePurchase] = useState({});
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [editIndex, setEditIndex] = useState(-1);
  const [changeWhere, setChangeWhere] = useState(array.reason);
  const [changeHowMany, setChangeHowMany] = useState(array.cost);
  const someText = useKeyPress('s', 'a');

  const ref = useRef();
  const [isModalOpen ,setModalOpen] = useState(false);
  useOutsideClick(ref, () => setModalOpen(false));
  useOutsideClick(ref, () => setEditIndex(-1));
  
  const getArray = () => {
    const result  = JSON.parse(localStorage.getItem("costs")) || [];
    setArray(result);
}

useEffect(() => {
  if (array.length && id ) {
    array.find( (element) => {
      if (String(element.id) === id) {
      } 
    })
  }
    
      // array.forEach((element, index) => {
      //   if (element.id === Number(router.query.id)) {
      //     setDeleteIndex(index);
      //     console.log("element",element);
      //     setOnePurchase(element);
      //     // localStorage.setItem("onePurchase", JSON.stringify(element));
      //   }
      // }); 
      // console.log("id",router.query.id);
      // const res = array.find((el)=> {
      //   console.log("el.id",el.id);
      //   return`${el.id}` === `${id}`}) || {}
      
      // console.log(res);
      // setOnePurchase(res);
  }, [id]);

  useEffect(()=>{
    getArray()
  },[])
  
  useEffect(() => {
    if (someText) {
      console.log ('good');
      setEditIndex(deleteIndex);
    }
  }, [someText])

  const deleteOnePurchase = (index) => {
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
    array[index].reason = changeWhere;
    array[index].cost = changeHowMany;
    localStorage.setItem("costs", JSON.stringify(array));
    setEditIndex(-1);
    localStorage.removeItem("onePurchase");
  };


  console.log("onePurchase", onePurchase);

  return (
    <div className="info_about_one_cost">
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
            <h1 className="title_where">{onePurchase.reason}</h1>
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
