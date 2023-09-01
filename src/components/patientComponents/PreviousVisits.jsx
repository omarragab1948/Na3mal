import React, { useEffect, useState } from "react";
import { get } from "../../_services/APiCaller.Service";
import { Button } from "primereact/button";

const PreviousVisits = (props) => {
  const { patientInfo } = props;
  const [patient, setPatient] = useState([]);
  const [idShow, setIdShow] = useState(null);
  useEffect(() => {
    const handleGetData = async () => {
      try {
        const response = await get(
          `PreviousVisits/GetAllVisitsByPatientId?id=${patientInfo.nid}`
        );
        setPatient(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    handleGetData();
  }, [patientInfo.nid]);

  const handleShow = (id) => {
    setIdShow(idShow === id ? null : id);
  };

  return (
    <div className="flex flex-col sm:w-4/5 md:w-3/5 lg:w-1/2 mx-auto bg-gray-200 p-3 rounded-md">
      <div>
        {patient.length === 0 && (
          <h2 className="text-2xl text-[#22abb0]">No Previous Visits</h2>
        )}
        <ul>
          {patient
            .slice()
            .reverse()
            .map((value, index) => {
              const diagnosisDate = new Date(value.visitDate);
              const formattedDate = `${diagnosisDate.getFullYear()}-${
                diagnosisDate.getMonth() + 1
              }-${diagnosisDate.getDate()}`;

              return (
                <div key={index} className="mb-8 bg-white p-4 rounded-md">
                  <p className="text-[#22abb0] text-xl font-bold">
                    Patient Id :
                    <span className="text-black ms-2">{value.patientId}</span>
                  </p>
                  <p className="text-[#22abb0] text-xl font-bold">
                    Visit Date:
                    <span className="text-black ms-2">{formattedDate}</span>
                  </p>

                  {value.pharma.length > 0 && (
                    <div>
                      <p className="text-[#22abb0] text-xl font-bold">
                        Pharma:
                      </p>
                      <ul>
                        {value.pharma.map((pha, phaIndex) => (
                          <div key={phaIndex}>
                            <button onClick={() => handleShow(pha.id)}>
                              <span className="text-[#22abb0] text-lg">
                                Pharma {phaIndex + 1}
                              </span>
                            </button>
                            <li
                              className={`text-[#22abb0] text-xl font-bold relative ${
                                idShow === pha.id ? "" : "hidden"
                              }`}
                            >
                              <Button
                                onClick={() => handleShow("")}
                                className="p-button-danger  w-5 h-7 absolute top-4 right-4 bg-red-500 cursor-pointer"
                                icon="pi pi-times"
                                severity="danger"
                                aria-label="Cancel"
                              />
                              Diagnosis:
                              <span className="text-black ms-2">
                                {pha.diagnosis}
                              </span>
                              <br />
                              Pharmaceutical:
                              <span className="text-black ms-2">
                                {pha.pharmaceutical}
                              </span>
                            </li>
                          </div>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default PreviousVisits;
