import { useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "./useToast2";

export function useErrorApiHandler(options = {}) {
  const { showToast = true, onCustomError } = options;
  const { errorToast } = useToast();
  const [serverErrors, setServerErrors] = useState({});
  const router = useRouter();
  const pathname = usePathname();

  const clearErrors = useCallback(() => {
    setServerErrors({});
  }, []);

  const clearFieldError = useCallback((fieldName) => {
    setServerErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  const clearFieldErrors = useCallback((fieldNames) => {
    setServerErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      fieldNames.forEach((fieldName) => {
        delete newErrors[fieldName];
      });
      return newErrors;
    });
  }, []);

  const showErrorToast = useCallback(
    (message) => {
      if (showToast && typeof window !== "undefined") {
        errorToast(message);
      }
    },
    [showToast]
  );

  const handleError = useCallback(
    (error) => {
      setServerErrors({});

      if (error?.isAxiosError || error?.response) {
        const status = error.response?.status;
        const errorData = error.response?.data;

        if (
          error?.response?.data?.errors &&
          Array.isArray(error.response.data.errors) &&
          error.response.data.errors[0]?.message
        ) {
          showErrorToast(error.response.data.errors[0].message);
        }
        if (
          error?.response?.data?.errors &&
          Array.isArray(error.response.data.errors) &&
          error.response.data.errors[0]?.error
        ) {
          showErrorToast(error.response.data.errors[0].error);
        }
        if (
          error?.response?.data?.errors &&
          Array.isArray(error.response.data.errors.non_field_errors) &&
          error.response.data.errors?.non_field_errors
        ) {
          showErrorToast(error.response.data.errors.non_field_errors[0]);
        }

        if (errorData && typeof errorData === "object") {
          if (!errorData.message && !errorData.error) {
            const fieldErrors = {};
            Object.keys(errorData).forEach((key) => {
              if (Array.isArray(errorData[key])) {
                fieldErrors[key] = errorData[key][0];
              } else if (typeof errorData[key] === "string") {
                fieldErrors[key] = errorData[key];
              }
            });
            setServerErrors(fieldErrors);
          }

          if (errorData.errors && Array.isArray(errorData.errors)) {
            const fieldErrors = {};
            errorData.errors.forEach((err) => {
              const fieldName = err.field || err.param || err.path;
              if (fieldName) {
                fieldErrors[fieldName] =
                  err.message || err.msg || "خطای اعتبارسنجی";
              }
            });
            setServerErrors(fieldErrors);
          }

          if (
            errorData.validationErrors &&
            typeof errorData.validationErrors === "object"
          ) {
            setServerErrors(errorData.validationErrors);
          }

          if (errorData.message || errorData.error) {
            showErrorToast(errorData.message || errorData.error);
          }
        }

        if (
          error?.response?.data?.errors?.non_field_errors &&
          Array.isArray(error.response.data.errors.non_field_errors) &&
          error.response.data.errors.non_field_errors[0]
        ) {
          showErrorToast(error.response.data.errors.non_field_errors[0]);
        }

        if (status === 401) {
        }

        if (status === 403) {
          showErrorToast("شما اجازه دسترسی به این بخش را ندارید");
        }

        if (status === 404) {
          showErrorToast("منبع مورد نظر یافت نشد");
        }

        if (status && status >= 500) {
          showErrorToast("خطای سرور. لطفاً بعداً تلاش کنید");
        }
      }

      if (error?.message) {
        showErrorToast(error.message);
      }

      if (onCustomError) {
        onCustomError(error);
      }
    },
    [pathname, router, showToast, showErrorToast, onCustomError]
  );

  const getFieldError = useCallback(
    (fieldName) => {
      return serverErrors[fieldName];
    },
    [serverErrors]
  );

  const hasErrors = Object.keys(serverErrors).length > 0;

  return {
    serverErrors,
    clearErrors,
    clearFieldError,
    clearFieldErrors,
    handleError,
    hasErrors,
    getFieldError,
  };
}
