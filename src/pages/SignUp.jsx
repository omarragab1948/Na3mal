import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/homePageComponents/navbar/navbar";
import PatientRegister from "../components/patientComponents/PatientRegister";
import DoctorRegister from "../components/doctorsComponents/DoctorRegister";
import patientImg from "../assets/images/patient.png";
import doctorImg from "../assets/images/doctor.png";

export default function SignUp() {
  const [userType, setUserType] = useState("patient");

  return (
    <>
      <Navbar />
      <section>
        <div className="container py-20">
          <div className="register  shadow-xl py-20 flex justify-between items-start px-6 rounded-lg">
            <div className="hidden lg:flex gap-6 flex-auto flex-col justify-center items-center lg:w-3/5">
              <img
                src="../src/assets/images/stethoscope.png"
                alt=""
                className="w-[7rem]"
              />
              <div className="text-wrapper text-center gap-2 flex flex-col">
                <h3 className="text-3xl text-[#22ABB0] font-bold	">
                  WELCOME TO HOPITAL NAME
                </h3>
                <p className="text-sm text-[#22ABB0] font-semibold	">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Provident, numquam ex?
                </p>
              </div>
              <img src="../src/assets/images/signin-img.png" alt="" />
            </div>
            <div className=" gap-6 flex flex-col 	items-center xl:w-1/2 mx-auto">
              <div
                className="cursor-pointer text-[#22ABB0] text-xl py-5 px-6 shadow-xl rounded-lg flex gap-4 justify-center items-center "
                onClick={() => {
                  setUserType(userType === "patient" ? "doctor" : "patient");
                }}
              >
                <img
                  src={userType === "patient" ? doctorImg : patientImg}
                  alt=""
                  className="w-[3rem]"
                />
                <h4>
                  Sign up as a {userType === "patient" ? "Doctor" : "Patient"}
                </h4>
              </div>
              <h3 className="text-[#22ABB0] text-3xl text-center font-bold">
                Register
              </h3>
              {userType === "patient" ? (
                <PatientRegister />
              ) : (
                <DoctorRegister />
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
