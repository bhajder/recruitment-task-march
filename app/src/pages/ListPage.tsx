import { Link } from "react-router-dom";
import { joinPaths } from "../Router";
import { useAuthContext } from "../shared/AuthContext";
import DashboardTemplate from "../templates/DashboardTemplate";
import DataTable from "../components/DataTable";
import { useDatabaseContext } from "../shared/DatabaseContext";
import {
  Box,
  Button,
  TableCell,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Fragment } from "react";
import { formatDate, getAge } from "../shared/helpers";
import { StarOutlineTwoTone } from "@mui/icons-material";

const ListPage = () => {
  const { me } = useAuthContext();
  const { allItems, isLoading: isTableLoading } = useDatabaseContext();
  const mobile = useMediaQuery("(max-width: 800px)");

  return (
    <DashboardTemplate title={`Hello, ${me?.username}!`}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={mobile ? "flex-start" : "flex-end"}
        flexDirection={mobile ? "column" : "row"}
        mt={4}
        mb={2}
      >
        <Box>
          <Typography variant="h5">List of users</Typography>
          <Typography variant="body1">
            Here you can view a list of added entries with details
          </Typography>
        </Box>
        <Box>
          <Link to={joinPaths("panel", "createUser")}>
            <Button variant="contained" sx={{ mt: mobile ? 1 : 0 }}>
              create new user
            </Button>
          </Link>
        </Box>
      </Box>
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
            <TableCell>
              <Box display="flex" alignItems="center">
                {item?.isSpecial && (
                  <StarOutlineTwoTone color="warning" sx={{ mr: 1 }} />
                )}
                {item.username}
              </Box>
            </TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{formatDate(item.dateOfBirthTimestamp)}</TableCell>
            <TableCell>{getAge(item.dateOfBirthTimestamp)}</TableCell>
            <TableCell>
              <Tooltip enterTouchDelay={0} title={item.about}>
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
