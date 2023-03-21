import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const ListPage = () => {
  return (
    <Box>
      <Link to="/login">Login</Link>
      <Link to="/new">Create New User</Link>
    </Box>
  );
};

export default ListPage;