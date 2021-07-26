import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TaskContent from "./TaskContent";
import FormContent from "./FormContent";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function AddContent() {
  const classes = useStyles();

  return (
    <div className="add_input_content">
      <FormContent/>
      <TaskContent/>
    </div>
  );
}
