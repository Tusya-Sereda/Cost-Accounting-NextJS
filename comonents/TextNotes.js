import React, {useContext} from "react";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../query /user";
import { CostContext } from "../context/Context";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const TextNotes = ({oneCost, index, setEditIndex}) => {
  const [deleteUser] = useMutation(DELETE_USER);
  const { setAllCost } = useContext(CostContext);

  const deleteHandler = (currentId) => {
    try {
      deleteUser({
        variables: {
          id: currentId,
        },
      }).then(() => {
        setAllCost((prev) => prev.filter(({ id }) => id !== currentId));
      });
    } catch (error) {
      alert(error);
    }
  };
  
  const editHandler = (index) => {
    setEditIndex(index);
  };

  return (
    <div className="text_note">
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
          onClick={() => deleteHandler(oneCost.id)}
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
