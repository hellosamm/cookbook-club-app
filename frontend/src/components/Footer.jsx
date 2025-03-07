import React from "react";
import instagram from "/instagram.png";
import github from "/github.png";
import linkedin from "/linkedin.png";
import "../style/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="flex space-x-4 items-center">
        <a href="https://www.instagram.com/samm.bakerr/" target="blank">
          <img src={instagram} className="w-6 " />
        </a>
        <a href="https://github.com/hellosamm" target="blank">
          <img src={github} className="w-6" />
        </a>
        <a href="https://www.linkedin.com/in/samm-bakerr/" target="blank">
          <img src={linkedin} className="w-6" />
        </a>
      </div>
      <div className="flex items-center ">
        <div className="pr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
            />
          </svg>
        </div>
        <p>made by samm 2025</p>
      </div>
    </div>
  );
};

export default Footer;
