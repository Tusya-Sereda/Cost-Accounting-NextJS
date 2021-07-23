import React, { useState, useEffect, useRef, useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../query /user";
import { useRouter } from "next/router";
import Link from "next/link";
import { CostContext } from "../../context/Context";
import useKeyPress from "../../hooks/UseKeyPress";
import useOutsideClick from "../../hooks/useOutsideClick";
import useWindowSize from "../../hooks/useWindowSize";
import { IconButton, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function NodeId() {
  const { allCosts, setAllCost } = useContext(CostContext);
  const router = useRouter();
  const { id } = router.query;
  // const location = window.location.href.split('/')[2];
  const [newData, setNewData] = useState();
  // const [onePurchase, setOnePurchase] = useState({});
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [editIndex, setEditIndex] = useState(-1);
  const [changeWhere, setChangeWhere] = useState("");
  const [changeHowMuch, setChangeHowMuch] = useState("");
  const someText = useKeyPress("s", "a");

  const ref = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  useOutsideClick(ref, () => setModalOpen(false));
  useOutsideClick(ref, () => setEditIndex(-1));
  const { loading, error, data, refetch } = useQuery(GET_USER, {
    variables: { id: +id },
  });

  const sizeWindow = useWindowSize();
  // console.log("width:", sizeWindow.width, "height:", sizeWindow.height);

  const getArray = () => {
    if (loading) console.log(loading);
    if (error) console.log(error.message);
    if (data) setNewData(data.getUser);
  };

  useEffect(() => {
    getArray();
  }, [id, data]);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  useEffect(() => {
    if (someText) {
      setEditIndex(id);
    }
  }, [someText]);

  const deleteOnePurchase = (index) => {
    const delArray = [...array];
    delArray.splice(index, 1);
    localStorage.setItem("costs", JSON.stringify(delArray));
    setDeleteIndex(-1);
  };

  const editOnePurchase = () => {
    setEditIndex(id);
  };

  const backHandler = () => {
    setEditIndex(-1);
  };

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
        {isModalOpen ? (
          <div ref={ref}>Hey, I'm a modal.</div>
        ) : (
          <button onClick={() => setModalOpen(true)}> Open Modal</button>
        )}
      </div>
      <div className="content_purchase">
        {editIndex === -1 ? (
          <div
            className="text_purchase"
            onClick={() => setEditIndex(deleteIndex)}
          >
            <p> At ID number: {id} </p>
            <h1 className="title_where">{newData?.place}</h1>
            <p className="title_how_many">{newData?.cost}</p>
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
                <EditIcon fontSize="large" className="editOnePurchase" />
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
