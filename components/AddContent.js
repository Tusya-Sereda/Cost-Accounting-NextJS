import React from "react";
import TaskContent from "./TaskContent";
import FormContent from "./FormContent";
import style from '../styles/AddContent.module.scss';

export default function AddContent() {

  return (
    <div className={style.add_input_content}>
      <FormContent />
      <TaskContent />
    </div>
  );
}
