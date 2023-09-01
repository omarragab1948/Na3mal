import { useState } from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        onClick={() => setShow(!show)}
        className={`${
          show ? "left-64" : "left-0"
        } duration-300 top-36 text-white z-50 bg-gray-800 w-9 h-9 text-3xl flex items-center justify-center fixed`}
      >
        <i className="pi pi-spin pi-cog" style={{ fontSize: "2rem" }}></i>
      </button>
      <div
        className={`bg-gray-800 h-screen ${
          show ? "w-64" : "w-0"
        } py-8  fixed top-0 text-white z-10 duration-300 overflow-hidden`}
      >
        <h2 className="text-2xl font-bold mb-6 ms-4 text-[#22abb0]">Sidebar</h2>
        <ul className="space-y-4 ms-4">
          <li>
            <Link
              to={"/patients"}
              className="block hover:text-[#22abb0] text-lg font-bold duration-300"
            >
              Patients
            </Link>
            <Link
              to={"/reservations"}
              className="block hover:text-[#22abb0] text-lg font-bold duration-300"
            >
              Reservations
            </Link>
            <Link
              to={"/roomsreservations"}
              className="block hover:text-[#22abb0] text-lg font-bold duration-300"
            >
              Rooms Reservations
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
