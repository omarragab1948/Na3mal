import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { get, post } from "../../_services/APiCaller.Service";

const PatientId = (props) => {
  const [data, setData] = useState("");
  const { handleShow } = props;
  const [show, setShow] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nid: "",
    fullName: "",
    phoneNumber: "",
    gender: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    // Sending data using axios

    post("/Doctors/AddPatient", formData)
      .then((response) => {
        // Reset the form
        setFormData({
          nid: "",
          fullName: "",
          phoneNumber: "",
          gender: "",
          age: "",
        });
        setShowForm(false);
        setShow(false);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  useEffect(() => {
    const getPatientId = () => {
      axios
        .get(
          `http://momahgoub172-001-site1.atempurl.com/api/Patient/GetPatientByNID?nid=${data}`
        )
        .then((response) => {
          if (response.data !== "") {
            setShow(null);
            handleShow(true, response.data);
          } else {
            setShow("Patient Doesn't Exist");
            handleShow(false);
            setShowForm(true);
          }
        });
    };

    if (formSubmitted) {
      getPatientId();
    }
  }, [formSubmitted, data, handleShow]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setData(data.nid);
    setFormSubmitted(true);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto w-[95%] bg-gray-200 p-4 rounded-lg mt-24 md:mt-8"
      >
        <div className="mb-4 relative">
          <label
            htmlFor="idNumber"
            className="block mb-2 text-lg font-medium text-gray-700"
          >
            Patient ID Number
          </label>
          <InputText
            type="text"
            name="nid"
            id="nid"
            {...register("nid", {
              required: "ID number is required",
              minLength: {
                value: 14,
                message: "ID number must be 14 digits",
              },
            })}
            inputMode="numeric"
            className={`w-full  px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.nid ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.nid && (
            <p className="text-red-500 text-sm mt-1">{errors.nid.message}</p>
          )}
        </div>

        <div className="flex">
          <Button
            type="submit"
            label="Submit"
            className="bg-[#22abb0] text-white px-4 py-2 rounded-md hover:bg-[#22abb0] focus:outline-none focus:ring-2 focus:ring-[#22abb0]"
          />
          {show && (
            <div className="font-bold w-fit py-3 px-2">
              <span>{show}</span>
            </div>
          )}
        </div>
      </form>
      {showForm && (
        <form
          onSubmit={handleSubmitAdd}
          className="max-w-md mx-auto p-6 border rounded-lg shadow-md mt-6"
        >
          <h2 className="text-xl text-[#22abb0] font-bold mb-3">Add Patient</h2>
          <div className="mb-4">
            <label htmlFor="nid" className="block mb-1 font-semibold">
              National ID
            </label>
            <input
              type="number"
              id="nid"
              name="nid"
              value={formData.nid}
              onChange={handleChange}
              required
              min="10000000000000"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fullName" className="block mb-1 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-[#22abb0]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-1 font-semibold">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-[#22abb0]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block mb-1 font-semibold">
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-[#22abb0]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block mb-1 font-semibold">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-[#22abb0]"
            />
          </div>
          <button
            type="submit"
            className="bg-[#22abb0] text-white py-2 px-4 rounded hover:bg-[#22abb0] focus:outline-none focus:ring-2 focus:ring-[#22abb0] focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default PatientId;
