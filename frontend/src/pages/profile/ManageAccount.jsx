import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, Outlet } from "react-router-dom";
import { editUserApi } from "../../apis/authentication";

const initialMessageState = "";

export default function ManageAccount() {
  const { currentUserData, setCurrentUserData, authToken } = useAuth();
  const [message, setMessage] = useState(initialMessageState);
  const [formData, setFormData] = useState({
    first_name: currentUserData.first_name || "",
    last_name: currentUserData.last_name || "",
    // email: currentUserData.email || "",
    username: currentUserData.username || "",
    bio: currentUserData.bio || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //make api call, update the currentUserData with the formData
    // return the updated data to check that it was successful
    const [result, error] = await editUserApi(formData, authToken);

    console.log("result", result);
    // console.log("error", error);

    if (result) {
      setCurrentUserData(result); // Updates UI in memory
      localStorage.setItem("currentUserData", JSON.stringify(result.data)); // Saves to storage
    }

    setMessage(result.message);
  };

  return (
    <div>
      {message && <p className="text-red-600 text-sm mt-1">{message}</p>}
      <div className="flex">
        <form onSubmit={handleSubmit}>
          {/* <div className="my-5">
            <p>email</p>
            <input
              name="email"
              type="email"
              placeholder="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div> */}
          <div className="my-5">
            <p>first name</p>
            <input
              name="first_name"
              type="first_name"
              placeholder="first name"
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-5">
            <p>last name</p>
            <input
              name="last_name"
              type="last_name"
              placeholder="last name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-5">
            <p>username</p>
            <input
              name="username"
              type="username"
              placeholder="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-5">
            <p>bio</p>
            <textarea
              name="bio"
              type="bio"
              placeholder="bio"
              value={formData.bio}
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
    </div>
  );
}
