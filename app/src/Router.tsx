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
import { useAuthContext } from "./context/AuthContext";

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
} as const;

type Path = keyof typeof Paths;
type PathJoin<
  A extends Path,
  B extends Path
> = `/${typeof Paths[A]}/${typeof Paths[B]}`;

export const joinPaths = <A extends Path, B extends Exclude<Path, A>>(
  a: A,
  b: B
): PathJoin<A, B> => {
  return `/${Paths[a]}/${Paths[b]}`;
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
