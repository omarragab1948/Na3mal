import React, { useRef, useState ,useEffect } from "react";
import style from "../../pages/Doctors/doctors.module.css";
import InputField from "../../shared/FormsModules/InputField";
import SystemBtns from "../../shared/buttons/systemBtns";
import { useForm } from "react-hook-form";
import { toastWaringMessage } from "../../_services/Toaster.service";
import {Base64Prefix} from '../../_utils/consts'

const AddEdit = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({});

  const fileUploaderRef = useRef(null);
  const [doctorImage, setDoctorImage] = useState(null);
  const [actionStatus, setActionStatus] = useState("pendding");
  const [mode, setMode] = useState("add");
  const [displayedImage, setDisplayedImage] = useState("../../../public/dummy.png");


  const [isImageUploaded, setImageUploaded] = useState(false);

  useEffect(()=>{
    if(props.data){
      setMode("edit")
      setValue('id', props.data.doctorId);
      setValue('userId', props.data.userId);
      setValue('doctorName', props.data.fullName);
      setValue('doctorSpecialization', props.data.specialization);
      setValue('doctorSummary', props.data.description);
      setValue('phoneNumber', props.data.phoneNumber);
      setDisplayedImage(Base64Prefix+props.data.imageUrl);
    }
   

  },[props.data])
 

  const uploadFile = () => {
    fileUploaderRef.current.click();
  };

  const handleFileUpload = (e) => {
    if (e.target.files[0]) {
      setImageUploaded(true);
      setDoctorImage(e.target.files[0]);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setDisplayedImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onsubmit = (data) => {

    if(!doctorImage && mode =='add'){
      toastWaringMessage("Doctor Photo Is Required")
      return;
    }
    console.log({
      ...data,
      image: doctorImage,
    });
  
    let forSending = {
      id: data.id,
      userId:data.userId,
      name: data.doctorName,
      phoneNumber:data.phoneNumber,
      imageUrl: doctorImage,
      specialization: data.doctorSpecialization,
      description: data.doctorSummary,
      email:data.email
      
    };
    setActionStatus("Submitted")
    props.closepopup(forSending);
    reset();

  };


  return (
    <>
      <div className="container-fluid">
        <div
          className={`${style["upload-Image"]}`}
          style={{ backgroundImage: `url(${displayedImage})` }}
        >
          <input
            ref={fileUploaderRef}
            type="file"
            hidden
            onChange={handleFileUpload}
          />
          {!isImageUploaded ? (
            <button onClick={uploadFile}>Upload Doctor Image</button>
          ) : (
            <button onClick={uploadFile}>Edit Doctor Image</button>
          )}
        </div>
        <div className={`${style.form}`}>
          <form onSubmit={handleSubmit(onsubmit)}>
            <InputField data={{ label: "Doctor Name" }}>
              <input
                {...register("doctorName", { required: "Name is required" })}
                className={`${style.input}`}
                placeholder="Enter Doctor Name"
                name="doctorName"
                type="text"
              />
              {errors.doctorName?.message && (
                <p className="text-red-600">{errors.doctorName?.message}</p>
              )}
            </InputField>

            <InputField data={{ label: "phone Number" }}>
              <input
                {...register("phoneNumber", { required: "Phone Number is required" })}
                className={`${style.input}`}
                placeholder="Enter Phone Number"
                name="phoneNumber"
                type="text"
              />
              {errors.phoneNumber?.message && (
                <p className="text-red-600">{errors.phoneNumber?.message}</p>
              )}
            </InputField>

           {
            mode=='add'&&(
              <InputField  data={{ label: "ُEmail" }}>
              <input
                disabled={mode == 'edit'}
                {...register("email", { required: "Email is required" })}
                className={`${style.input}`}
                placeholder="Enter Email"
                name="email"
                type="email"
              />
              {errors.email?.message && (
                <p className="text-red-600">{errors.email?.message}</p>
              )}
            </InputField>
            )
           }

            <InputField data={{ label: "Doctor Specialization" }}>
              <input
                {...register("doctorSpecialization", {
                  required: " Specialization is required",
                })}
                className={`${style.input}`}
                placeholder="Enter Doctor Specialization"
                name="doctorSpecialization"
                type="text"
              />
              {errors.doctorSpecialization?.message && (
                <p className="text-red-600">
                  {errors.doctorSpecialization?.message}
                </p>
              )}
            </InputField>

            <InputField data={{ label: "Doctor Summary" }}>
              <input
                {...register("doctorSummary", {
                  required: " Summary is required",
                })}
                className={`${style.input}`}
                placeholder="Enter Doctor Summary"
                name="doctorSummary"
                type="text"
              />
              {errors.doctorSummary?.message && (
                <p className="text-red-600">{errors.doctorSummary?.message}</p>
              )}
            </InputField>
            <div className="container-flex-end">
              <SystemBtns data={{ text: "Submit", type: "submit" ,status:actionStatus }} />
              

            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEdit;
