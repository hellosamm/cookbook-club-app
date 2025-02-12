import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { viewSingleEventApi } from "../../apis/events";

const UpdateEvent = () => {
  const event = useParams();
  const [formData, setFormData] = useState();

  useEffect(() => {
    const fetchEvent = async () => {
      const [result] = await viewSingleEventApi(event.id);
      setFormData(result.data);
      console.log(result.data);
    };
    fetchEvent();
  }, []);

  // const handleInputChange (e) => {

  // }

  return (
    <div>
      <h1>edit</h1>
      <p>{event.id}</p>
      <p>{event.title}</p>
      <form action="">
        {/* <div className="my-5">
          <p>last name</p>
          <input
            name="last_name"
            type="last_name"
            placeholder="last name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </div> */}
        <div className="my-5">
          <p>title</p>
          <input
            name="title"
            type="text"
            // placeholder="title"
            value={formData.title}
            // onChange={handleInputChange}
          />
        </div>
        <div className="my-5">
          <p>description</p>
          <input
            name="description"
            type="text"
            // placeholder="title"
            value={formData.description}
            // onChange={handleInputChange}
          />
        </div>
        <div className="my-5">
          <p>location</p>
          <input
            name="location"
            type="text"
            // placeholder="title"
            value={formData.location}
            // onChange={handleInputChange}
          />
        </div>
        <div className="my-5">
          <p>date</p>
          <input
            name="date"
            type="text"
            // placeholder="title"
            value=""
            // onChange={handleInputChange}
          />
        </div>
        <div className="my-5">
          <p>start time</p>
          <input
            name="start time"
            type="text"
            // placeholder="title"
            value={""}
            // onChange={handleInputChange}
          />
        </div>
        <div className="my-5">
          <p>end time</p>
          <input
            name="end time"
            type="text"
            // placeholder="title"
            value={""}
            // onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateEvent;
