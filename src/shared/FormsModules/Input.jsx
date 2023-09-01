import React from "react";
import style from "./formsStyle.module.css";

const Input = (props) => {
  return (
    
    <>
      <input
        className={`${style.input}`}
        placeholder={props.data.placeholder}
        name={props.data.name}
        type={props.data.type}
      />
    </>
  );
};

export default Input;
