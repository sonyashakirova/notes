import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Note = lazy(() => import("pages/note"));

export const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Note />} />
    </Routes>
  );
};
