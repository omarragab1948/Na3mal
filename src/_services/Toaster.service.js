import { toast } from "react-toastify";

const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};
export const toastErrorMessage = (errorMessage = "Some thing went wrong") => {
  toast.error(errorMessage,{
    ...toastConfig
  });
};

export const toastSucessMessage = (successMessage = "Success") => {
    toast.success(successMessage,{
      ...toastConfig
    });
  };

export const toastWaringMessage = (waringMessage = "Waring") => {
  toast.warning(waringMessage,{
    ...toastConfig
  });
};

export const toastInfoMessage = (infoMessage = "Info") => {
    toast.info(infoMessage,{
      ...toastConfig
    });
  };