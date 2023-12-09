import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../nav/navbar.component";

function MyLayout(props) {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default MyLayout;
