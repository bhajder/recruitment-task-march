import { Logout } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { useAuthContext } from "../context/AuthContext";
import ViewLoader from "../components/ViewLoader";

interface DashboardTemplateProps {
  title: ReactNode;
  children: ReactNode;
}

const DashboardTemplate = ({ title, children }: DashboardTemplateProps) => {
  const { logout, isLoading, me } = useAuthContext();

  if (!me && isLoading) return <ViewLoader fullHeight />;

  return (
    <Container>
      <AppBar position="static" sx={{ borderRadius: 1, my: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton onClick={logout}>
            <Logout sx={{ color: "#fff" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      {children}
    </Container>
  );
};

export default DashboardTemplate;
