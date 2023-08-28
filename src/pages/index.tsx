import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "shared/ui";

const Register = lazy(() => import("pages/register"));
const Login = lazy(() => import("pages/login"));
const Note = lazy(() => import("pages/note"));

export const Pages = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Note />} />
      </Route>
    </Routes>
  );
};
