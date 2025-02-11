import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { viewSingleEventApi } from "../../apis/events";
import { attendeeSignUp } from "../../apis/attendees";
import useAuth from "../../hooks/useAuth";

const ViewSingleEvent = () => {
  const { id } = useParams();
  const { currentUserData, authToken } = useAuth();
  const [event, setEvent] = useState([]);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      const [result] = await viewSingleEventApi(id);
      setEvent(result.data);
      setMessage(result.message);
    };

    fetchEvent();
  }, []);

  const handleSignUp = async () => {
    const [result] = await attendeeSignUp(authToken, id);

    console.log(result);
    setSuccessMessage(result.message);
  };

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
      {successMessage && (
        <p className="text-red-600 text-sm mt-1">{successMessage}</p>
      )}
      <h1>{event.title}</h1>
      <div className="flex justify-start">
        <p className="m-2">@{event.location}</p>
        <p className="m-2">|</p>
        <p className="m-2">{event.start_time}</p>
        <p className="m-2">|</p>
        <button
          onClick={handleSignUp}
          className="bg-black text-white rounded-full px-6 m-2"
        >
          RSVP
        </button>
      </div>
      <p className="m-2">{event.description}</p>
    </div>
  );
};

export default ViewSingleEvent;
