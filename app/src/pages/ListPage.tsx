import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDatabaseContext } from "../shared/DatabaseContext";

const ListPage = () => {
  const { allItems, handleSaveItem } = useDatabaseContext();
  const handleAdd = async () => {
    await handleSaveItem({
      about: "About",
      name: "Test",
      email: "test@test.com",
      dateOfBirthTimestamp: 123456789,
      password: "zaq1@WSX",
    });
  };
  return (
    <Box>
      <Link to="/login">Login</Link>
      <Link to="/new">Create New User</Link>
      <Button onClick={handleAdd}>Add</Button>
      {allItems?.map((item) => (
        <p>{item.name}</p>
      ))}
    </Box>
  );
};

export default ListPage;
