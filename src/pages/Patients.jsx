import Sidebar from "../components/patientComponents/Sidebar";
import Navbar from "../components/homePageComponents/navbar/navbar";
import PatientId from "../components/patientComponents/PatientId";
import Tabs from "../components/patientComponents/Tabs";
import { useState } from "react";

const Paitents = () => {
  const [showComponent, setShowComponent] = useState(false);
  const [patient, setPatient] = useState("");
  const handleShow = (show, nid) => {
    setShowComponent(show);
    setPatient(nid);
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      {showComponent ? (
        <Tabs patientInfo={patient} />
      ) : (
        <PatientId handleShow={handleShow} />
      )}
    </>
  );
};
export default Paitents;
