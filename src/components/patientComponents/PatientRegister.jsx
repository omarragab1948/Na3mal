import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearSuccess,
  register,
} from "../../redux/Slices/AuthSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";


export default function PatientRegister() {
  const [showPass, setShowPass] = useState(false);
  const handleShowPass = function () {
    setShowPass((showPass) => !showPass);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.AuthSlice);


  const Schema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    nid: Yup.string()
      .required("National ID is required")
      .min(14, "ID can not be less than 14 numbers")
      .max(14, "ID can not be more than 14 numbers"),
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
    gender: Yup.string().required("Gender is required"),
    age: Yup.number().required("Age is required"),
    address: Yup.string().required("Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      nid: "",
      email: "",
      username: "",
      password: "",
      phoneNumber: "",
      age: null,
      gender: "",
      address: "",
    },
    validationSchema: Schema,

    onSubmit: async (values) => {
      dispatch(register({ endPoint: "PatientRegister", values }));
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
        <label className="block font-bold text-[#22ABB0]">ID</label>
        <input
          type="string"
          className="w-full"
          name="nid"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          maxLength={14}
        />
        {formik.touched.nid ? (
          <p className="text-red-600 font-normal	">{formik.errors.nid}</p>
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
      <div>
        <label className="block font-bold text-[#22ABB0]">Age</label>
        <input
          type="number"
          className="w-full"
          name="age"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.age && formik.errors.age ? (
          <p className="text-red-600 font-normal	">{formik.errors.age}</p>
        ) : (
          ""
        )}
      </div>
      <div>
        <label className="block font-bold text-[#22ABB0]">Address</label>
        <input
          type="text"
          className="w-full"
          name="address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.address && formik.touched.address ? (
          <p className="text-red-600 font-normal	">{formik.errors.address}</p>
        ) : (
          ""
        )}
      </div>
      <div>
        <label className="block font-bold text-[#22ABB0]" htmlFor="gender">
          Gender
        </label>
        <select
          className="w-full border-2 rounded-lg p-2"
          name="gender"
          id="gender"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option>Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {formik.touched.gender && formik.errors.gender ? (
          <p className="text-red-600 font-normal	">{formik.errors.gender}</p>
        ) : (
          ""
        )}
      </div>
      <button
        type="submit"
        className="bg-[#22ABB0] text-white p-2 rounded-lg font-bold text-xl"
      >
        {loading ? "Loading..." : "Register"}
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
