import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showAlert } from "@slices";

const useRenderAlert = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const renderAlert = (severity, message) => {
    dispatch(
      showAlert({
        severity,
        message
      })
    );
  };

  const renderError = (message) => {
    renderAlert("error", message);
  };

  const renderSuccess = (message) => {
    renderAlert("success", message);
  };

  const renderInfo = (message) => {
    renderAlert("info", message);
  };

  const renderWarning = (message) => {
    renderAlert("warning", message);
  };

  const renderErrorAndRedirectTo = (message, redirectPath) => {
    renderError(message);
    navigate(redirectPath);
  };

  const renderSuccessAndRedirectTo = (message, redirectPath) => {
    renderSuccess(message);
    navigate(redirectPath);
  };

  const renderInfoAndRedirectTo = (message, redirectPath) => {
    renderInfo(message);
    navigate(redirectPath);
  };

  const renderWarningAndRedirectTo = (message, redirectPath) => {
    renderWarning(message);
    navigate(redirectPath);
  };

  return {
    renderError,
    renderSuccess,
    renderInfo,
    renderWarning,
    renderErrorAndRedirectTo,
    renderSuccessAndRedirectTo,
    renderInfoAndRedirectTo,
    renderWarningAndRedirectTo
  };
};

export default useRenderAlert;
