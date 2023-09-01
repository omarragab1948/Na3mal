import React, { useRef, useState ,useEffect } from "react";
import style from "../../pages/Doctors/doctors.module.css";
import InputField from "../../shared/FormsModules/InputField";
import SystemBtns from "../../shared/buttons/systemBtns";
import { useForm } from "react-hook-form";
import {toastWaringMessage} from '../../_services/Toaster.service';
import {Base64Prefix} from '../../_utils/consts';


const AddEditNews = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({});

  const fileUploaderRef = useRef(null);
  const [newsImage, setNewsImage] = useState(null);
  const [mode, setMode] = useState("add");
  const [displayedImage, setDisplayedImage] = useState("../../../public/dummy.png");


  const [isImageUploaded, setImageUploaded] = useState(false);
  useEffect(()=>{
    if(props.data){
      setMode("edit")
      setValue('id', props.data.announcementId);
      setValue('title', props.data.title);
      setValue('description', props.data.description);
      setDisplayedImage(Base64Prefix+props.data.imageUrl);
    }
   

  },[props.data])
 

  const uploadFile = () => {
    fileUploaderRef.current.click();
  };

  const handleFileUpload = (e) => {
    if (e.target.files[0]) {
      setImageUploaded(true);
      setNewsImage(e.target.files[0]);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setDisplayedImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onsubmit = (data) => {
    if(!newsImage && mode=='add'){
      toastWaringMessage("Announcement Photo Is Required")
      return;
    }
    console.log({
      ...data,
      image: newsImage,
    });
    let forSending = {
      id: data?.id,
      title:data.title,
      imageUrl: newsImage,
      description:data.description
    };
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
            <button onClick={uploadFile}>Upload News Image</button>
          ) : (
            <button onClick={uploadFile}>Edit News Image</button>
          )}
        </div>
        <div className={`${style.form}`}>
          <form onSubmit={handleSubmit(onsubmit)}>
            <InputField data={{ label: "Title" }}>
              <input
              style={{display:"block"}}
                {...register("title", { required: "title is required" })}
                className={`${style.input}`}
                placeholder="Enter Title"
                name="title"
                type="text"
              />
              {errors.title?.message && (
                <p className="text-red-600">{errors.title?.message}</p>
              )}
            </InputField>

            <InputField data={{ label: "Description" }}>
              <input
                {...register("description", {
                  required: " Description is required",
                })}
                className={`${style.input}`}
                placeholder="Enter Description"
                name="description"
                type="text"
              />
              {errors.description?.message && (
                <p className="text-red-600">
                  {errors.description?.message}
                </p>
              )}
            </InputField>

            
            <div className="container-flex-end">
              <SystemBtns data={{ text: "Submit", type: "submit" }} />
              

            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEditNews;
