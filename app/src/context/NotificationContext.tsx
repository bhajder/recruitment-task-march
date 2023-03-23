import React, { useContext } from "react";
import { useSnackbar } from "notistack";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";

const defaultHandler = () => {
  throw Error("Cannot find NotificationContext Provider");
};

interface NotificationContextType {
  showErrorSnackbar: (text?: string) => void;
  showSuccessSnackbar: (text: string) => void;
}

const NotificationContext = React.createContext<NotificationContextType>({
  showErrorSnackbar: defaultHandler,
  showSuccessSnackbar: defaultHandler,
});

export const NotificationContextProvider = ({ children }: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const showErrorSnackbar = (text?: string) => {
    enqueueSnackbar(
      <>
        <ErrorOutline />
        {text || "Something went wrong"}
      </>
    );
  };

  const showSuccessSnackbar = (text: string) => {
    enqueueSnackbar(
      <>
        <CheckCircleOutline />
        {text}
      </>
    );
  };

  return (
    <NotificationContext.Provider
      value={{ showErrorSnackbar, showSuccessSnackbar }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
