import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  CircularProgress,
  Box,
} from "@mui/material";
import ViewLoader from "./ViewLoader";

export interface DataTableProps<ITEM extends { id: string }> {
  data: ITEM[];
  head: React.ReactNode;
  isLoading?: boolean;
  renderRow: (item: ITEM, index: number) => React.ReactElement;
}

const DataTable = <ITEM extends { id: string }>({
  data,
  head,
  isLoading,
  renderRow,
}: DataTableProps<ITEM>) => {
  return (
    <TableContainer variant="outlined" component={Paper}>
      {isLoading ? (
        <ViewLoader />
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>{head}</TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {renderRow(item, index)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default DataTable;
