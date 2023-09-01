import React from "react";
import style from "./formsStyle.module.css";

const InputField = (props) => {
  return (
    <>
      <div className={`${style.formGroup}`}>
        <label>{props.data.label}</label>
          {
            props.children
          }
      </div>
    </>
  );
};

export default InputField;
