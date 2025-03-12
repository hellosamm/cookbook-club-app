import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { validateEmail, validatePassword } from "../utilites/validations";
import { Link, useNavigate } from "react-router-dom";
import { registerApi, loginApi } from "../apis/authentication";
import { useCookies } from "react-cookie";

const initialErrorsState = {
  email: "",
  password: "",
  login: "",
  api: "",
};

const defaultFormData = {
  email: "",
  password: "",
};

const Authentication = ({ pageType }) => {
  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState(initialErrorsState);
  const [cookies, setCookies] = useCookies(["jwt"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.authToken) {
      navigate("/");
    }
  }, []);

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
      newErrors.email = "invalid email";
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = "invalid password";
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      // console.log("validation failed, aborted API call");
      // console.log("validation errors:", newErrors);
      // console.log("current errors state:", errors);

      return;
    }

    if (pageType === PageType.LOGIN) {
      const [result, authToken, error] = await loginApi({
        user: formData,
      });

      // result = {message:" ", data:{}}
      // auth token = Bearer code or null
      // error -> "" || error message
      // console.log("result:", result);
      // console.log("authToken:", authToken);
      // console.log("error:", error);

      checkAuthToken(authToken, error);
      handleCurrentUserData(result);
      handleResponse([result, error]);
      checkForErrors([error]);
    } else {
      const [result, authToken, error] = await registerApi({
        user: formData,
      });

      // result = {message:" ", data:{}}
      // auth token = Bearer code or null
      // error -> "" || error message
      // console.log("result:", result);
      // console.log("authToken:", authToken);
      // console.log("error:", error);

      checkAuthToken(authToken, error);
      handleCurrentUserData(result);
      handleResponse([result, error]);
      checkForErrors([error.message]);
    }
  };

  const handleResponse = ([result, error]) => {
    console.log("result: ", result);

    if (error) {
      console.log("error: ", error);
    }

    if (result && !error) {
      navigate("/profile");
      window.location.reload();
    }
  };

  const checkAuthToken = (authToken, error) => {
    if (authToken) {
      console.log("token received, ", authToken);
      localStorage.setItem("authToken", authToken);

      setCookies("authToken", authToken);
      // console.log("cookies:", cookies.authToken);
    } else if (authToken == null) {
      console.error("failed to retrieve token:", error);
    }
  };

  const handleCurrentUserData = (result) => {
    console.log(result.data);
    localStorage.setItem("currentUserData", JSON.stringify(result.data));
  };

  const checkForErrors = (error) => {
    const newErrors = { ...initialErrorsState };

    if (error != "") {
      newErrors.login = Array.isArray(error) ? error[0] : error;
    }

    setErrors(newErrors);
  };

  return (
    <div className="flex-1 flex-col justify-center ">
      <div>
        {pageType === PageType.LOGIN ? (
          <h1 style={{ fontSize: "20px" }}>login</h1>
        ) : (
          <h1>register</h1>
        )}
      </div>

      {pageType === PageType.LOGIN ? (
        <Link to="/register" className="hover:text-blue-700">
          or, create an account
        </Link>
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
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
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
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
            {errors.login && (
              <p className="text-red-600 text-sm mt-1">{errors.login}</p>
            )}
          </div>

          <div>
            <button type="submit" id="button-2">
              {pageType === PageType.LOGIN ? "Login" : "Register"}
            </button>
          </div>
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
