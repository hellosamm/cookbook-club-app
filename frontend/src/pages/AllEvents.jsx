import React from "react";
import { Link } from "react-router-dom";

const AllEvents = () => {
  return (
    <div>
      <p>this is a page to view all the events</p>
      <Link to="/createEvent">create an event</Link>
    </div>
  );
};

export default AllEvents;
