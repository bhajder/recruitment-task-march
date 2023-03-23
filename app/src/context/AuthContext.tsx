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
import { useDatabaseService } from "../services/databaseService";
import { useLocalStorageService } from "../services/localStorageService";
import { DBUser, User } from "../models/User";
import loadingReducer from "../reducers/loadingReducer";
import { useDatabaseContext } from "./DatabaseContext";
import { useNotificationContext } from "./NotificationContext";

const defaultHandler = () => {
  throw Error("Cannot find AuthContext Provider");
};

interface DatabaseContextType {
  isAuthenticated: boolean;
  me?: DBUser;
  isLoading: boolean;
  login: ({ username, password }: AuthPayload) => void;
  createAccount: (newUser: User) => void;
  logout: () => void;
}

const AuthContext = React.createContext<DatabaseContextType>({
  isAuthenticated: false,
  me: undefined,
  isLoading: false,
  login: defaultHandler,
  createAccount: defaultHandler,
  logout: defaultHandler,
});

const localStorageAuthKey = "bhrtAuth";

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [me, setMe] = useState<DBUser>();

  const { getUser, getItem: getDBItem } = useDatabaseService();
  const { handleSaveItem } = useDatabaseContext();
  const { getItem, removeItem, setItem } =
    useLocalStorageService<AuthPersistance>();

  const [isLoading, dispatch] = useReducer(loadingReducer, {});

  const { showErrorSnackbar, showSuccessSnackbar } = useNotificationContext();

  const login = async ({ username, password }: AuthPayload) => {
    dispatch({ type: "START_LOADING", key: "login" });
    const user = await getUser(username);
    if (!user) {
      showErrorSnackbar("No user found with provided username");
      dispatch({ type: "STOP_LOADING", key: "login" });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      logout();
      showErrorSnackbar("Provided password for this user is invalid");
      dispatch({ type: "STOP_LOADING", key: "login" });
      return;
    }

    setMe(user);
    authenticate({ id: user._id, hash: user.password });
    showSuccessSnackbar("Logged in successfully!");
    dispatch({ type: "STOP_LOADING", key: "login" });
  };

  const createAccount = async (newUser: User) => {
    dispatch({ type: "START_LOADING", key: "createAccount" });
    const hash = await bcrypt.hash(newUser.password, 10);
    try {
      await handleSaveItem({ ...newUser, password: hash });
      showSuccessSnackbar("User created successfully!");
    } catch (err) {
      showErrorSnackbar();
    }
    dispatch({ type: "STOP_LOADING", key: "createAccount" });
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
    if (!user) {
      removeItem(localStorageAuthKey);
      dispatch({ type: "STOP_LOADING", key: "getMe" });
      setIsAuthenticated(false);
      return;
    }
    setMe(user);
    setIsAuthenticated(true);

    dispatch({ type: "STOP_LOADING", key: "getMe" });
  };

  useEffect(() => {
    const authItem = getItem(localStorageAuthKey);
    if (!authItem) return setIsAuthenticated(false);
    if (!me) getMe(authItem.id);
    return;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        me,
        isLoading: Object.values(isLoading).some((loading) => loading),
        login,
        createAccount,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
