import { Link } from "react-router-dom";
import { joinPaths } from "../Router";
import { useAuthContext } from "../shared/AuthContext";
import DashboardTemplate from "../templates/DashboardTemplate";
import DataTable from "../components/DataTable";
import { useDatabaseContext } from "../shared/DatabaseContext";
import { Button, TableCell, Tooltip } from "@mui/material";
import { Fragment } from "react";
import { formatDate, getAge } from "../shared/helpers";

const ListPage = () => {
  const { me } = useAuthContext();
  const { allItems, isLoading: isTableLoading } = useDatabaseContext();

  return (
    <DashboardTemplate title={`Hello, ${me?.username}!`}>
      <Link to={joinPaths("panel", "login")}>create</Link>
      <DataTable
        isLoading={isTableLoading}
        data={allItems.map(({ _id, ...rest }) => ({ id: _id, ...rest }))}
        head={
          <>
            <TableCell>No.</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Date of birth</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>About</TableCell>
          </>
        }
        renderRow={(item, index) => (
          <Fragment key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{formatDate(item.dateOfBirthTimestamp)}</TableCell>
            <TableCell>{getAge(item.dateOfBirthTimestamp)}</TableCell>
            <TableCell>
              <Tooltip title={item.about}>
                <Button>Read more...</Button>
              </Tooltip>
            </TableCell>
          </Fragment>
        )}
      />
    </DashboardTemplate>
  );
};

export default ListPage;
