import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { logoutApi } from "../apis/authentication";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { currentUserData } = useAuth();
  const [cookies, setCookies, removeCookie] = useCookies([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isForm =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/createEvent";

  useEffect(() => {
    if (cookies.authToken) {
      // set state to logged in
      setLoggedIn(true);
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
      setLoggedIn(false);
      navigate("/");
    }
  };

  return (
    <div>
      {!isForm && (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <Link to="/">
              <img
                src="cbc-green.png"
                alt="cbcLogo"
                style={{ height: "10rem" }}
              />
            </Link>
            <Link to="allEvents">EVENTS</Link>

            {loggedIn ? (
              <Menu as="div" className="">
                <MenuButton className="flex items-center rounded-sm py-1 px-2 uppercase">
                  @{currentUserData.username || currentUserData.email}
                  <img
                    src="/public/down-arrow.png"
                    alt="Dropdown Icon"
                    className="ml-2 w-6 h-6"
                  />
                </MenuButton>
                <MenuItems className="transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                  <div>
                    <MenuItem>
                      <Link
                        className="block  bg-ivory text-black rounded-sm py-1 px-2 hover:bg-black hover:text-white  "
                        to="profile"
                      >
                        Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        className="block  bg-ivory text-black rounded-sm py-1 px-2 hover:bg-black hover:text-white  "
                        to="createEvent"
                      >
                        Create Event
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/"
                        className=" block  bg-ivory text-black rounded-sm py-1 px-2 hover:bg-black hover:text-white "
                        role="menuitem"
                        tabIndex={-1}
                        onClick={async (e) => {
                          e.preventDefault();
                          await handleLogout();
                        }}
                      >
                        Logout
                      </Link>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            ) : (
              <div className="">
                <Link to="login">Login</Link>
              </div>
            )}
          </div>
        </div>
      )}
      {/* <div>
        <Outlet />
      </div> */}
    </div>
  );
};

export default Navbar;
