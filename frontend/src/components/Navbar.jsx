import React from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <div className=" bg-ivory">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <Link to="/">cookbook club</Link>
          <Link to="profile">profile</Link>
          <div className="">
            <Link
              to="login"
              className="bg-ivory text-black rounded-sm py-1 px-2 hover:bg-black hover:text-white"
            >
              login
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
