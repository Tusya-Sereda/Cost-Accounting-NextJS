import React, { useState, useContext } from "react";
import Link from "next/link";
import { CostContext } from "../context/Context";
import ModalDelete from "./ModalDelete";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import style from '../styles/ContentPart.module.scss';

const TextNotes = ({ oneCost, index, setEditIndex }) => {
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

  return (
    <div className={style.text_note}>
      {stateModal && (
        <ModalDelete
          open={stateModal}
          handleClose={closeModalDelete}
          setAllCost={setAllCost}
          oneCostId={oneCost.id}
        />
      )}
      <Link href={`/node/${oneCost.id}`}>
        <div className={style.info_about_task}>
          <div className={style.cost_value}>
            <span> {oneCost.place} </span>
          </div>
          <div className={style.cost_value}>
            <span>{oneCost.cost}</span>
          </div>
        </div>
      </Link>
      <div className={style.button}>
        <IconButton
          aria-label="delete"
          className={style.button_delete}
          onClick={openModalDelete}
          data-testid='removeButton'
        >
          <DeleteIcon fontSize="large" id={style.deleteButton}/>
        </IconButton>
        <IconButton
          aria-label="edit"
          className={style.button_edit}
          onClick={() => editHandler(index)}
          data-testid="updateButton"
        >
          <EditIcon fontSize="large" className={style.editButton} />
        </IconButton>
      </div>
    </div>
  );
};

export default TextNotes;
