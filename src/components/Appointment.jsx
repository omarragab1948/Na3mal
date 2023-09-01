import { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import {
  toastSucessMessage,
  toastErrorMessage,
  toastWaringMessage,
} from "../_services/Toaster.service";

const BASE_URL = "http://momahgoub172-001-site1.atempurl.com/api";

const Appointment = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [date, setDate] = useState(null);
  const [date2, setDate2] = useState(null);
  const [rowClick, setRowClick] = useState(true);
  const [types, setTypes] = useState([]);
  const [selectedTableType, setSelectedTableType] = useState(null);

  const getRoomTypes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/RoomInfo/GetAllRoomInfo`);

      setTypes(response.data);
    } catch (error) {
      toastErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getRoomTypes();
  }, []);

  const getDateOfTheMonth = (date) => {
    const dt = new Date(date);

    return dt.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };

  const convertDateToISOString = (date) => {
    if (date) {
      return new Date(
        new Date(date).getTime() + 3 * 60 * 60 * 1000
      ).toISOString();
    }
  };

  const compareDates = (d1, d2) => {
    let today = new Date().setHours(0, 0, 0, 0);
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();

    // if (date1 >= today && date2 > today && date1 < date2 && d1 && d2) {}

    // if (date1 < date2) {
    //   console.log(`${d1} is less than ${d2}`);
    // }

    if (!d1 && d2) {
      toastWaringMessage("The start date is empty");
    }

    if (!d2 && d1) {
      toastWaringMessage("The end date is empty");
    }

    if (date1 < today && d1 && d2) {
      toastWaringMessage("The start date is less than today");
    }

    if (!d1 && !d2) {
      toastWaringMessage("Both dates are empty");
    }

    if (date1 > date2 && d1 && d2) {
      toastWaringMessage("The start date should be less than the end date");
      // console.log(`${d1} is greater than ${d2}`);
    }

    if (date1 === date2 && d1 && d2) {
      toastWaringMessage("Both dates are equal");
      // console.log(`Both dates are equal`);
    }
  };

  const bookAppointment = async () => {
    let today = new Date().setHours(0, 0, 0, 0);
    let startDate = new Date(date).getTime();
    let endDate = new Date(date2).getTime();

    try {
      if (
        startDate >= today &&
        endDate > today &&
        startDate < endDate &&
        date &&
        date2 &&
        selectedTableType
      ) {
        const { id } = selectedTableType;

        const response = await axios.post(`${BASE_URL}/RoomAppiontment`, {
          startdate: convertDateToISOString(date),
          enddate: convertDateToISOString(date2),
          roomInfoId: id,
          patientId: "1234567891234567",
        });

        if (response.data === "Appiontment Added") {
          toastSucessMessage("Your Room has been reserved Successfully");
        } else {
          toastErrorMessage();
        }

        setDate(null);
        setDate2(null);
        setSelectedTableType(null);
      }
    } catch (error) {
      console.log(error);
      toastErrorMessage(error.message);
    }

    compareDates(date, date2);

    if (date && date2 && !selectedTableType) {
      toastWaringMessage("You haven't selected any Room Type from the table!");
    }
  };

  return (
    <div className="mt-20">
      <h3 className="pl-3 mb-3">I-Care</h3>
      <div className="flex flex-col md:flex-row">
        <div className="pl-3">
          <div className="flex items-center">
            <div className="w-1 h-7 bg-[#4069E5] absolute left-0"></div>
            <div onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <i className="pi pi-caret-down text-[#4069E5] mr-3 cursor-pointer"></i>
              ) : (
                <i className="pi pi-caret-right text-[#4069E5] mr-3 cursor-pointer"></i>
              )}
            </div>
            <h3 className="text-[#4069E5] font-bold">Appointment</h3>
          </div>
          {isOpen && (
            <div className="flex flex-col items-start mt-3">
              <button className="bg-[#4069E5] text-white rounded px-3 py-2 mb-3">
                Patient Room Reservations
              </button>
            </div>
          )}
        </div>
        <div className="mx-auto relative mt-32 md:mt-0">
          <button className="absolute w-fit left-[205px] md:right-0 md:left-auto bg-[#4069E5] text-gray-200 py-2 pr-1 pl-5 hover:text-white flex items-center lg:translate-x-full">
            <span className="mr-3">
              {" "}
              <i className="pi pi-plus"></i>
            </span>
            <span>Appointment</span>
          </button>
          <h1 className="font-bold text-lg">New Appointment</h1>
          <div className="flex items-center mt-10">
            <button className="py-1 px-10 border rounded text-gray-400">
              Existing
            </button>
            <button className="py-1 px-10 border rounded bg-gray-400">
              New
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-center text-gray-400 my-10">
            <button className="py-1 px-10 whitespace-nowrap hover:bg-[#4069E5] hover:text-white transition-all rounded">
              Doctor Details
            </button>
            <button className="py-1 px-10 whitespace-nowrap hover:bg-[#4069E5] hover:text-white transition-all rounded">
              Patient Details
            </button>
            <button className="py-1 px-10 whitespace-nowrap bg-[#4069E5] text-white transition-all rounded">
              Availability
            </button>
          </div>

          <div>
            <div className="flex justify-center items-center text-lg font-bold">
              <span className="mr-5 text-[#4069E5]">
                <i className="pi pi-calendar"></i>
              </span>
              <span>Availability</span>
            </div>
            <div className="flex items-center justify-center mt-5">
              <div>
                <span className="p-float-label">
                  <Calendar
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    dateFormat="dd/mm/yy"
                    className="mr-5"
                    inputId="start-date"
                    showButtonBar
                  />
                  <label htmlFor="start-date">Start Date</label>
                </span>
                <div className="mt-5 h-[24px]">
                  {date && (
                    <span className="block text-center text-gray-400">
                      {getDateOfTheMonth(date)}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <span className="p-float-label">
                  <Calendar
                    value={date2}
                    onChange={(e) => setDate2(e.target.value)}
                    dateFormat="dd/mm/yy"
                    className="mr-5"
                    inputId="end-date"
                  />
                  <label htmlFor="end-date">End Date</label>
                </span>
                <div className="mt-5 h-[24px]">
                  {date2 && (
                    <span className="block text-center text-gray-400">
                      {getDateOfTheMonth(date2)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-5 flex-wrap">
              <DataTable
                value={types}
                selectionMode={rowClick ? null : "radiobutton"}
                selection={selectedTableType}
                onSelectionChange={(e) => setSelectedTableType(e.value)}
                dataKey="id"
                tableStyle={{ minWidth: "50%" }}
                className="w-3/4 lg:w-full"
                scrollable
                removableSort
              >
                <Column
                  selectionMode="single"
                  headerStyle={{ width: "3rem" }}
                ></Column>
                <Column field="type" header="Type" sortable></Column>
                <Column field="cost" header="Cost" sortable></Column>
                <Column
                  field="description"
                  header="Description"
                  sortable
                ></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center my-10">
        <button
          className="mr-10 py-2 px-3 bg-[#4069E5] text-white rounded"
          onClick={bookAppointment}
        >
          Book Appointment
        </button>
        <button className="py-2 px-3 text-gray-400 rounded hover:bg-red-700 hover:text-white transition-all">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Appointment;
