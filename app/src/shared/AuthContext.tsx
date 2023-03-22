import { PropsWithChildren, useContext, useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { AuthPayload, AuthPersistance } from "../models/Auth";
import React from "react";
import { useDatabaseService } from "./databaseService";
import { useLocalStorageService } from "./localStorageService";
import { DBUser } from "../models/User";

const defaultHandler = () => {
  throw Error("Cannot find AuthContext Provider");
};

interface DatabaseContextType {
  isAuthenticated: boolean;
  me?: DBUser;
  login: ({ username, password }: AuthPayload) => void;
  logout: () => void;
}

const AuthContext = React.createContext<DatabaseContextType>({
  isAuthenticated: false,
  me: undefined,
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

  const login = async ({ username, password }: AuthPayload) => {
    const user = await getUser(username);
    if (!user) return; //TODO: handle notification

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return logout(); // TODO: handle notification

    setMe(user);
    authenticate({ id: user._id, hash: user.password });
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
    const user = await getDBItem(id);
    if (!user) return;
    setMe(user);
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
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
