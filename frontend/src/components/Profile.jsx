import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, Outlet } from "react-router-dom";
import { editUserApi } from "../apis/authentication";
import styles from "../../src/style/Profile.module.css";

const initialMessageState = "";

const Profile = () => {
  return (
    <div className={styles.fullPage}>
      <div className={styles.header}>
        <div className={styles.tab}>
          <Link to="/profile/manageAccount" className={styles.tab}>
            <h2>Manage Your Account</h2>
          </Link>
        </div>
        <div className={styles.tab}>
          <Link to="/profile/manageEvents" className={styles.tab}>
            <h2>Manage Your Events</h2>
            <p>(events you created)</p>
          </Link>
        </div>
        <div className={styles.tab}>
          <Link to="/profile/upcomingEvents">
            <h2>Upcoming Events</h2>
            <p>(events you RSVP'd to)</p>
          </Link>
        </div>
      </div>
      <div className={styles.body}>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
