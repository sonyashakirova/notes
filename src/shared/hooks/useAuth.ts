import { createContext, useContext } from "react";
import { User as FirebaseUser } from "firebase/auth";

interface IAuthContext {
  user?: FirebaseUser | null;
  logout: () => void;
}

// @ts-ignore
export const AuthContext = createContext<IAuthContext>();

export const useAuth = () => {
  return useContext(AuthContext);
};
