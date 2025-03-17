import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { checkUserRSVP, viewSingleEventApi } from "../../apis/events";
import {
  attendeeSignUp,
  cancelSignUp,
  showEventAttendees,
} from "../../apis/attendees";

import useAuth from "../../hooks/useAuth";
import styles from "../../style/SingleEvent.module.css";

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
    <div id={attendee.user_id} key={attendee.user_id} className="flex ">
      <p>@{attendee.first_name || "anonymous user"}</p>
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
    <div className={styles.fullPage}>
      {/* <Link to={"/allEvents"}>back</Link> */}
      <div className={styles.image}></div>
      <div className={styles.eventCard}>
        <div className={styles.header}>
          <h1>{event.title}</h1>
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
                id="button-2"
              >
                edit
              </button>
            ) : rsvpStatus.attending ? (
              <button onClick={handleCancelSignUp} id="button-2">
                cancel rsvp
              </button>
            ) : rsvpStatus.attending === false ? (
              <button onClick={handleSignUp} id="button-2">
                rsvp
              </button>
            ) : (
              <button onClick={() => navigate("/login")} id="button-2">
                sign in to rsvp
              </button>
            )}
          </div>
        </div>
        <div className={styles.allEventDetails}>
          <div className={styles.leftColumn}>
            <div className={styles.singleDetail}>
              <h2>Location</h2>
              <p>@{event.location}</p>
            </div>
            <div className={styles.singleDetail}>
              <h2>Time</h2>
              <p className="m-2">
                {event.start_time} - {event.end_time}
              </p>
            </div>

            {/* {authToken && (
              <button
                onClick={handleSignUp}
                className="bg-black text-white rounded-full px-6 m-2"
              >
                {isAttending ? "Cancel RSVP" : "RSVP"}
              </button>
            )} */}
            <div className={styles.singleDetail}>
              <h2>Description</h2>
              <p className="m-2">{event.description}</p>
            </div>
          </div>
          <div className={styles.rightColumn}>
            {authToken ? (
              <div className={styles.singleDetail}>
                <div className={styles.sideBySide}>
                  <h2>Attending</h2>
                  <p>({currentAttendees.length})</p>
                </div>
                <p>{allAttendees}</p>
              </div>
            ) : currentAttendees.length < 1 ? (
              <div className={styles.attendingCard}>
                <h2>Attending</h2>
                <p>nobody has RSVP'd up yet</p>
              </div>
            ) : currentAttendees.length === 1 ? (
              <div>
                <h2>Attending</h2>
                <p>1 person has signed up</p>
              </div>
            ) : (
              <div className={styles.attendingCard}>
                <h2>Attending</h2>
                <p>{currentAttendees.length} people have signed up</p>
              </div>
            )}
          </div>
          {successMessage && <p className={styles.errors}>*{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ViewSingleEvent;
