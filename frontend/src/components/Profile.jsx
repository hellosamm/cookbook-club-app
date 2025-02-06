import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUserData } = useAuth();
  const [formData, setFormData] = useState({
    firstName: currentUserData.first_name || "",
    lastName: currentUserData.last_name || "",
    email: currentUserData.email || "",
    username: currentUserData.username || "",
    bio: currentUserData.bio || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    //make api call, update the currentUserData with the formData
    // return the updated data to check that it was successful
    //
  };

  return (
    <div>
      <h1>manage your account</h1>
      <div className="flex">
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <p>email</p>
            <input
              name="email"
              type="email"
              placeholder="email"
              value={currentUserData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-5">
            <p>first name</p>
            <input
              name="first_name"
              type="first_name"
              placeholder="first name"
              value={currentUserData.first_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-5">
            <p>last name</p>
            <input
              name="last_name"
              type="last_name"
              placeholder="last name"
              value={currentUserData.last_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-5">
            <p>username</p>
            <input
              name="username"
              type="username"
              placeholder="username"
              value={currentUserData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-5">
            <p>bio</p>
            <textarea
              name="bio"
              type="bio"
              placeholder="bio"
              value={currentUserData.bio}
              onChange={handleInputChange}
              style={{ width: "500px", height: "100px" }}
            />
          </div>
          <button
            type="submit"
            className="black white rounded-sm py-1 px-2 hover:bg-black hover:text-white"
          >
            save profile
          </button>
        </form>
      </div>

      <h1>manage your events</h1>
      <div className="flex items-center">
        <p>event name</p>
        <p className="m-2">|</p>
        <Link to="" className="bg-black text-white  rounded-full px-4 text-sm">
          edit event
        </Link>
      </div>
      <h1>upcoming events</h1>
      <div className="flex ">
        <p className="mr-7">event name</p>
        <p className="mx-2">|</p>
        <p>event date</p>
      </div>
    </div>
  );
};

export default Profile;
