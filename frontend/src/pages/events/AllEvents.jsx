import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewAllEventsApi } from "../../apis/events";
// import "../../style/AllEvents.css";
import styles from "../../style/AllEvents.module.css";
import "../../App.css";
import { formatDateTime } from "../../utilites/formatDateTime";

const AllEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      const [result] = await viewAllEventsApi();

      const formattedEvent = result.map((event) => ({
        ...event,
        formattedTime: formatDateTime(event.start_time, event.end_time),
      }));

      setEvents(formattedEvent);
    };

    fetchAllEvents();
  }, []);

  const allEvents = events.map((event) => (
    <div className={styles.eventCard} id={event.id} key={event.id}>
      <Link to={`/${event.title.replace(/\s+/g, "-")}/event/${event.id}`}>
        <div className={styles.imageContainer}></div>
        <div className={styles.individualEvent}>
          <div>
            <p className={styles.title}>{event.title}</p>
          </div>
          <div className={styles.dateTime}>
            {/* <p>thursday, month 9th | 4:30 pm</p> */}
            <p>
              {event.formattedTime.formattedDate} |{" "}
              {event.formattedTime.formattedStartTime}
            </p>
          </div>
          <p>{event.location}</p>
          <p className={styles.attending}>6 attending</p>
        </div>
      </Link>
    </div>
  ));

  const noEvents = (
    <div>
      <p>no events available</p>
    </div>
  );

  return (
    <div className={styles.fullPage}>
      <div className={styles.header}>
        <h1>upcoming events</h1>
        <div>
          <Link to="/createEvent" id="button-2">
            create an event
          </Link>
        </div>
      </div>

      <div className={styles.allEvents}>
        {events.length > 0 ? allEvents : noEvents}{" "}
      </div>
    </div>
  );
};

export default AllEvents;
