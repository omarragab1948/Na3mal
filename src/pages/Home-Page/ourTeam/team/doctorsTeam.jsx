import React, { useEffect, useRef, useState } from "react";
import Member from "../member/member";
import style from "./doctorsTeam.module.css";
import {get} from "../../../../_services/APiCaller.Service";
import { APIS } from "../../../../_utils/APIS";
import { Link } from "react-router-dom";


const DoctorsTeam = () => {
  const initTeam = [];
  const [team, setTeam] = useState(initTeam);
  let dataLoaded = useRef(false);

  useEffect(() => {
    if (!dataLoaded.current) {
      dataLoaded.current = true;
      get(APIS.HomePage.TeamList).then((res)=>{
        if (res.data.length > 9) {
          setTeam(res.data.slice(0, 9));
        } else {
          setTeam(res.data);
        }
      })
    }
  }, []);
  if (team.length) {
    return (
      <>
        <div className={`${style.container}`}>
          <h2>Meet Our Team Of Specialist</h2>
          <div className={`${style.doctorsList}`}>
            {team.map((member, i) => {
              return <Member data={member} key={member.doctorId} />;
            })}
          </div>
          <div className="see-more">
           <Link to="/doctors">
           <div className="content">
            <span>See More</span>
            <i className="pi pi-angle-right" style={{ fontSize: '1rem' }}></i>
            </div>
            </Link>
          
          </div>
          
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={`${style.container} `}>
          <h2>Meet Our Team Of Specialist</h2>
          <p className="no-data">There Is No Data In this Section </p>
        </div>
      </>
    );
  }
};

export default DoctorsTeam;
