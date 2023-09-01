import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import style from "./loader.module.css";

const Loader = () => {
  return (
    <div className={`${style["loader-container"]}`}>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};

export default Loader;
