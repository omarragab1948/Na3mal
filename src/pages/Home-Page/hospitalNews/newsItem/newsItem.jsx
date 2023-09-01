import React from 'react';
import style from './newsItem.module.css';
import {Base64Prefix} from '../../../../_utils/consts.js'

const NewsItem = (props) => {
    
  return (
    <>
    <div className={`${style.card}`}>
        <img src={Base64Prefix+props.data.imageUrl} alt="doctor" />
        {
          props.isFromNewsPage && (
            <>
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
            </>
          )
        }
        <div className={`${style['member-details']}`}>
          <h4>{props.data.title}</h4>
            <p>{props.data.description}</p>
        </div>
        

     </div>
    </>
  )
}

export default NewsItem