import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewAllEventsApi } from "../../apis/events";
import "../../style/AllEvents.css";

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
    <div>
      <div>
        <div>
          <h1>upcoming events</h1>
        </div>
        <div>
          <Link
            to="/createEvent"
            className="mt-8 border border-black rounded-full px-6 m-2 py-1 hover:bg-white"
          >
            create an event
          </Link>
          <Link className="mt-8 border border-black rounded-full px-6 m-2 py-1 hover:bg-white">
            view past events
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
