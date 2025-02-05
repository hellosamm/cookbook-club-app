import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewAllEventsApi } from "../apis/events";

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
      <div className="block  bg-ivory text-black rounded-sm py-1 px-2 hover:bg-black hover:text-white  ">
        <Link to={`/${event.title.replace(/\s+/g, "-")}/event/${event.id}`}>
          {event.title}
        </Link>
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
        <p>this is a page to view all the events</p>
        <Link to="/createEvent">create an event</Link>
      </div>
      <div>{events.length > 0 ? allEvents : noEvents}</div>
    </div>
  );
};

export default AllEvents;
