import React, { useState, useEffect } from "react";
import { showUserEvents } from "../../apis/attendees";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const ViewUpcomingEvents = () => {
  const { authToken } = useAuth();
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const fetchUserEvents = async () => {
      const [result] = await showUserEvents(authToken);

      setUserEvents(result.data);
    };

    fetchUserEvents();
  }, []);

  const allEvents = userEvents.map((event) => (
    <div id={event.id} key={event.id} className="flex ">
      <Link
        to={`/update/${event.title.replace(/\s+/g, "-")}/event/${event.id}`}
      >
        {event.title}
      </Link>
      <p className="mx-2">|</p>
      <p>{event.start_time}</p>
    </div>
  ));

  const noEvents = (
    <div>
      <p>you don't have any upcoming events</p>
    </div>
  );

  return (
    // <div>
    //   <div className="flex ">
    //     <p className="mr-7">event name</p>
    //     <p className="mx-2">|</p>
    //     <p>event date</p>
    //   </div>
    // </div>
    <div>
      <h1>your upcoming events</h1>
      {<div>{allEvents.length > 0 ? allEvents : noEvents}</div>}
    </div>
  );
};

export default ViewUpcomingEvents;
