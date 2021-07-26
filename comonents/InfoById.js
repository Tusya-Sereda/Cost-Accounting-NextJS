import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { CostContext } from "../context/Context";
import { DELETE_USER } from "../query/user";
import { IconButton } from "@material-ui/core";
import ModalDelete from "./ModalDelete";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const InfoById = ({ setEditIndex, onePurchase }) => {
  const { setAllCost } = useContext(CostContext);
  // const [deleteUser] = useMutation(DELETE_USER);
  const [stateModal, setStateModalDelete] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  // const deleteHandler = (currentId) => {
  //   try {
  //     deleteUser({
  //       variables: {
  //         id: currentId,
  //       },
  //     }).then(() => {
  //       setAllCost((prev) => prev.filter(({ id }) => id !== currentId));
  //     });
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  const openModalDelete = () => {
    setStateModalDelete(true);
  };

  const closeModalDelete = () => {
    setStateModalDelete(false);
  };

  const editOnePurchase = () => {
    setEditIndex(id);
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
        className="text_purchase"
        onClick={() => setEditIndex(onePurchase?.id)}
      >
        <p> At ID number: {id} </p>
        <h1 className="title_where">{onePurchase?.place}</h1>
        <p className="title_how_many">{onePurchase?.cost}</p>
      </div>
      <div className="button_one_purchase">
        <IconButton
          aria-label="delete"
          className="button_delete_one"
          onClick={() => openModalDelete()}
        >
          <DeleteIcon fontSize="large" className="deleteOnePurchase" />
        </IconButton>
        <IconButton
          aria-label="edit"
          className="button_edit_one"
          onClick={() => editOnePurchase()}
        >
          <EditIcon fontSize="large" className="editOnePurchase" />
        </IconButton>
      </div>
    </>
  );
};

export default InfoById;
