import { useSelector, useDispatch } from "react-redux";
import { AlertTitle, Snackbar, Alert, Slide } from "@mui/material";
import { hideAlert } from "@slices";
import { capitalizeFirstLetter } from "@utils";

const SlideTransition = (props) => <Slide {...props} direction="down" />;

const GlobalAlert = () => {
  const dispatch = useDispatch();
  const { isOpen, message, severity } = useSelector(
    (state) => state.globalAlert
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideAlert());
  };

  const SnackbarPosition = { vertical: "top", horizontal: "center" };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={SnackbarPosition}
      TransitionComponent={SlideTransition}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ alignItems: "center" }}
      >
        <AlertTitle>{capitalizeFirstLetter(severity)}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalAlert;
