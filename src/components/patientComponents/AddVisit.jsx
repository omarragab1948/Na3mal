import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";

const AddVisit = (props) => {
  const { patientInfo } = props;

  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Visit added",
      life: 3000,
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const [pharmaceuticals, setPharmaceuticals] = useState([
    {
      diagnosis: "",
      pharmaceutical: "",
    },
  ]);
  const onSubmit = (data) => {
    const newVisit = {
      visitId: 68,
      patientId: patientInfo.nid,
      visitDate: data.date,
      pharma: data.pharmaceutical.map((pharmaEntry) => ({
        id: 10,
        diagnosis: pharmaEntry.diagnosis,
        pharmaceutical: pharmaEntry.pharmaceutical,
        visitId: 68,
      })),
    };

    axios
      .post(
        `http://momahgoub172-001-site1.atempurl.com/api/PreviousVisits/AddVisit?PatientId=${patientInfo.nid}`,
        newVisit
      )
      .then((response) => {
        if (response.status === 200) {
          showSuccess();
          reset();
        }
      })
      .catch();
  };

  const removePharmaceutical = (index) => {
    const updatedPharmaceuticals = pharmaceuticals.filter(
      (_, i) => i !== index && pharmaceuticals.length !== 0
    );
    setPharmaceuticals(updatedPharmaceuticals);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sm:w-4/5 md:w-3/5 lg:w-1/2 mx-auto p-4 bg-gray-200 rounded-md flex flex-col"
    >
      <Toast ref={toast} />

      <div className="mb-4">
        <label htmlFor="date" className="text-2xl font-bold text-[#22abb0]">
          Visit Date:
        </label>
        <input
          type="date"
          {...register("date", { required: "Date is required." })}
          placeholder="Visit Date"
        />

        <div>
          <label
            htmlFor="pharmaceutical"
            className="text-2xl font-bold text-[#22abb0]"
          >
            Pharmaceutical:
          </label>

          {pharmaceuticals.map((pharma, index) => (
            <div key={index} className="mb-2 relative flex">
              <div className="flex flex-col w-[90%]">
                <textarea
                  {...register(`pharmaceutical[${index}].diagnosis`, {
                    required: true,
                  })}
                  defaultValue={pharma.diagnosis}
                  type="text"
                  placeholder={`Diagnosis ${index + 1}`}
                  rows={5}
                  className="mt-4 rounded-lg p-2"
                />
                <textarea
                  {...register(`pharmaceutical[${index}].pharmaceutical`, {
                    required: true,
                  })}
                  defaultValue={pharma.pharmaceutical}
                  type="text"
                  placeholder={`Pharmaceutical ${index + 1}`}
                  rows={5}
                  className="mt-4 rounded-lg p-2"
                />
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => removePharmaceutical(index)}
                  className="ml-2 bg-red-500 my-[50%] hover:bg-red-700 text-white absolute top-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={pharmaceuticals.length === 1} // Disable the button if only one pharmaceutical entry remains
                >
                  X
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setPharmaceuticals([
                ...pharmaceuticals,
                { diagnosis: "", pharmaceutical: "" },
              ])
            }
            className={`mb-2 bg-[#22abb0] hover:bg-blue-600 ${
              pharmaceuticals.length === 0 && "ms-20"
            } duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            Add
          </button>

          {errors.pharmaceutical && (
            <span className="text-red-500 text-sm">
              {errors.pharmaceutical.message}
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="bg-[#22abb0] hover:bg-blue-600 duration-300 text-white font-bold py-2 mx-auto w-1/2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export default AddVisit;
