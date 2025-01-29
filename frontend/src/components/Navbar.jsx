import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["jwt"]);
  const [signinState, setSigninState] = useState(false);

  useEffect(() => {
    if (cookies.authToken) {
      // set state to logged in
      setSigninState(true);
      console.log("sign in state:", setSigninState);
    }
  }, []);

  return (
    <div className=" bg-ivory">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <Link to="/">cookbook club</Link>
          <Link to="profile">profile</Link>
          {signinState === true ? (
            <div className="">
              <Link
                to="logout"
                className="bg-ivory text-black rounded-sm py-1 px-2 hover:bg-black hover:text-white"
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
