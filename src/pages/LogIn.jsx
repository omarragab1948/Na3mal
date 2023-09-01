import React, { useState } from "react";
import Navbar from "../components/homePageComponents/navbar/navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import AuthSlice, { clearSuccess, login } from "../redux/Slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";


export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const handleShowPass = function () {
    setShowPass((showPass) => !showPass);
  };
  const {loading} = useSelector(state => state.AuthSlice);
  const {success} = useSelector(state => state.AuthSlice)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Invalid email address"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "Password must contain at least one uppercase, lowercase, number and special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Schema,

    onSubmit: async (values) => {
      console.log(values);
      dispatch(login(values));
    if(success) {
      setTimeout(() => {
        navigate('/home')
      }, 3000);
      dispatch(clearSuccess())
    }
    },
  });

  return (
    <>
      <Navbar />
      <section>
        <div className="container py-20">
          <div className="login  shadow-xl py-20 flex justify-between px-6">
            <div className="signin__image hidden lg:flex gap-6 flex-auto flex-col justify-center items-center w-1/2">
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
            <div className="signin__form flex-auto gap-6 flex flex-col 	items-center xl:w-1/2">
              <h3 className="text-[#22ABB0] text-3xl text-center font-bold">
                Login
              </h3>
              <form
                onSubmit={formik.handleSubmit}
                className="mx-auto flex flex-col gap-6 justify-center md:w-2/5 w-4/5 lg:w-4/5 xl:w-2/5 "
              >
                <div>
                  <label className="block font-bold text-[#22ABB0]">
                    Email
                  </label>
                  <input
                    type="text"
                    className="w-full"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="text-red-600 font-normal	">
                      {formik.errors.email}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="relative">
                  <label className="block font-bold text-[#22ABB0]">
                    Password
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    className="w-full"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FontAwesomeIcon
                    icon={showPass ? faEye : faEyeSlash}
                    className="text-[#22ABB0] absolute top-10 right-2 cursor-pointer"
                    onClick={handleShowPass}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <p className="text-red-600 font-normal">
                      {formik.errors.password}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-[#22ABB0] text-white p-2 rounded-lg font-bold text-xl "
                  disabled = {loading}
                >
                  {loading? "loading...": "Sign in"}
                </button>
                <p>
                  Don't have account? &#160;
                  <Link to="/signup" className="text-[#22ABB0] font-bold">
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
