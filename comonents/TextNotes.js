import React, { useState, useContext } from "react";
import Link from "next/link";
import { CostContext } from "../context/Context";
import ModalDelete from "./ModalDelete";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

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
    <div className="text_note">
      {stateModal && (
        <ModalDelete
          open={stateModal}
          handleClose={closeModalDelete}
          setAllCost={setAllCost}
          oneCostId={oneCost.id}
        />
      )}
      <Link href={`/node/${oneCost.id}`}>
        <div className="info_about_task">
          <div className="cost_value">
            <span> {oneCost.place} </span>
          </div>
          <div className="cost_value">
            <span>{oneCost.cost}</span>
          </div>
        </div>
      </Link>
      <div className="button">
        <IconButton
          aria-label="delete"
          className="button_delete"
          onClick={openModalDelete}
        >
          <DeleteIcon fontSize="large" className="deleteButton" />
        </IconButton>
        <IconButton
          aria-label="edit"
          className="button_edit"
          onClick={() => editHandler(index)}
        >
          <EditIcon fontSize="large" className="editButton" />
        </IconButton>
      </div>
    </div>
  );
};

export default TextNotes;
