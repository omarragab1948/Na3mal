import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { post, get } from "../../_services/APiCaller.Service";
import { Toast } from "primereact/toast";

const ChronicDiseases = (props) => {
  const { patientInfo } = props;
  const [showDetails, setShowDetails] = useState(false);
  const [patient, setPatient] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [diseaseName, setDiseaseName] = useState("");
  const [treatingMedicines, setTreatingMedicines] = useState("");
  useEffect(() => {
    handleGetData();
  }, []);
  const handleGetData = () => {
    get(
      `ChronicDisease/GetChronicDiseasesByPatientNID?nid=${patientInfo.nid}`
    ).then((response) => {
      setShowDetails(false);
      if (response) {
        setPatient(response);
      } else {
      }
    });
  };
  const handleCloseForm = () => {
    setShowDetails(false);
    setPatientId("");
    setDiseaseName("");
    setTreatingMedicines("");
  };
  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Chronic Disease added",
      life: 3000,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newDisease = {
      patientId: patientInfo.nid,
      diseaseName,
      treatingMedicines,
    };

    post("ChronicDisease/AddChronicDisease", newDisease).then((response) => {
      setPatient([...patient, response]);
      handleGetData();
      setPatientId("");
      setDiseaseName("");
      setTreatingMedicines("");
      showSuccess();
    });
  };

  return (
    <div className="flex flex-col sm:w-4/5 md:w-3/5 lg:w-1/2 mx-auto p-4 bg-gray-200 rounded-md">
      <div className="flex justify-start w-full text-xl mb-4">
        <Button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center text-2xl bg-[#22abb0] border-none"
          label="Add Chronic Diseases"
        />
      </div>
      <Toast ref={toast} />
      {showDetails ? (
        <form
          onSubmit={handleSubmit}
          className="p-4 mt-6 bg-gray-100 rounded-md"
        >
          <div className="flex justify-end">
            <button
              onClick={handleCloseForm} // Close the form
              className="bg-red-600 text-white px-4 py-2 rounded my-4 hover:bg-red-700 focus:outline-none "
            >
              <span>X</span>
            </button>
          </div>
          <div className="mb-4">
            <InputText
              value={diseaseName}
              onChange={(e) => setDiseaseName(e.target.value)}
              placeholder="Disease Name"
              required
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#22abb0] "
            />
          </div>
          <div className="mb-4">
            <InputText
              value={treatingMedicines}
              onChange={(e) => setTreatingMedicines(e.target.value)}
              placeholder="Treating Medicines"
              required
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#22abb0] "
            />
          </div>

          <Button
            type="submit"
            className="bg-[#22abb0] border-none  text-white px-4 py-2 rounded-md mt-4  focus:outline-none focus:ring-2 focus:ring-[#22abb0] "
            label="Submit"
          />
        </form>
      ) : (
        <div>
          <ul className="flex flex-col">
            {patient
              .slice()
              .reverse()
              .map((chronicDisease, index) => {
                const diagnosisDate = new Date(chronicDisease.diagnosisDate);
                const formattedDate = `${diagnosisDate.getFullYear()}-${
                  diagnosisDate.getMonth() + 1
                }-${diagnosisDate.getDate()}`;

                return (
                  <li key={index} className="bg-white my-3 p-3">
                    <p className="text-[#22abb0]  text-xl font-bold me-4">
                      Patient Id :{" "}
                      <span className="text-black">
                        {" "}
                        {chronicDisease.patientId}
                      </span>
                    </p>
                    <p className="text-[#22abb0]  text-xl font-bold me-4">
                      DiseaseName :{" "}
                      <span className="text-black">
                        {chronicDisease.diseaseName}
                      </span>
                    </p>
                    <p className="text-[#22abb0]  text-xl font-bold me-4">
                      Treating Medicines :{" "}
                      <span className="text-black">
                        {chronicDisease.treatingMedicines}
                      </span>
                    </p>
                    <p className="text-[#22abb0]  text-xl font-bold me-4">
                      Diagnosis Date :{" "}
                      <span className="text-black">{formattedDate}</span>
                    </p>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChronicDiseases;
