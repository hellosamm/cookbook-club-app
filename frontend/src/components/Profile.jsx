import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, Outlet } from "react-router-dom";
import { editUserApi } from "../apis/authentication";
import styles from "../../src/style/Profile.module.css";

const initialMessageState = "";

const Profile = () => {
  return (
    <div>
      <div className={styles.leftColumn}>
        <Link to="/profile/manageAccount">
          <h1>manage your account</h1>
        </Link>
        <Link to="/profile/manageEvents">
          <h1>manage your events</h1>
        </Link>
        <Link to="/profile/upcomingEvents">
          <h1>upcoming events</h1>
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
