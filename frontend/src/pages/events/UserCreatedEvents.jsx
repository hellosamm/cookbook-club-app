import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewAllEventsApi } from "../../apis/events";
import useAuth from "../../hooks/useAuth";

export default function UserCreatedEvents() {
  const [events, setEvents] = useState([]);
  const { currentUserData, authToken } = useAuth();

  useEffect(() => {
    const fetchAllEvents = async () => {
      const [result] = await viewAllEventsApi();

      setEvents(result);
    };

    fetchAllEvents();
  }, []);

  const userCreatedEvents = events.filter(
    (event) => event.user_id === currentUserData.id
  );

  // const userCreatedEvents.sort((a, b) => new Date(b.date) - new Date(a.date))

  const displayEvents = userCreatedEvents.map((event) => (
    <div id={event} key={event}>
      <Link to={`/${event.title.replace(/\s+/g, "-")}/event/${event.id}`}>
        <div>
          <div className="image-container"></div>
          <div className="individual-event">
            <div className="event-name">
              <p className="title">{event.title}</p>
            </div>
            <div className="date-time">
              <p>thursday, month 9th | 4:30 pm</p>
            </div>
            <p>{event.location}</p>
            <p className="attending">6 attending</p>
          </div>
        </div>
      </Link>
    </div>
  ));

  const noEvents = (
    <div>
      <p>you do not have any events</p>
    </div>
  );

  return (
    <div>
      <h1>manage your events</h1>
      <div>
        <div>{userCreatedEvents.length > 0 ? displayEvents : noEvents}</div>
      </div>
    </div>
  );
}

//
