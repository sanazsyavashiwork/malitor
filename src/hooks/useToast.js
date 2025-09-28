import { useState } from "react";

const useToast = () => {
  const [toasts, setToasts] = useState({
    success: {
      show: false,
      message: "",
    },
    error: {
      show: false,
      message: "",
    },
  });

  const showSuccessToast = (message = "عملیات با موفقیت انجام شد") => {
    setToasts((prev) => ({
      ...prev,
      success: {
        show: true,
        message,
      },
    }));
  };

  const showErrorToast = (message = "خطایی رخ داده است") => {
    setToasts((prev) => ({
      ...prev,
      error: {
        show: true,
        message,
      },
    }));
  };

  const hideSuccessToast = () => {
    setToasts((prev) => ({
      ...prev,
      success: {
        ...prev.success,
        show: false,
      },
    }));
  };

  const hideErrorToast = () => {
    setToasts((prev) => ({
      ...prev,
      error: {
        ...prev.error,
        show: false,
      },
    }));
  };

  const hideAllToasts = () => {
    setToasts({
      success: {
        show: false,
        message: "",
      },
      error: {
        show: false,
        message: "",
      },
    });
  };

  return {
    toasts,
    showSuccessToast,
    showErrorToast,
    hideSuccessToast,
    hideErrorToast,
    hideAllToasts,
  };
};

export default useToast;
