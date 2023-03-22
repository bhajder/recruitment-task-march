import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Paths } from "../Router";
import { useAuthContext } from "../shared/AuthContext";
import DashboardTemplate from "../templates/DashboardTemplate";

const ListPage = () => {
  const { me } = useAuthContext();
  return (
    <DashboardTemplate title={`Hello, ${me?.username}!`}>
      {me && <Typography variant="h5"></Typography>}
      <div>list</div>
      <Link to={`/${Paths.panel}/${Paths.createUser}`}>create</Link>
    </DashboardTemplate>
  );
};

export default ListPage;
