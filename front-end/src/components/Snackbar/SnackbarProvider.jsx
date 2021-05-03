import React, { useState, createContext } from "react";
import PropTypes from "prop-types";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export const SnackbarContext = createContext();

const SnackbarProvider = props => {
  const { duration, children } = props;

  const [alert, setAlert] = useState({
    open: false,
    type: null,
    message: null
  });

  const snackbarSuccess = (message, duration) => {
    handleClose();

    setAlert({
      open: true,
      type: "success",
      message,
      duration
    });
  };

  const snackbarError = (message, duration) => {
    handleClose();
    setAlert({
      open: true,
      type: "error",
      message,
      duration: duration || 4000
    });
  };

  const value = { snackbarSuccess, snackbarError };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(alert => {
      return {
        ...alert,
        open: false
      };
    });
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={alert.duration || duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={alert.type || "info"}
          elevation={6}
          variant="filled"
        >
          {alert.message || ""}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

SnackbarProvider.displayName = "SnackbarProvider";

SnackbarProvider.propTypes = {
  duration: PropTypes.number
};

SnackbarProvider.defaultProps = {
  duration: 5000
};

export default SnackbarProvider;
