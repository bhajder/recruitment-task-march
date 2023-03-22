import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Paths, joinPaths } from "../Router";
import { useAuthContext } from "../shared/AuthContext";
import DashboardTemplate from "../templates/DashboardTemplate";

const ListPage = () => {
  const { me } = useAuthContext();
  return (
    <DashboardTemplate title={`Hello, ${me?.username}!`}>
      <Link to={joinPaths("panel", "login")}>create</Link>
    </DashboardTemplate>
  );
};

export default ListPage;
