import { React, useState } from "react";
import PropTypes from "prop-types";

const Authentication = ({ pageType }) => {
  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email: ", formData.email);
    console.log("password: ", formData.password);
  };

  return (
    <div>
      {pageType === PageType.LOGIN ? "login" : "register"}

      <div className="flex">
        <form onSubmit={handleSubmit}>
          <div>
            <h2>email address</h2>
            <input
              name="email"
              type="email"
              placeholder="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <h2>password</h2>
            <input
              name="password"
              type="password"
              placeholder="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="bg-ivory text-black rounded-sm py-1 px-2 hover:bg-black hover:text-white"
          >
            {pageType === PageType.LOGIN ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

Authentication.propTypes = {
  pageType: PropTypes.number.isRequired,
};

export const PageType = Object.freeze({
  LOGIN: 0,
  REGISTER: 1,
});

export default Authentication;
