import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext } from "react";
import { auth } from "shared/config/firebase";
import { IAuthContext, LoginFunc, LogoutFunc, RegisterFunc } from "./types";

// @ts-ignore
export const AuthContext = createContext<IAuthContext>();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const register: RegisterFunc = async (data, callback, onError) => {
  try {
    await createUserWithEmailAndPassword(auth, data.email, data.password);
    // @ts-ignore
    await updateProfile(auth.currentUser, { displayName: data.name });
    callback();
  } catch (error) {
    // @ts-ignore
    onError(error.message);
  }
};

export const login: LoginFunc = async (data, callback, onError) => {
  try {
    await signInWithEmailAndPassword(auth, data.email, data.password);
    callback();
  } catch (error) {
    // @ts-ignore
    onError(error.message);
  }
};

export const logout: LogoutFunc = async () => {
  await signOut(auth);
};
