import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { createEventApi } from "../../apis/events";
import useAuth from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "../../App.css";
import styles from "../../style/CreateEvent.module.css";

// const initialErrorsState = {
//   title: "",

// }

const defaultFormData = {
  title: "",
  location: "",
  description: "",
};

const initialErrorsState = "";

const AddEvent = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [date, setDate] = useState(null);
  const [errors, setErrors] = useState(initialErrorsState);
  const { loggedIn, authToken } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (!date || !startTime || !endTime) {
      console.error("Missing required field");
      setErrors("Missing required field");
      return;
    }

    const formattedData = {
      ...formData,
      start_time: new Date(`${date} ${startTime}`).toISOString(),
      end_time: new Date(`${date} ${endTime}`).toISOString(),
    };

    const [result, error] = await createEventApi(authToken, formattedData);

    console.log("result:", result);
    console.log("error:", error.message);

    handleResponse([result, error]);
  };

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      console.log(formattedDate);
      setDate(formattedDate);

      setSelectedDate(date);
    }
  };

  const handleResponse = ([result, error]) => {
    console.log("result: ", result);

    if (error) {
      console.log("error: ", error);
      setErrors(error.message);
    }

    if (result && !error) {
      navigate("/allEvents");
    }
  };

  return (
    <div>
      <div className={styles.fullPage}>
        <div className={styles.header}>
          <div className={styles.leftHeader}>
            <Link to={"/Profile"}>back</Link>
            <h1>Create Event</h1>
          </div>
          <button type="submit" id="button-2" onClick={handleSubmit}>
            save
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputBlock}>
            <h2>Event Title</h2>
            <input
              name="title"
              type="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleInputChange}
              className={styles.inputField}
            />
            {/* {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )} */}
          </div>

          <div className={styles.inputBlock}>
            <div>
              <h2>Event Location</h2>
              <p>provide the address for event attendees</p>
            </div>
            <input
              name="location"
              type="location"
              placeholder="Event Location"
              value={formData.location}
              onChange={handleInputChange}
              className={styles.inputField}
            />
            {/* {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )} */}
          </div>

          <div className={styles.inputBlock}>
            <div>
              <h2>Description</h2>
              <p>
                provide a short description about the theme and event details
              </p>
            </div>
            <input
              name="description"
              type="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className={styles.inputField}
            />
            {/* {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
            {errors.login && (
              <p className="text-red-600 text-sm mt-1">{errors.login}</p>
            )} */}
          </div>
          <div className={styles.inputBlock}>
            <h2>Date</h2>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyy-MM-dd"
              minDate={new Date()}
              placeholderText="Select a Date"
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputBlock}>
            <h2>Start Time</h2>
            <TimePicker
              onChange={setStartTime}
              value={startTime}
              format="hh:mm a"
              disableClock={true}
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputBlock}>
            <h2>End Time</h2>
            <TimePicker
              onChange={setEndTime}
              value={endTime}
              format="hh:mm a"
              disableClock={true}
              className={styles.inputField}
            />
          </div>
        </form>
        {errors && <p className={styles.errors}>*{errors}</p>}
      </div>
    </div>
  );
};

export default AddEvent;
