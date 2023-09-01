import React, { useState } from 'react';
import style from './btns.module.css';

const SystemBtns = (props) => {
   const [btnStyle,setBtnStyle]=useState('default');
   const [btnClicked,SetBtnClicked]=useState(false);

   if(props.data.type== 'submit'){
    // setBtnStyle('submit')
   }
   const handleClick=()=>{
    if(props.status =="Submitted"){
      SetBtnClicked(true);
    }else{
      SetBtnClicked(false);
      
    }
    props.btnClick

   }

  return (
    <>
    <button onClick={handleClick} className={`${style.btn} ${style[btnStyle]}`} type={props.data.type}>
      {
        btnClicked ? (<i className="pi pi-spin pi-spinner" style={{ fontSize: '1rem' }}></i>): (<span>{props.data.text}</span>)
        
      }

      
      </button>
    </>
  )
}

export default SystemBtns