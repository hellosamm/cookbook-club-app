import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewAllEventsApi } from "../../apis/events";
// import "../../style/AllEvents.css";
import styles from "../../style/AllEvents.module.css";
import "../../App.css";
import { formatDateTime } from "../../utilites/formatDateTime";
import { fetchAttendees } from "../../utilites/fetchAttendees";
import useAuth from "../../hooks/useAuth";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState({});
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchAllEvents = async () => {
      const [result] = await viewAllEventsApi();

      const formattedEvent = result.map((event) => ({
        ...event,
        formattedTime: formatDateTime(event.start_time, event.end_time),
      }));

      const attendeesData = await Promise.all(
        result.map(async (event) => {
          const attendeesList = await fetchAttendees(authToken, event.id);
          return {
            id: event.id,
            count: Array.isArray(attendeesList) ? attendeesList.length : 0,
          };
        })
      );

      const attendeesObject = attendeesData.reduce((acc, { id, count }) => {
        acc[id] = count;
        return acc;
      }, {});

      //   for (const event of result) {
      //     const attendeeCount = await fetchAttendees(authToken, id);
      //     attendeesData[event.id] = attendeeCount;
      //   }
      setAttendees(attendeesObject);

      setEvents(formattedEvent);
    };

    fetchAllEvents();
  }, [authToken]);

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
          <p className={styles.attending}>{attendees[event.id]} attending</p>
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
