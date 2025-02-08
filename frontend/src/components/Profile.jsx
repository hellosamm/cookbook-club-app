import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, Outlet } from "react-router-dom";
import { editUserApi } from "../apis/authentication";

const initialMessageState = "";

const Profile = () => {
  return (
    <div>
      <div>
        <Link to="/manageAccount">
          <h1>manage your account</h1>
        </Link>
        <Link to="/manageEvents">
          <h1>manage your events</h1>
        </Link>
        <Link to="/upcomingEvents">
          <h1>upcoming events</h1>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
