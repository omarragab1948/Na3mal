import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { put } from "../../_services/APiCaller.Service";

const PatientDetails = (props) => {
  const { patientInfo } = props;
  const [patient, setPatient] = useState(patientInfo);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const patientData = Object.entries(patient);

  return (
    <div className="flex flex-col sm:w-4/5 md:w-3/5 lg:w-1/2 mx-auto bg-gray-200 p-3 rounded-md">
      <div>
        {patientData.map(
          ([key, value], index) =>
            // Check if value is not null and key is not "userId" before rendering the list item
            value !== null &&
            key !== "userId" && (
              <li key={index}>
                <span className="text-[#22abb0] text-xl font-bold">
                  {key[0].toUpperCase() + key.slice(1)}:
                </span>
                <span className="text-black text-lg font-bold ms-3">
                  {value}
                </span>
              </li>
            )
        )}
      </div>
    </div>
  );
};

export default PatientDetails;
