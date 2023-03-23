import { Box, CircularProgress } from "@mui/material";

interface ViewLoaderProps {
  fullHeight?: boolean;
}

const ViewLoader = ({ fullHeight }: ViewLoaderProps) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    p={2}
    sx={{ height: fullHeight ? "100vh" : "auto" }}
  >
    <CircularProgress />
  </Box>
);

export default ViewLoader;
