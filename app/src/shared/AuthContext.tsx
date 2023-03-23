import {
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import bcrypt from "bcryptjs";
import { AuthPayload, AuthPersistance } from "../models/Auth";
import React from "react";
import { useDatabaseService } from "./databaseService";
import { useLocalStorageService } from "./localStorageService";
import { DBUser } from "../models/User";
import loadingReducer from "./loadingReducer";

const defaultHandler = () => {
  throw Error("Cannot find AuthContext Provider");
};

interface DatabaseContextType {
  isAuthenticated: boolean;
  me?: DBUser;
  isLoading: boolean;
  login: ({ username, password }: AuthPayload) => void;
  logout: () => void;
}

const AuthContext = React.createContext<DatabaseContextType>({
  isAuthenticated: false,
  me: undefined,
  isLoading: false,
  login: defaultHandler,
  logout: defaultHandler,
});

const localStorageAuthKey = "bhrtAuth";

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [me, setMe] = useState<DBUser>();

  const { getUser, getItem: getDBItem } = useDatabaseService();
  const { getItem, removeItem, setItem } =
    useLocalStorageService<AuthPersistance>();

  const [isLoading, dispatch] = useReducer(loadingReducer, {});

  const login = async ({ username, password }: AuthPayload) => {
    dispatch({ type: "START_LOADING", key: "login" });
    const user = await getUser(username);
    if (!user) return; //TODO: handle notification

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return logout(); // TODO: handle notification

    setMe(user);
    authenticate({ id: user._id, hash: user.password });

    dispatch({ type: "STOP_LOADING", key: "login" });
  };

  const authenticate = (data: AuthPersistance) => {
    setItem(localStorageAuthKey, data);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeItem(localStorageAuthKey);
    setIsAuthenticated(false);
  };

  const getMe = async (id: string) => {
    dispatch({ type: "START_LOADING", key: "getMe" });
    const user = await getDBItem(id);
    if (!user) return;
    setMe(user);

    dispatch({ type: "STOP_LOADING", key: "getMe" });
  };

  useEffect(() => {
    const authItem = getItem(localStorageAuthKey);
    if (!authItem) return setIsAuthenticated(false);
    setIsAuthenticated(true);
    getMe(authItem.id);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        me,
        isLoading: Object.values(isLoading).some((loading) => loading),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
