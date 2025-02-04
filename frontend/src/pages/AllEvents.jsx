import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewAllEventsApi } from "../apis/events";

const AllEvents = () => {
  const [events, setEvents] = useState([]);

  // const allRecipes = async (e) => {
  //   e.preventDefault();
  //   console.log(formData);

  //   if (!date || !startTime || !endTime) {
  //     console.error("Missing required field");
  //     setErrors("Missing required field");
  //     return;
  //   }

  //   const formattedData = {
  //     ...formData,
  //     start_time: new Date(`${date} ${startTime}`).toISOString(),
  //     end_time: new Date(`${date} ${endTime}`).toISOString(),
  //   };

  //   const [result, error] = await createEventApi(authToken, formattedData);

  //   console.log("result:", result);
  //   console.log("error:", error.message);

  //   handleResponse([result, error]);
  // };

  useEffect(() => {
    const fetchAllEvents = async () => {
      const [result] = await viewAllEventsApi();
      setEvents(result);
    };

    fetchAllEvents();
  }, []);

  const allEvents = events.map((event, index) => (
    <div key={index}>
      <div className="block  bg-ivory text-black rounded-sm py-1 px-2 hover:bg-black hover:text-white  ">
        <Link to={`/event/${event.index}`}>{event.title}</Link>
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
