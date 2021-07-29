import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CostContext } from "../context/Context";
import ModalDelete from "./ModalDelete";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import styles from "../styles/TextNotes.module.scss";

const TextNotes = ({ oneCost, index, setEditIndex }) => {
  const router = useRouter();
  const { setAllCost } = useContext(CostContext);
  const [stateModal, setStateModalDelete] = useState(false);

  const editHandler = (index) => {
    setEditIndex(index);
  };

  const openModalDelete = () => {
    setStateModalDelete(true);
  };

  const closeModalDelete = () => {
    setStateModalDelete(false);
  };

  const goToCostById = () => {
    router.push(`/node/${oneCost.id}`);
  };

  return (
    <div className={styles.text_note} data-testid="text_note">
      {stateModal && (
        <ModalDelete
          open={stateModal}
          handleClose={closeModalDelete}
          setAllCost={setAllCost}
          oneCostId={oneCost.id}
        />
      )}
      <div
        className={styles.info_about_task}
        data-testid="info_about_task"
        onClick={goToCostById}
      >
        <div className={styles.cost_value}>
          <span data-testid="valueCostPlace"> {oneCost.place} </span>
        </div>
        <div className={styles.cost_value}>
          <span>{oneCost.cost}</span>
        </div>
      </div>
      <div className={styles.buttons} data-testid="buttons">
        <IconButton
          aria-label="delete"
          id={styles.button_delete}
          onClick={openModalDelete}
          data-testid="removeButton"
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="edit"
          id={styles.button_edit}
          onClick={() => editHandler(index)}
          data-testid="updateButton"
        >
          <EditIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};

export default TextNotes;
