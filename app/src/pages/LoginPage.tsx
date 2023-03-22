import { Box, Paper, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh" }}
    >
      <Paper variant="outlined" sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          LOG IN
        </Typography>
        <Typography variant="body1" mb={4}>
          Provide your credentials to access the app
        </Typography>
        <LoginForm />
      </Paper>
    </Box>
  );
};

export default LoginPage;
