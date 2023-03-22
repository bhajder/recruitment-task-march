import { Logout } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";
import { useAuthContext } from "../shared/AuthContext";

interface DashboardTemplateProps {
  title: string;
  children: ReactNode;
}

const DashboardTemplate = ({ title, children }: DashboardTemplateProps) => {
  const { logout } = useAuthContext();
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