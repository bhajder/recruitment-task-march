import { IconButton, Paper, Typography } from "@mui/material";
import DashboardTemplate from "../templates/DashboardTemplate";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";

const CreatePage = () => {
  const navigate = useNavigate();
  return (
    <DashboardTemplate
      title={
        <>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
            <ArrowBack sx={{ color: "#fff" }} />
          </IconButton>
          Create New User
        </>
      }
    >
      <Typography variant="h5" mt={4}>
        Here you can create a new user
      </Typography>
      <Typography variant="body1" mb={2}>
        Provide data for new user, then save and see it in the table or try and
        login with provided credentials.
      </Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <UserForm />
      </Paper>
    </DashboardTemplate>
  );
};

export default CreatePage;
