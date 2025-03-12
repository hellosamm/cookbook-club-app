import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, Outlet } from "react-router-dom";
import { editUserApi } from "../apis/authentication";
import styles from "../../src/style/Profile.module.css";

const initialMessageState = "";

const Profile = () => {
  return (
    <div className={styles.fullPage}>
      <div className={styles.leftColumn}>
        <Link to="/profile/manageAccount">
          <h2>manage your account</h2>
        </Link>
        <Link to="/profile/manageEvents">
          <h2>manage your events</h2>
        </Link>
        <Link to="/profile/upcomingEvents">
          <h2>upcoming events</h2>
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
