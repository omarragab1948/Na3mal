import React, { useState, useEffect, useRef } from "react";
import DoctorItem from "../../components/doctorsComponents/doctorItems";
import style from "./doctors.module.css";
import Navbar from "../../components/homePageComponents/navbar/navbar";
import Footer from "../../components/Footer";
import { Dialog } from "primereact/dialog";
import AddEdit from "../../components/doctorsComponents/AddEdit";
import { get, post, del, put } from "../../_services/APiCaller.Service";
import { APIS } from "../../_utils/APIS";
import { Paginator } from "primereact/paginator";
import { toastErrorMessage, toastSucessMessage } from "../../_services/Toaster.service";
import FooterLinks from "../../components/homePageComponents/FooterDetails/FooterLinks";
import Loader from "../../_helpers/loader";
import { ConfirmDialog } from "primereact/confirmdialog"; // To use <ConfirmDialog> tag
import { confirmDialog } from "primereact/confirmdialog"; // To use confirmDialog method
import emailjs from "@emailjs/browser";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorsPage = () => {
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalRecorders, setTotalRecorders] = useState(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  let dataLoaded = useRef(false);

  useEffect(() => {
    dataLoaded.current = true;
    getDoctorList();
  }, [first, rows]);

  const getDoctorList = () => {
    setIsLoading(true);

    get(
      APIS.HomePage.TeamList + "?PageNumber=" + pageNumber + "&PageSize=" + rows
    ).then((res) => {
      setIsLoading(false);
      setTotalRecorders(res.totalRecords);
      setItems(res.data);
    });
  };

  const onAddEditNewDoctor = (data) => {
    if (editItem) {
      put(APIS.HomePage.TeamList + "/" + data.id, prepareDataToSend(data)).then(
        (res) => {
          toastSucessMessage("Doctor Data updated Successfully");
          getDoctorList();
          setVisible(false);
        }
      );
    } else {
      post(APIS.HomePage.TeamList, prepareDataToSend(data)).then((res) => {
        sendEmailForNewDoctor(data);
        toastSucessMessage("Doctor Added Successfully");
        getDoctorList();
        setVisible(false);
      });
    }
  };
  const addDoctor = () => {
    setVisible(true);
    setEditItem(null);
  };

  const sendEmailForNewDoctor = (data) => {
    var data = {
      service_id: "service_wch5dwh",
      template_id: "template_0l92znn",
      user_id: "YpXccYVwzKiFKMS3w",
      template_params: {
        to_email: data.email,
        from_name: "I care Admin",
        message: `welcome Doctor ${data.name} , your userName is ${data.email} and password is (P@ssw0rd)`,
      },
    };

    axios.post("https://api.emailjs.com/api/v1.0/email/send", data).then(
      (response) => {
       toastSucessMessage("Email Send To doctor Successfully");
      },
      (err) => {
        toastErrorMessage("Error");
      }
    );
  };
  const editDoctor = (data) => {
    setVisible(true);
    setEditItem(data);
  };

  const deleteDoctor = (data) => {
    confirm(data);
  };
  const confirm = (data) => {
    confirmDialog({
      message: `Are you sure you want to Delete Doctor ${data.name} Data?`,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        del(APIS.HomePage.TeamList + "/" + data.doctorId).then((res) => {
          toastSucessMessage(`Doctor ${data.name} Data Removed Successfully`);
          getDoctorList();
        });
      },
      reject: () => {
        return;
      },
    });
  };

  function prepareDataToSend(data) {
    let formData = new FormData();
    formData.append("FullName", data.name);
    formData.append("PhoneNumber", data.phoneNumber);
    formData.append("Description", data.description);
    formData.append("ImageFile", data.imageUrl);
    formData.append("Specialization", data.specialization);
    if (!editItem) {
      formData.append("Email", data.email);
      formData.append("Password", "P@ssw0rd");
      formData.append("UserName", data.email);
    } else {
      formData.append("DoctorId", data?.id);
      formData.append("UserId", data.userId);
    }
    return formData;
  }

  function onPageChange(event) {
    setFirst(() => event.first);
    setRows(() => event.rows);
    setPageNumber(() => event.page + 1);

    console.log(event);
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="container">
            <h2 className="header header-title">Our Team </h2>
            <div className={` ${style["add-btn"]} `}>
              <button className={`${style.btn}`} onClick={addDoctor}>
                Add
              </button>
            </div>
            <div className={`${style.content}`}>
              {items.map((item) => {
                return (
                  <DoctorItem
                    onEdit={editDoctor}
                    onDelete={deleteDoctor}
                    data={item}
                    key={item.doctorId}
                  />
                );
              })}
            </div>
            <div className="card">
              <Paginator
                first={first}
                rows={rows}
                totalRecords={totalRecorders}
                rowsPerPageOptions={[6, 9, 12]}
                onPageChange={onPageChange}
              />
            </div>
          </div>

          <Dialog
            header={editItem ? "Edit Doctor" : "Add Doctor"}
            visible={visible}
            style={{ width: "50vw" }}
            onHide={() => setVisible(false)}
          >
            <AddEdit data={editItem} closepopup={onAddEditNewDoctor} />
          </Dialog>

          <FooterLinks />
          <Footer />
          <ConfirmDialog />
        </>
      )}
    </>
  );
};

export default DoctorsPage;
