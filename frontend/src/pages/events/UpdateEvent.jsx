import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { viewSingleEventApi } from "../../apis/events";
import { Link } from "react-router-dom";
import styles from "../../style/CreateEvent.module.css";

const UpdateEvent = () => {
  const event = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchEvent = async () => {
      const [result] = await viewSingleEventApi(event.id);

      setFormData(result.data);
    };
    fetchEvent();
  }, [event.id]);

  // const handleInputChange (e) => {

  // }

  return (
    <div className={styles.fullPage}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <Link to={`/${event}/event/${event.id}`}>back</Link>
          <h1>{event.title}</h1>
        </div>
        <button type="submit" id="button-2">
          save
        </button>
      </div>
      <form action="" className={styles.form}>
        {/* <div className="my-5">
          <p>last name</p>
          <input
            name="last_name"
            type="last_name"
            placeholder="last name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </div> */}
        <div className={styles.inputBlock}>
          <h2>Event Title</h2>
          <input
            name="title"
            type="text"
            // placeholder="title"
            value={formData.title}
            className={styles.inputField}
            // onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputBlock}>
          <div>
            <h2>Event Location</h2>
            <p>provide the address for event attendees</p>
          </div>
          <input
            name="location"
            type="text"
            // placeholder="title"
            value={formData.location}
            className={styles.inputField}
            // onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputBlock}>
          <h2>Description</h2>
          <input
            name="description"
            type="text"
            // placeholder="title"
            value={formData.description}
            className={styles.inputField}
            // onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputBlock}>
          <h2>Date</h2>
          <input
            name="date"
            type="text"
            // placeholder="title"
            value=""
            className={styles.inputField}
            // onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputBlock}>
          <h2>End Time</h2>
          <input
            name="start time"
            type="text"
            // placeholder="title"
            value={""}
            className={styles.inputField}
            // onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputBlock}>
          <h2>End Time</h2>
          <input
            name="end time"
            type="text"
            // placeholder="title"
            value={""}
            className={styles.inputField}
            // onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateEvent;
