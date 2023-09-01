import React from 'react';
import style from './member.module.css';
import {Base64Prefix} from '../../../../_utils/consts'


const Member = (props) => {
  return (
    <>
     <div className={`${style.card}`}>
        <img src={Base64Prefix +props.data.imageUrl} alt="doctor" />
        <div className={`${style['member-details']}`}>
            <h4>{props.data.fullName}</h4>
            <p>{props.data.specialization}</p>

        </div>

     </div>
    
    </>
  )
}

export default Member