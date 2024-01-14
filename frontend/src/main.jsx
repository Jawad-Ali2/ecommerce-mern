import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar.jsx";
import "./index.css";
import router from "./routes/route.jsx";
import { Outlet, RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
