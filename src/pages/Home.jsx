import HomeSilder from "../components/homePageComponents/slider/homeSilder";
import DoctorsTeam from "./Home-Page/ourTeam/team/doctorsTeam";
import NewsList from "./Home-Page/hospitalNews/newsList/newsList";
import Sidebar from "../components/patientComponents/Sidebar";
import Navbar from "../components/homePageComponents/navbar/navbar";
import Footer from "../components/Footer";
import FooterLinks from "../components/homePageComponents/FooterDetails/FooterLinks";
import { NewsState } from "../context/newsContext";
import { useSelector } from "react-redux";
const Home = () => {
  const user = useSelector((state) => state.AuthSlice);
  return (
    <>
      <NewsState>
        <Navbar />
        {user.role && user.role[0] === "Doctor" && <Sidebar />}
        <HomeSilder />
        <DoctorsTeam />
        <NewsList />
        <FooterLinks />
        <Footer />
      </NewsState>
    </>
  );
};

export default Home;
