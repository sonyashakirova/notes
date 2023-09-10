import { User as FirebaseUser } from "firebase/auth";

export interface IRegisterData {
  email: string;
  password: string;
  name: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export type RegisterFunc = (
  data: IRegisterData,
  callback: () => void,
  onError: (error?: string) => void
) => void;

export type LoginFunc = (
  data: ILoginData,
  callback: () => void,
  onError: (error?: string) => void
) => void;

export type LogoutFunc = () => void;

export interface IAuthContext {
  user?: FirebaseUser | null;
  register: RegisterFunc;
  login: LoginFunc;
  logout: LogoutFunc;
}
