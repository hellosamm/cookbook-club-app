import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { viewSingleEventApi } from "../apis/events";

const ViewSingleEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      const [result] = await viewSingleEventApi(id);
      setEvent(result.data);
      setMessage(result.message);
    };

    fetchEvent();
  }, []);

  // const allEvents = events.map((event) => (
  //   <div id={event.id} key={event.id}>
  //     <div className="block  bg-ivory text-black rounded-sm py-1 px-2 hover:bg-black hover:text-white  ">
  //       <Link to={`/${event.title.replace(/\s+/g, "-")}`}>{event.title}</Link>
  //     </div>
  //   </div>
  // ));

  // const noEvents = (
  //   <div>
  //     <p>no events available</p>
  //   </div>
  // );

  return (
    <div>
      <h1>{event.title}</h1>
      <div className="flex justify-start">
        <p className="m-2">@{event.location}</p>
        <p className="m-2">|</p>
        <p className="m-2">{event.start_time}</p>
        <p className="m-2">|</p>
        <button className="bg-black text-white rounded-full px-6 m-2">
          RSVP
        </button>
      </div>
      <p className="m-2">{event.description}</p>
    </div>
  );
};

export default ViewSingleEvent;
