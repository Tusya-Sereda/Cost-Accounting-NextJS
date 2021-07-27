import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../query/user";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useRouter } from "next/router";

export default function ModalDelete({
  open,
  handleClose,
  setAllCost,
  oneCostId,
}) {
  const [deleteUser] = useMutation(DELETE_USER);
  const router = useRouter();

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
    router.push('/home');
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete a store"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete a note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => deleteHandler(oneCostId)}
            color="primary"
            autoFocus
            data-testid='button_agree'
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
