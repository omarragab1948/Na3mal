import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  clearSuccess,
} from "../../redux/Slices/AuthSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";



export default function DoctorRegister() {
  const [showPass, setShowPass] = useState(false);
  const handleShowPass = function () {
    setShowPass((showPass) => !showPass);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
const {sucess} = useSelector(state => state.AuthSlice)
  const Schema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Invalid email address"
      ),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "Password must contain at least one uppercase, lowercase, number and special character"
      ),
    matchpass: Yup.string()
      .required("Confirm Password is required")
      .min(8, "Password must be at least 8 characters")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .min(11, "Phone number can not be less than 11 numbers")
      .max(11, "Phone number can not be more than 11 numbers"),
    specialization: Yup.string().required("Specialization is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      username: "",
      password: "",
      phoneNumber: "",
      specialization: "",
    },
    validationSchema: Schema,

    onSubmit: (values) => {
      try {
        dispatch(register({ endPoint: "DoctorRegister", values }));
        if (sucess) {
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
          dispatch(clearSuccess());
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="mx-auto flex flex-col gap-6 justify-center md:w-full w-4/5 lg:w-4/5 xl:w-2/5 "
    >
      <div>
        <label className="block font-bold text-[#22ABB0]">Full name</label>
        <input
          type="text"
          className="w-full"
          name="fullName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.fullName ? (
          <p className="text-red-600 font-normal	">{formik.errors.fullName}</p>
        ) : (
          ""
        )}
      </div>
      <div>
        <label className="block font-bold text-[#22ABB0]">Email</label>
        <input
          type="email"
          className="w-full"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email ? (
          <p className="text-red-600 font-normal	">{formik.errors.email}</p>
        ) : (
          ""
        )}
      </div>

      <div>
        <label className="block font-bold text-[#22ABB0]">Username</label>
        <input
          type="text"
          className="w-full"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username ? (
          <p className="text-red-600 font-normal	">{formik.errors.username}</p>
        ) : (
          ""
        )}
      </div>

      <div className="relative">
        <label className="block font-bold text-[#22ABB0]">Password</label>
        <input
          type={showPass ? "text" : "password"}
          className="w-full"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FontAwesomeIcon
          icon={showPass ? faEye : faEyeSlash}
          className="absolute top-10 right-2 text-[#22ABB0] cursor-pointer"
          onClick={handleShowPass}
        />

        {formik.touched.password ? (
          <p className="text-red-600 font-normal">{formik.errors.password}</p>
        ) : (
          ""
        )}
      </div>
      <div>
        <label className="block font-bold text-[#22ABB0]">
          Confirm Password
        </label>
        <input
          type={showPass ? "text" : "password"}
          className="w-full"
          name="matchpass"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.matchpass ? (
          <p className="text-red-600 font-normal">{formik.errors.matchpass}</p>
        ) : (
          ""
        )}
      </div>
      <div>
        <label className="block font-bold text-[#22ABB0]">Specialization</label>
        <input
          type="text"
          className="w-full"
          name="specialization"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.specialization ? (
          <p className="text-red-600 font-normal	">
            {formik.errors.specialization}
          </p>
        ) : (
          ""
        )}
      </div>
      <div>
        <label className="block font-bold text-[#22ABB0]">Phone Number</label>
        <input
          type="text"
          className="w-full"
          name="phoneNumber"
          maxLength={11}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phoneNumber ? (
          <p className="text-red-600 font-normal	">
            {formik.errors.phoneNumber}
          </p>
        ) : (
          ""
        )}
      </div>
      <button
        type="submit"
        className="bg-[#22ABB0] text-white p-2 rounded-lg font-bold text-xl"
      >
        Register
      </button>
      <p>
        Do you have account? &#160;
        <Link to="/signIn" className="text-[#22ABB0] font-bold">
          Sign in
        </Link>
      </p>
    </form>
  );
}
