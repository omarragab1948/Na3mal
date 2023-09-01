import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { get, post } from "../../_services/APiCaller.Service";
import { Toast } from "primereact/toast";

const MedicalAnalysis = (props) => {
  const { patientInfo } = props;
  const [showDetails, setShowDetails] = useState(false);
  const [patient, setPatient] = useState();
  const [formError, setFormError] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [imageToShow, setImageToShow] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Medical Analysis added",
      life: 3000,
    });
  };
  const handleGetData = () => {
    get(`Patient/GetPatientInfo?nid=${patientInfo.nid}`).then((response) => {
      if (response) {
        setPatient(response);
      } else {
      }
    });
  };
  useEffect(() => {
    handleGetData();
  }, []);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const MedicalAnalysis = new FormData();
    MedicalAnalysis.append("patientId", patientInfo.nid);
    MedicalAnalysis.append("notes", data.notes);
    MedicalAnalysis.append("imageFile", imageFile);
    const handlePutData = () => {
      post(`MedicalAnalysis/AddMedicalAnalysis`, MedicalAnalysis).then(
        (response) => {
          showSuccess();
          setShowDetails(false);
          // Update the patient state with the new data from the API response
          setPatient(response);
          // Reset the form after successful submission
          reset();
          // Clear form error
          setFormError("");
          // Reset image state
          setImageToShow("");
          setImageFile(null);
          handleGetData();
        }
      );
    };
    handlePutData();
  };

  const handleImageClick = (image) => {
    setShowImage(true);
    setImageToShow(image);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setImageToShow(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!patient) {
    return (
      <div className="flex justify-center text-3xl text-[#22abb0]">
        Loading...
      </div>
    );
  }
  const pathologicalTestsData = patient.medicalAnalysis || [];

  return (
    <div className="flex flex-col sm:w-4/5 md:w-3/5 lg:w-1/2 mx-auto p-4 bg-gray-200 rounded-md">
      <div className="flex justify-start w-full text-xl mb-4">
        <Button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center text-2xl bg-[#22abb0] border-none"
          label="Add Medical Test"
          icon="pi pi-plus"
        />
      </div>
      <Toast ref={toast} />
      <div>
        {showDetails && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 mt-6 bg-gray-100 rounded-md"
          >
            <div className="w-full flex justify-end">
              <Button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="p-button-danger mb-4"
                icon="pi pi-times"
                severity="danger"
                aria-label="Cancel"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="text-gray-700 font-bold mb-2 block"
              >
                Test Image:
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: "Image is required" })}
                onChange={handleImageChange}
                className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {imageToShow && (
                <div className="mt-2">
                  <img
                    src={imageToShow}
                    alt="Test"
                    className="w-20 h-20 rounded-md"
                  />
                </div>
              )}
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="notes"
                className="text-gray-700 font-bold mb-2 block"
              >
                Notes:
              </label>
              <textarea
                {...register("notes", { required: "Notes are required" })}
                placeholder="Notes"
                rows={5}
                className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.notes && (
                <p className="text-red-500 text-sm">{errors.notes.message}</p>
              )}
            </div>

            <Button label="Submit" className="bg-[#22abb0] border-none" />
          </form>
        )}
        {!showDetails &&
          pathologicalTestsData
            .slice()
            .reverse()
            .map((data, index) => {
              const analysisDate = new Date(data.analysisDate);
              const formattedDate = `${analysisDate.getFullYear()}-${
                analysisDate.getMonth() + 1
              }-${analysisDate.getDate()}`;

              return (
                <div
                  key={index}
                  className="border rounded-md p-4 mt-4 bg-gray-100"
                >
                  <p className="text-[#22abb0] text-lg font-bold">
                    Patient ID:
                    <span className="text-black ms-2">{data.patientId}</span>
                  </p>
                  <p className="text-[#22abb0] text-lg font-bold">
                    Test Date:
                    <span className="text-black ms-2">{formattedDate}</span>
                  </p>
                  <p className="text-[#22abb0] text-lg font-bold">
                    Notes: <span className="text-black ms-2">{data.notes}</span>
                  </p>
                  <Button
                    label="View Image"
                    onClick={() => handleImageClick(data.analysisImage)}
                    className="mt-4 bg-[#22abb0] border-none"
                  />
                </div>
              );
            })}

        {formError && <p className="text-red-500 mt-4">{formError}</p>}
      </div>

      {showImage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-black">
          <div className="max-w-full max-h-full overflow-auto">
            <Button
              type="button"
              onClick={() => setShowImage(false)}
              className="p-button-danger   absolute top-24 md:top-5 right-4 text-red-500 cursor-pointer"
              icon="pi pi-times"
              severity="danger"
              aria-label="Cancel"
            />
            <img
              src={`data:image/png;base64,${imageToShow}`}
              alt="Test Image"
              className="rounded-lg w-4/5 h-4/5 mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalAnalysis;
