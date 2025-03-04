import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkUserRSVP, viewSingleEventApi } from "../../apis/events";
import {
  attendeeSignUp,
  cancelSignUp,
  showEventAttendees,
} from "../../apis/attendees";
import useAuth from "../../hooks/useAuth";

const ViewSingleEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUserData, authToken } = useAuth();
  const [event, setEvent] = useState([]);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // const [isAttending, setIsAttending] = useState(false);
  // const [isCreator, setIsCreator] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState({
    attending: null,
    creator: null,
  });
  const [currentAttendees, setCurrentAttendees] = useState([]);

  // useEffect(() => {
  //   const fetchEvent = async () => {
  //     const [result] = await viewSingleEventApi(id);
  //     setEvent(result.data);
  //     setMessage(result.message);
  //   };

  //   fetchEvent();
  //   if (authToken) {
  //     const fetchRSVPStatus = async () => {
  //       const [status] = await checkUserRSVP(authToken, id);
  //       console.log(rsvpStatus);
  //       setRsvpStatus(status);
  //     };
  //     fetchRSVPStatus();
  //   }
  // }, [id, authToken]);

  useEffect(() => {
    fetchEvent();
    fetchRSVPStatus();
    fetchAttendees();
  }, [id, authToken]);

  useEffect(() => {
    console.log("updated attendees array:", currentAttendees);
  }, [currentAttendees]);

  const fetchEvent = async () => {
    const [result] = await viewSingleEventApi(id);
    setEvent(result.data);
    setMessage(result.message);
  };

  const fetchRSVPStatus = async () => {
    if (!authToken) return;

    const [status] = await checkUserRSVP(authToken, id);
    console.log(status);
    setRsvpStatus(status);
  };

  const fetchAttendees = async () => {
    const result = await showEventAttendees(authToken, id);
    console.log("result", result);
    console.log(result.length);
    // const attendeesArray = result || [];
    setCurrentAttendees(result[0]);
    console.log("currentAttendees array", currentAttendees);
  };

  const handleSignUp = async () => {
    const [result] = await attendeeSignUp(authToken, id);

    console.log(result);
    setSuccessMessage(result.message);
    fetchRSVPStatus();
  };

  const handleCancelSignUp = async () => {
    const [result] = await cancelSignUp(authToken, id);
    console.log(result);
    setSuccessMessage(result.message);
    fetchRSVPStatus();
  };

  const allAttendees = currentAttendees.map((attendee) => (
    <div id={attendee.user_id} className="flex ">
      <p>{attendee.first_name || "anonymous user"}</p>
    </div>
  ));

  // const allEvents = userEvents.map((event) => (
  //   <div id={event.id} key={event.id} className="flex ">
  //     <Link
  //       to={`/update/${event.title.replace(/\s+/g, "-")}/event/${event.id}`}
  //     >
  //       {event.title}
  //     </Link>
  //     <p className="mx-2">|</p>
  //     <p>{event.start_time}</p>
  //   </div>
  // ));

  // const noAttendees = (
  //   <div>
  //     <p>you don't have any upcoming events</p>
  //   </div>
  // );

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
        {/* {authToken && (
          <button
            onClick={handleSignUp}
            className="bg-black text-white rounded-full px-6 m-2"
          >
            {isAttending ? "Cancel RSVP" : "RSVP"}
          </button>
        )} */}

        <div>
          {rsvpStatus.creator ? (
            <button
              onClick={() =>
                navigate(
                  `/update/${event.title.replace(/\s+/g, "-")}/event/${
                    event.id
                  }`
                )
              }
              className="bg-black text-white rounded-full px-6 m-2"
            >
              edit
            </button>
          ) : rsvpStatus.attending ? (
            <button
              onClick={handleCancelSignUp}
              className="bg-black text-white rounded-full px-6 m-2"
            >
              cancel rsvp
            </button>
          ) : rsvpStatus.attending === false ? (
            <button
              onClick={handleSignUp}
              className="bg-black text-white rounded-full px-6 m-2"
            >
              rsvp
            </button>
          ) : (
            <button
              onClick={() => navigate("login")}
              className="bg-black text-white rounded-full px-6 m-2"
            >
              sign in to rsvp
            </button>
          )}
        </div>
      </div>
      <div>
        <p className="m-2">{event.description}</p>
      </div>

      {/* {<div>{currentAttendees.length > 0 ? allAttendees : "no attendees"}</div>} */}
      {currentAttendees.length < 1 ? (
        <p>nobody has RSVP'd up yet</p>
      ) : currentAttendees.length === 1 ? (
        <p>1 person has signed up</p>
      ) : (
        <p>{currentAttendees.length} people have signed up</p>
      )}
    </div>
  );
};

export default ViewSingleEvent;
