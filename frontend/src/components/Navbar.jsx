import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { logoutApi } from "../apis/authentication";

const Navbar = () => {
  const [cookies, setCookies, removeCookie] = useCookies([]);
  const [signinState, setSigninState] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.authToken) {
      // set state to logged in
      setSigninState(true);
      console.log("sign in state:", cookies.authToken);
    }
  }, [cookies.authToken]);

  const handleLogout = async () => {
    const [result, authToken, error] = await logoutApi(cookies.authToken);
    console.log("result: ", result);
    console.log("authToken: ", authToken);
    console.log("error: ", error);

    handleResponse([result, authToken, error]);
  };

  const handleResponse = ([result, authToken, error]) => {
    if (error) {
      console.log("error: ", error);
      // removeCookie("authToken");
      console.log("authToken: ", authToken);
    }

    if (result && !error) {
      removeCookie("authToken");
      setSigninState(false);
      navigate("/");
    }
  };

  return (
    <div className=" bg-ivory">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <Link to="/">cookbook club</Link>
          <Link to="profile">profile</Link>
          {signinState === true ? (
            <div className="">
              <Link
                to="/"
                className="bg-ivory text-black rounded-sm py-1 px-2 hover:bg-black hover:text-white"
                onClick={async (e) => {
                  e.preventDefault();
                  await handleLogout();
                }}
              >
                logout
              </Link>
            </div>
          ) : (
            <div className="">
              <Link
                to="login"
                className="bg-ivory text-black rounded-sm py-1 px-2 hover:bg-black hover:text-white"
              >
                login
              </Link>
            </div>
          )}
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
