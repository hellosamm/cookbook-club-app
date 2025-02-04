import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { createEventApi } from "../apis/events";

import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

// const initialErrorsState = {
//   title: "",

// }

const defaultFormData = {
  title: "",
  description: "",
  start_time: "",
  end_time: "",
};

const AddEvent = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [date, setDate] = useState(null);

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

    formatForRails(date, startTime, endTime);

    const [result, error] = await createEventApi({
      event: formData,
    });

    console.log("result:", result);
    console.log("error:", error);
  };

  const formatForRails = (date, startTime, endTime) => {
    const formattedStartTime = new Date(`${date} ${startTime}`).toISOString();
    const formattedEndTime = new Date(`${date} ${endTime}`).toISOString();

    console.log(formattedStartTime);
    console.log(formattedEndTime);

    setFormData((prevData) => ({
      ...prevData,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
    }));
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
