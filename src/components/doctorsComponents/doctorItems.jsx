import React from "react";
import style from "../../pages/Doctors/doctors.module.css";
import {Base64Prefix} from '../../_utils/consts'
const DoctorItem = (props) => {
  return (
    <>
      <div className={`${style.item}`}>
        <div className={`${style.image}`}>
          <img src={Base64Prefix +props.data?.imageUrl} alt="doc" />
        </div>
        <div className={`${style.desc}`}>
          <div className={`${style.icons}`}>
            <span>
              <i onClick={()=>{props.onEdit(props.data)}} className="pi pi-user-edit" style={{ fontSize: "1rem" }}></i>
            </span>
            <span>
              <i
                onClick={()=>{props.onDelete(props.data)}}
                className="pi pi-trash"
                style={{ fontSize: "1rem", color: "red" }}
              ></i>
            </span>
          </div>
          <h3>{props.data?.fullName}</h3>
          <span>{props.data?.specialization}</span>
          <p>
            {props.data?.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorItem;
