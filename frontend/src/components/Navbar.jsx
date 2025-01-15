import React from "react";

const Navbar = () => {
  return (
    <div className=" bg-ivory">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div>cookbook club</div>
          <div className="">
            <button className="bg-ivory text-black rounded-sm py-1 px-2 hover:bg-black hover:text-white">
              login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
