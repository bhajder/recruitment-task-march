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
import useAuth from "./shared/useAuth";

const NonAuthGuard = () => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <Outlet /> : <Navigate to="/panel" />;
};

const AuthGuard = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
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
      <Route path={"/*"} element={<Navigate to={Paths.base} />} />
    </Routes>
  </BrowserRouter>
);
