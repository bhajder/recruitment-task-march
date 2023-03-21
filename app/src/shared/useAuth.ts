import { useState } from "react";
import bcrypt from "bcryptjs";
import { AuthPayload } from "../models/Auth";
import { getUser } from "./databaseService";
import { useNavigate } from "react-router-dom";
import { Paths } from "../Router";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = async ({ username, password }: AuthPayload) => {
    const user = await getUser(username);
    if (!user) return console.log("no user");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return setIsAuthenticated(false);

    navigate(Paths.panel);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
};

export default useAuth;
