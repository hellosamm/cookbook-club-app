import { React, useState } from "react";
import PropTypes from "prop-types";
import { validateEmail, validatePassword } from "../utilites/validations";
import { Link } from "react-router-dom";
import { registerApi } from "../apis/authentication";

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

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      console.log("validation failed, aborted API call");
      console.log("validation errors:", newErrors);
      console.log("current errors state:", errors);

      return;
    }

    // if (pageType === PageType.LOGIN) {
    //   //Login api call
    // } else {
    //   registerApi({
    //     user: {
    //       email: formData.email,
    //       password: formData.password,
    //     },
    //   });
    // }

    if (pageType === PageType.LOGIN) {
      //Login api call
    } else {
      const [result, error] = await registerApi({
        user: formData,
      });
      console.log("result: ", result);
      console.log("error: ", error);
    }
  };

  return (
    <div>
      {pageType === PageType.LOGIN ? "login" : "register"}

      {pageType === PageType.LOGIN ? (
        <p className="mt-4">
          or,
          <Link to="/register" className="hover:text-blue-700">
            create an account
          </Link>
        </p>
      ) : (
        <p className="mt-4">
          already a user?
          <Link to="/login" className="hover:text-blue-700">
            login
          </Link>
        </p>
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
