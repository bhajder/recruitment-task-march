import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreateUserPage from "./pages/CreateUserPage";
import ListPage from "./pages/ListPage";
import { AuthContextProvider, useAuthContext } from "./shared/AuthContext";
import { DatabaseContextProvider } from "./shared/DatabaseContext";

const NonAuthGuard = () => {
  const { isAuthenticated } = useAuthContext();
  return !isAuthenticated ? <Outlet /> : <Navigate to={Paths.panel} />;
};

const AuthGuard = () => {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? <Outlet /> : <Navigate to={"/" + Paths.login} />;
};

export const Paths = {
  base: "/",
  login: "login",
  panel: "panel",
  list: "list",
  createUser: "create",
};

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={Paths.base} element={<NonAuthGuard />}>
        <Route index element={<Navigate to={Paths.login} />} />
        <Route path={Paths.login} element={<LoginPage />} />
      </Route>
      <Route path={Paths.panel} element={<AuthGuard />}>
        <Route index element={<Navigate to={Paths.list} />} />
        <Route path={Paths.list} element={<ListPage />} />
        <Route path={Paths.createUser} element={<CreateUserPage />} />
      </Route>
      <Route path={"*"} element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);
