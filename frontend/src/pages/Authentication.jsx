import { React, useState } from "react";
import PropTypes from "prop-types";
import { validateEmail, validatePassword } from "../utilites/validations";
import { Link } from "react-router-dom";

const initialErrorsState = {
  email: "",
  password: "",
  api: "",
};

const Authentication = ({ pageType }) => {
  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(initialErrorsState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted info:", formData);

    const newErrors = { ...initialErrorsState };

    if (!validateEmail(formData.email)) {
      //show error
      newErrors.email = "invalid email";
    }

    if (!validatePassword(formData.password)) {
      //show error
      newErrors.password = "invalid password";
    }

    setErrors(newErrors);

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("API Response:", result);
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        api: "failed to submit data, try again",
      }));
      console.error("api error", error);
    }
  };

  return (
    <div>
      {pageType === PageType.LOGIN ? "login or " : "register or "}

      {pageType === PageType.LOGIN ? (
        <Link to="/register" className="hover:text-blue-700">
          create an account
        </Link>
      ) : (
        <Link to="/login" className="hover:text-blue-700">
          already have an account, login
        </Link>
      )}

      <div className="flex">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div>
            <input
              name="email"
              type="email"
              placeholder="enter email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">invalid email</p>
            )}
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="enter password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">invalid password</p>
            )}
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
