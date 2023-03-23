import React, { forwardRef } from "react";
import { SnackbarContent, useSnackbar } from "notistack";
import { Box } from "@mui/material";

interface NotificationSnackbarProps {
  id: string | number;
  message: string | React.ReactNode;
}

const NotificationSnackbar = forwardRef<
  HTMLDivElement,
  NotificationSnackbarProps
>(({ message }, ref) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <SnackbarContent ref={ref}>
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: "24px",
          background: "#fff",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          fontSize: "15px",
          lineHeight: "24px",
          width: "min(90vw, 460px)",
          gap: "20px",
        }}
        onClick={() => closeSnackbar()}
      >
        {message}
      </Box>
    </SnackbarContent>
  );
});

export default NotificationSnackbar;
