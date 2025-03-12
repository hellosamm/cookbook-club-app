import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewAllEventsApi } from "../../apis/events";
import "../../style/AllEvents.css";
import "../../App.css";

const AllEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      const [result] = await viewAllEventsApi();
      setEvents(result);
    };

    fetchAllEvents();
  }, []);

  const allEvents = events.map((event) => (
    <div id={event.id} key={event.id}>
      <div>
        <div className="image-container"></div>
        <div className="individual-event">
          <div className="event-name">
            <Link to={`/${event.title.replace(/\s+/g, "-")}/event/${event.id}`}>
              {event.title}
            </Link>
          </div>
          <div className="date-time">
            <p>thursday, month 9th | 4:30 pm</p>
          </div>
          <p>{event.location}</p>
          <p>6 attending</p>
        </div>
      </div>
    </div>
  ));

  const noEvents = (
    <div>
      <p>no events available</p>
    </div>
  );

  return (
    <div className="full-page">
      <div className="header">
        <h1>upcoming events</h1>
        <div>
          <Link to="/createEvent" id="button-2">
            create an event
          </Link>
        </div>
      </div>

      <div className="all-events">
        {events.length > 0 ? allEvents : noEvents}{" "}
      </div>
    </div>
  );
};

export default AllEvents;
