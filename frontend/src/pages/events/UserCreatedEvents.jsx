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

  const displayEvents = userCreatedEvents
    // .sort((a, b) => new Date(b.start_time) - new Date(a.start_time))
    .map((event) => (
      <div id={event.id} key={event.id} className="flex items-center">
        <Link>{event.title}</Link>

        <p className="m-2">|</p>
        <Link
          to={`/update/${event.title.replace(/\s+/g, "-")}/event/${event.id}`}
          className="bg-white text-black rounded-full px-4 text-sm hover:bg-black
        hover:text-white"
        >
          {" "}
          edit event
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
