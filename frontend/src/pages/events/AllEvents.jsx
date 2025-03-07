import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewAllEventsApi } from "../../apis/events";

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
      <div className="flex justify-between items-center">
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
      <div>
        <div>{events.length > 0 ? allEvents : noEvents}</div>
      </div>
    </div>
  );
};

export default AllEvents;
