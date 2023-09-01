import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import Navbar from "../components/homePageComponents/navbar/navbar";
import { Toast } from "primereact/toast";

function RoomsReservations() {
  const [reservations, setReservations] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("operation");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [updateRoomNumber, setUpdateRoomNumber] = useState("");
  const [updateRoomType, setUpdateRoomType] = useState("operation"); // Add this line
  const [updateStartDate, setUpdateStartDate] = useState("");
  const [updateEndDate, setUpdateEndDate] = useState("");
  const [updateStart, setUpdateStart] = useState("");
  const [updateEnd, setUpdateEnd] = useState("");
  const [updatePatientId, setUpdatePatientId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [filterRoomNumber, setFilterRoomNumber] = useState("");
  const [filterRoomType, setFilterRoomType] = useState("");
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [reservationId, setReservationId] = useState();
  const toast = useRef(null);
  const showSuccessUpdate = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Reservation Updated",
      life: 3000,
    });
  };
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Reservation Added",
      life: 3000,
    });
  };
  const showErrorOverlap = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "This room is already reserved at the selected date and time.",
      life: 5000,
    });
  };
  const showErrorDateBefore = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Can't Choose End time before start time",
      life: 5000,
    });
  };
  const openPopup = (id) => {
    setPopupOpen(true);
    setReservationId(id);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  const applyFilter = () => {
    let filtered = reservations;
    if (filterRoomNumber !== "") {
      filtered = filtered.filter(
        (reservation) => reservation.roomNumber.toString() === filterRoomNumber
      );
    }

    if (filterRoomType !== "") {
      filtered = filtered.filter(
        (reservation) => reservation.roomType === filterRoomType
      );
    }

    setFilteredReservations(filtered);
  };

  const clearFilter = () => {
    setFilterRoomType("");
    setFilterRoomNumber("");
    setFilteredReservations(reservations);
  };
  useEffect(() => {
    fetchReservations();
  }, []);
  function formatDate(date) {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const fetchReservations = () => {
    axios
      .get(
        "http://momahgoub172-001-site1.atempurl.com/api/Reservation/GetAllReservations"
      )
      .then((response) => {
        setReservations(response.data);
        // Apply initial filter if filterDate is set
        if (filterRoomNumber) {
          const filtered = response.data.filter(
            (reservation) => reservation.roomNumber === filterRoomNumber
          );
          setFilteredReservations(filtered);
        } else {
          setFilteredReservations(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const reservationData = {
      patientId,
      roomNumber,
      roomType,
      startDate: `${startDate}T${start}Z`,
      endDate: `${endDate}T${end}Z`,
      start,
      end,
      createdAt: new Date().toISOString(),
      doctorId: 3,
    };
    const startDateTime = new Date(reservationData.startDate);
    const endDateTime = new Date(reservationData.endDate);
    if (startDateTime >= endDateTime) {
      showErrorDateBefore();
      return;
    }
    const isOverlapping = reservations.some((reservation) => {
      const isSameRoom = reservation.roomNumber.toString() === roomNumber;
      const isSameType = reservation.roomType === roomType;
      const reservationStart = new Date(reservation.startDate);
      const reservationEnd = new Date(reservation.endDate);
      const newReservationStart = new Date(
        new Date(new Date(`${startDate}T${start}Z`).toISOString()).getTime() -
          3 * 60 * 60 * 1000
      );
      const newReservationEnd = new Date(
        new Date(new Date(`${endDate}T${end}Z`).toISOString()).getTime() -
          3 * 60 * 60 * 1000
      );

      const reservationStartHour = reservationStart.getHours();
      const reservationEndHour = reservationEnd.getHours();
      const newReservationStartHour = newReservationStart.getHours();
      const newReservationEndHour = newReservationEnd.getHours();

      const isDateOverlap =
        (newReservationStart >= reservationStart &&
          newReservationStart < reservationEnd) ||
        (newReservationEnd > reservationStart &&
          newReservationEnd <= reservationEnd) ||
        (newReservationStart <= reservationStart &&
          newReservationEnd >= reservationEnd);

      const isHourOverlap =
        (newReservationStartHour >= reservationStartHour &&
          newReservationStartHour < reservationEndHour) ||
        (newReservationEndHour > reservationStartHour &&
          newReservationEndHour <= reservationEndHour) ||
        (newReservationStartHour <= reservationStartHour &&
          newReservationEndHour >= reservationEndHour);

      return isSameRoom && isSameType && isDateOverlap && isHourOverlap;
    });

    if (isOverlapping) {
      showErrorOverlap();
    } else {
      try {
        const response = await axios.post(
          "http://momahgoub172-001-site1.atempurl.com/api/Reservation",
          reservationData
        );
        fetchReservations();
        showSuccess();
        setIsRoomReserved(false);
        setStartError(""); // Clear the error if there was one
      } catch (error) {
        console.error("Error adding reservation:", error);
      }
    }
  };
  const updateHandleSubmit = async (e) => {
    e.preventDefault();

    const updateReservationData = {
      patientId: updatePatientId,
      roomNumber: updateRoomNumber,
      roomType: updateRoomType,
      startDate: `${updateStartDate}T${updateStart}Z`,
      endDate: `${updateEndDate}T${updateEnd}Z`,
      start: updateStart,
      end: updateEnd,
      createdAt: new Date().toISOString(),
      doctorId: 3,
    };
    const startDateTime = new Date(updateReservationData.startDate);
    const endDateTime = new Date(updateReservationData.endDate);

    if (startDateTime >= endDateTime) {
      showErrorDateBefore();
      return;
    }
    const isOverlapping = reservations.some((reservation) => {
      const isSameRoom = reservation.roomNumber.toString() === updateRoomNumber;
      const isSameType = reservation.roomType === updateRoomType;
      const reservationStart = new Date(reservation.startDate);
      const reservationEnd = new Date(reservation.endDate);
      const newReservationStart = new Date(
        new Date(
          new Date(`${updateStartDate}T${updateStart}Z`).toISOString()
        ).getTime() -
          3 * 60 * 60 * 1000
      );
      const newReservationEnd = new Date(
        new Date(
          new Date(`${updateEndDate}T${updateEnd}Z`).toISOString()
        ).getTime() -
          3 * 60 * 60 * 1000
      );
      const reservationStartHour = reservationStart.getHours();
      const reservationEndHour = reservationEnd.getHours();
      const newReservationStartHour = newReservationStart.getHours();
      const newReservationEndHour = newReservationEnd.getHours();

      const isDateOverlap =
        (newReservationStart >= reservationStart &&
          newReservationStart < reservationEnd) ||
        (newReservationEnd > reservationStart &&
          newReservationEnd <= reservationEnd) ||
        (newReservationStart <= reservationStart &&
          newReservationEnd >= reservationEnd);

      const isHourOverlap =
        (newReservationStartHour >= reservationStartHour &&
          newReservationStartHour < reservationEndHour) ||
        (newReservationEndHour > reservationStartHour &&
          newReservationEndHour <= reservationEndHour) ||
        (newReservationStartHour <= reservationStartHour &&
          newReservationEndHour >= reservationEndHour);

      return isSameRoom && isSameType && isDateOverlap && isHourOverlap;
    });

    if (isOverlapping) {
      showErrorOverlap();
    } else {
      try {
        const response = await axios.put(
          `http://momahgoub172-001-site1.atempurl.com/api/Reservation?id=${reservationId}`,
          updateReservationData
        );
        fetchReservations();
        closePopup();
        showSuccessUpdate();
        setStartError(""); // Clear the error if there was one
      } catch (error) {
        console.error("Error adding reservation:", error);
      }
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://momahgoub172-001-site1.atempurl.com/api/Reservation?id=${id}`
      );
      fetchReservations();
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const events = reservations.map((reservation) => ({
    title: ` ${reservation.roomNumber}  ${reservation.roomType}`,
    start: reservation.startDate,
  }));

  return (
    <>
      <Navbar />
      <div className="roomsreservations mt-[70px] md:mt-0 flex flex-col p-4 ">
        <header className="text-2xl font-bold mb-4">
          <h1>Room Reservation </h1>
          <Toast ref={toast} />
        </header>
        <main className="w-full flex flex-col">
          <div className="flex w-full flex-col lg:flex-row">
            <div className="bg-gray-200 p-4 rounded shadow h-fit mb-4 w-full md:w-3/5 lg:w-2/5 mx-auto">
              <h2 className="text-lg font-semibold mb-2 ">Room Reservation</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="roomNumber">Room Number:</label>
                  <input
                    type="text"
                    id="roomNumber"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    required
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                  />
                </div>
                <div className="mb-2">
                  <label>Room Type:</label>
                  <div className="flex items-center mt-1">
                    <input
                      type="radio"
                      id="operationRoom"
                      name="roomType"
                      value="operation"
                      checked={roomType === "operation"}
                      onChange={() => setRoomType("operation")}
                      className="mr-2"
                    />
                    <label htmlFor="operationRoom">Operation Room</label>
                  </div>
                  <div className="flex items-center mt-1">
                    <input
                      type="radio"
                      id="xRayRoom"
                      name="roomType"
                      value="xray"
                      checked={roomType === "xray"}
                      onChange={() => setRoomType("xray")}
                      className="mr-2"
                    />
                    <label htmlFor="xRayRoom">X-ray Room</label>
                  </div>
                  <div className="flex items-center mt-1">
                    <input
                      type="radio"
                      id="nurseryRoom"
                      name="roomType"
                      value="nursery"
                      checked={roomType === "nursery"}
                      onChange={() => setRoomType("nursery")}
                      className="mr-2"
                    />
                    <label htmlFor="nurseryRoom">Nursery Room</label>
                  </div>
                </div>

                <div className="mb-2">
                  <label htmlFor="startDate">Start Date:</label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="endDate">End Date:</label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="time">Start Time:</label>
                  <input
                    type="time"
                    id="time"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    required
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="time">End Time:</label>
                  <input
                    type="time"
                    id="time"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    required
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="patientId">Patient ID:</label>
                  <input
                    type="text"
                    id="patientId"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    required
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#22abb0] text-white rounded "
                >
                  Reserve
                </button>
              </form>
            </div>
            <div className="flex flex-col w-full ms-3">
              <h2 className="text-lg font-bold mb-2">Filter Reservations</h2>
              <div className="mb-4 flex flex-col md:flex-row items-center">
                <div className="flex flex-col md:flex-row space-x-4">
                  <label htmlFor="filterRoomNumber" className="font-bold my-1">
                    Filter by Room Number:
                  </label>
                  <input
                    type="number"
                    id="filterRoomNumber"
                    value={filterRoomNumber}
                    onChange={(e) => setFilterRoomNumber(e.target.value)}
                    className="border-[#22abb0] border border-solid my-1 h-10 rounded-md shadow-sm focus:ring focus:ring-[#22abb0] focus:border-[#22abb0]"
                  />

                  <label htmlFor="filterRoomType" className="font-bold my-1">
                    Filter by Room Type:
                  </label>
                  <select
                    id="filterRoomType"
                    value={filterRoomType}
                    onChange={(e) => setFilterRoomType(e.target.value)}
                    className="border-gray-300 rounded-md shadow-sm my-1 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                  >
                    <option value="">All</option>
                    <option value="operation">Operation Room</option>
                    <option value="xray">X-ray Room</option>
                    <option value="nursery">Nursery Room</option>
                  </select>

                  <button
                    onClick={applyFilter}
                    className="px-2 py-1 bg-[#22abb0] font-bold my-1 text-white rounded "
                  >
                    Apply Filter
                  </button>
                  <button
                    onClick={clearFilter}
                    className="px-2 py-1 bg-gray-300 text-gray-700 my-1 rounded font-bold hover:bg-gray-400"
                  >
                    Clear Filter
                  </button>
                </div>
              </div>
              <div className="bg-white p-4 rounded shadow mb-4">
                <h2 className="text-lg font-semibold mb-2">Reservations</h2>
                <ul className="flex justify-start flex-wrap  p-2">
                  {filteredReservations.map((reservation) => (
                    <li
                      key={reservation.id}
                      className="mb-2 flex flex-col justify-between shadow bg-gray-200 p-3 w-full sm:w-[45%] lg:w-[47%] sm:mx-2"
                    >
                      <div className="flex flex-col">
                        <strong>Room Type: {reservation.roomType}</strong>
                        <strong>Room Number: {reservation.roomNumber}</strong>
                        <strong>
                          Start Date: {formatDate(reservation.startDate)}
                        </strong>
                        <strong>
                          End Date: {formatDate(reservation.endDate)}
                        </strong>
                        <strong>
                          Start Time: {reservation.start.slice(0, 5)}
                        </strong>
                        <strong>End Time: {reservation.end.slice(0, 5)}</strong>
                        <strong>Patient ID: {reservation.patientId}</strong>
                      </div>
                      <div className="mt-2 ms-2 flex  items-center justify-around">
                        <button
                          onClick={() => handleDelete(reservation.id)}
                          className="px-2 py-1 bg-red-500 text-white rounded w-28  font-bold hover:bg-red-600"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => openPopup(reservation.id)}
                          className="px-4 py-1 bg-[#22abb0] w-28 text-white rounded"
                        >
                          Update
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {isPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-gray-200 p-4 rounded shadow w-full md:w-3/5 lg:w-2/5">
                <form onSubmit={updateHandleSubmit}>
                  <div className="mb-2">
                    <label htmlFor="updateRoomNumber">Room Number:</label>
                    <input
                      type="text"
                      id="updateRoomNumber"
                      value={updateRoomNumber}
                      onChange={(e) => setUpdateRoomNumber(e.target.value)}
                      required
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    />
                  </div>
                  <div className="mb-2">
                    <label>Room Type:</label>
                    <div className="flex items-center mt-1">
                      <input
                        type="radio"
                        id="updateOperationRoom"
                        name="updateRoomType"
                        value="operation"
                        checked={updateRoomType === "operation"}
                        onChange={() => setUpdateRoomType("operation")}
                        className="mr-2"
                      />
                      <label htmlFor="updateOperationRoom">
                        Operation Room
                      </label>
                    </div>
                    <div className="flex items-center mt-1">
                      <input
                        type="radio"
                        id="updateXRayRoom"
                        name="updateRoomType"
                        value="xray"
                        checked={updateRoomType === "xray"}
                        onChange={() => setUpdateRoomType("xray")}
                        className="mr-2"
                      />
                      <label htmlFor="updateXRayRoom">X-ray Room</label>
                    </div>
                    <div className="flex items-center mt-1">
                      <input
                        type="radio"
                        id="updateNurseryRoom"
                        name="updateRoomType"
                        value="nursery"
                        checked={updateRoomType === "nursery"}
                        onChange={() => setUpdateRoomType("nursery")}
                        className="mr-2"
                      />
                      <label htmlFor="updateNurseryRoom">Nursery Room</label>
                    </div>
                  </div>

                  <div className="mb-2">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                      type="date"
                      id="startDate"
                      value={updateStartDate}
                      onChange={(e) => setUpdateStartDate(e.target.value)}
                      required
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                      type="date"
                      id="endDate"
                      value={updateEndDate}
                      onChange={(e) => setUpdateEndDate(e.target.value)}
                      required
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="time">Start Time:</label>
                    <input
                      type="time"
                      id="time"
                      value={updateStart}
                      onChange={(e) => setUpdateStart(e.target.value)}
                      required
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="time">End Time:</label>
                    <input
                      type="time"
                      id="time"
                      value={updateEnd}
                      onChange={(e) => setUpdateEnd(e.target.value)}
                      required
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="patientId">Patient ID:</label>
                    <input
                      type="text"
                      id="patientId"
                      value={updatePatientId}
                      onChange={(e) => setUpdatePatientId(e.target.value)}
                      required
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#22abb0] text-white rounded "
                  >
                    Update
                  </button>
                  <button
                    onClick={closePopup}
                    className="px-4 py-2 ms-3 bg-red-500 text-white rounded w-28  font-bold hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Reservation Calendar</h2>
            <div className="calendar">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                events={events}
                headerToolbar={{
                  left: "today prev,next",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
export default RoomsReservations;
