import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Paths } from "../Router";

const ListPage = () => {
  return (
    <Box>
      <div>list</div>
      <Link to={`/${Paths.panel}/${Paths.createUser}`}>create</Link>
    </Box>
  );
};

export default ListPage;
