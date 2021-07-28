import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CostContext } from "../context/Context";
import { IconButton } from "@material-ui/core";
import ModalDelete from "./ModalDelete";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import style from "../styles/onePurchase.module.scss";

const InfoById = ({ setEditIndex, onePurchase }) => {
  const { setAllCost } = useContext(CostContext);
  const [stateModal, setStateModalDelete] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const openModalDelete = () => {
    setStateModalDelete(true);
  };

  const closeModalDelete = () => {
    setStateModalDelete(false);
  };

  const editOnePurchase = () => {
    setEditIndex(id);
  };

  const returnHome = () => {
    router.push("/home");
  };

  return (
    <>
      {stateModal && (
        <ModalDelete
          open={stateModal}
          handleClose={closeModalDelete}
          setAllCost={setAllCost}
          oneCostId={onePurchase.id}
        />
      )}
      <div
        className={style.text_purchase}
        onClick={() => setEditIndex(onePurchase?.id)}
      >
        <div className={style.link}>
          <span className={style.link_on_home} data-testid='linkOnHome' onClick={returnHome}>
            {" "}
            На главную{" "}
          </span>
        </div>
        <p> At ID number: {id} </p>
        <h1 className={style.title_where}>{onePurchase?.place}</h1>
        <p className={style.title_how_many}>{onePurchase?.cost}</p>
      </div>
      <div className={style.button_one_purchase}>
        <IconButton
          aria-label="delete"
          className={style.button_delete_one}
          onClick={() => openModalDelete()}
          data-testid='deleteById'
        >
          <DeleteIcon fontSize="large" className={style.deleteOnePurchase} />
        </IconButton>
        <IconButton
          aria-label="edit"
          className={style.button_edit_one}
          onClick={() => editOnePurchase()}
          data-testid='edit_button'
        >
          <EditIcon fontSize="large" className={style.editOnePurchase} />
        </IconButton>
      </div>
    </>
  );
};

export default InfoById;
