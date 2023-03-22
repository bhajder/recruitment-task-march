import { PropsWithChildren, useContext, useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { AuthPayload, AuthPersistance } from "../models/Auth";
import React from "react";
import { useDatabaseService } from "./databaseService";
import { useLocalStorageService } from "./localStorageService";

const defaultHandler = () => {
  throw Error("Cannot find AuthContext Provider");
};

interface DatabaseContextType {
  isAuthenticated: boolean;
  login: ({ username, password }: AuthPayload) => void;
  logout: () => void;
}

const AuthContext = React.createContext<DatabaseContextType>({
  isAuthenticated: false,
  login: defaultHandler,
  logout: defaultHandler,
});

const localStorageAuthKey = "bhrtAuth";

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { getUser } = useDatabaseService();
  const { getItem, removeItem, setItem } = useLocalStorageService();

  const login = async ({ username, password }: AuthPayload) => {
    const user = await getUser(username);
    if (!user) return; //TODO: handle notification

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return logout(); // TODO: handle notification

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

  useEffect(() => {
    const authItem = getItem(localStorageAuthKey);
    if (!authItem) return setIsAuthenticated(false);
    if (authItem) return setIsAuthenticated(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
