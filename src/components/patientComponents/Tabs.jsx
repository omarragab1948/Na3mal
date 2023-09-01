/* eslint-disable react/prop-types */

import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import PatientDetails from "./PatientDetails";
import MedicalAnalysis from "./MedicalAnalysis";
import XRays from "./XRays";
import ChronicDiseases from "./ChronicDiseases";
import PreviousVisits from "./PreviousVisits";
import AddVisit from "./AddVisit";

const Tabs = (props) => {
  const { patientInfo } = props;
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event) => {
    setActiveTab(event.index);
  };

  return (
    <TabView
      activeIndex={activeTab}
      onTabChange={handleTabChange}
      className="mt-[64px] md:mt-0"
    >
      <TabPanel header="Add visit" headerClassName="cursor-pointer text-xl">
        <AddVisit patientInfo={patientInfo} />
      </TabPanel>
      <TabPanel
        header="Previous visits"
        headerClassName="cursor-pointer text-xl"
      >
        <PreviousVisits patientInfo={patientInfo} />
      </TabPanel>
      <TabPanel
        header="Patient Details"
        headerClassName="cursor-pointer text-xl"
      >
        <PatientDetails patientInfo={patientInfo} />
      </TabPanel>
      <TabPanel
        header="Medical Analysis"
        headerClassName="cursor-pointer text-xl"
      >
        <MedicalAnalysis patientInfo={patientInfo} />
      </TabPanel>
      <TabPanel header="XRays" headerClassName="cursor-pointer text-xl">
        <XRays patientInfo={patientInfo} />
      </TabPanel>
      <TabPanel
        header="Chronic Diseases"
        headerClassName="cursor-pointer text-xl"
      >
        <ChronicDiseases patientInfo={patientInfo} />
      </TabPanel>
    </TabView>
  );
};

export default Tabs;
