import React from "react";
import Navbar from "../../components/homePageComponents/navbar/navbar";
import FooterLinks from "../../components/homePageComponents/FooterDetails/FooterLinks";
import Footer from "../../components/Footer";
import "./contactUs.css";
import * as Yup from "yup";
import { useFormik, ErrorMessage, Formik } from "formik";
import {toastSucessMessage} from '../../_services/Toaster.service';

const Contact = () => {
  const Schema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    email: Yup.string().required("email is required").email("Enter valid Email"),
    phone: Yup.string().required("phone is required"),
    subject: Yup.string().required("subject is required"),
    message: Yup.string().required("message is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    validationSchema: Schema,

    onSubmit: (values) => {
      console.log(values);
      toastSucessMessage("Your Message Send Successfully ,our team will communicate with you soon");
      formik.handleReset()
      
    },
  });

  return (
    <>
      <Navbar />
      <div className="container conatctUs">
        <div className="heading">
          <h3>Contact with us at any time</h3>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label>Your Name </label>
            <div className="input">
              <input type="text" name="name" placeholder="Enter Your Name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
              {formik.touched.name ? (
                <p className="text-red-600 font-light	">{formik.errors.name}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="form-group">
            <label>Your Email </label>
            <div className="input">
              <input type="email" name="email" placeholder="Enter Your Email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
              {formik.touched.email ? (
                <p className="text-red-600 font-light	">{formik.errors.email}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="form-group">
            <label>Your Phone </label>
            <div className="input">
              <input type="text" name="phone" placeholder="Enter Your phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
              {formik.touched.phone ? (
                <p className="text-red-600 font-light	">{formik.errors.phone}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="form-group">
            <label>Your Subject </label>
            <div className="input">
              <input
                type="text"
                name="subject"
                placeholder="Enter Message Subject"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} value={formik.values.subject}
              />
              {formik.touched.subject ? (
                <p className="text-red-600 font-light	">
                  {formik.errors.subject}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="form-group">
            <label>Your Message </label>
            <div className="input">
              <textarea
              placeholder="Enter Your Message"
                name="message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} value={formik.values.message}
              ></textarea>
              {formik.touched.message ? (
                <p className="text-red-600 font-light	">
                  {formik.errors.message}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="actions">
            <button disabled={!formik.isValid} type="submit">Submit</button>
          </div>
        </form>
      </div>

      <FooterLinks />
      <Footer />
    </>
  );
};

export default Contact;
