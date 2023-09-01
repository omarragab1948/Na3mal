import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import SignUp from "../src/pages/SignUp";
import Patients from "../src/pages/Patients";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose your desired theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Reservation from "./pages/Reservation";
import DoctorsPage from "../src/pages/Doctors/doctorsPage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import NewsContainer from "./pages/News/NewsContainer";
import About from "./pages/About/about";
import Contact from "./pages/Contact/contactUs";
import RoomsReservations from "./pages/RoomsReservations";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/reservations" element={<Reservation />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/news" element={<NewsContainer />} />
          <Route path="/roomsreservations" element={<RoomsReservations />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
