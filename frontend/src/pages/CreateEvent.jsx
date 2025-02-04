import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { createEventApi } from "../apis/events";
import useAuth from "../hooks/useAuth";

import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

// const initialErrorsState = {
//   title: "",

// }

const defaultFormData = {
  title: "",
  location: "",
  description: "",
};

const AddEvent = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [date, setDate] = useState(null);
  const { loggedIn, authToken } = useAuth();

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
      return;
    }

    const formattedData = {
      ...formData,
      start_time: new Date(`${date} ${startTime}`).toISOString(),
      end_time: new Date(`${date} ${endTime}`).toISOString(),
    };

    console.log("formattedData:", formattedData);
    console.log("formData", formData);

    const [result, error] = await createEventApi(authToken, formattedData);

    console.log("result:", result);
    console.log("error:", error);
  };

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      console.log(formattedDate);
      setDate(formattedDate);

      // setSelectedDate((prevState) => ({
      //   ...prevState,
      // }));
      setSelectedDate(date);
    }
  };

  // const handleStartTime = (time) => {
  //   setStartTime(time);
  // };

  // const handleEndTime = (time) => {
  //   setEndTime(time);
  // };

  return (
    <div>
      <p>add an event on this page</p>

      <div className="flex">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div>
            <p>event title</p>
            <input
              name="title"
              type="title"
              placeholder="event title"
              value={formData.title}
              onChange={handleInputChange}
            />
            {/* {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )} */}
          </div>

          <div>
            <p>event location</p>
            <input
              name="location"
              type="location"
              placeholder="event location"
              value={formData.location}
              onChange={handleInputChange}
            />
            {/* {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )} */}
          </div>

          <div>
            <p>description</p>
            <input
              name="description"
              type="description"
              placeholder="description of your event"
              value={formData.description}
              onChange={handleInputChange}
            />
            {/* {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
            {errors.login && (
              <p className="text-red-600 text-sm mt-1">{errors.login}</p>
            )} */}
          </div>
          <div>
            <p>date</p>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyy-MM-dd"
              minDate={new Date()}
              placeholderText="select a date"
            />
          </div>

          <div>
            <p>start time</p>
            <TimePicker
              onChange={setStartTime}
              value={startTime}
              format="hh:mm a"
              disableClock={true}
            />
          </div>

          <div>
            <p>end time</p>
            <TimePicker
              onChange={setEndTime}
              value={endTime}
              format="hh:mm a"
              disableClock={true}
            />
          </div>

          <button
            type="submit"
            className="bg-ivory text-black rounded-sm py-1 px-2 hover:bg-black hover:text-white"
          >
            save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
