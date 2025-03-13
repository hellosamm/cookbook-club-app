import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative flex justify-center items-center">
        <div className="absolute text-4xl md:text-6xl lg:text-8xl text-center text-[#F7F6F2] font-bold z-10">
          <div>
            <p>where food meets</p>
            <p>friendship</p>
          </div>
          <button
            className="mt-5 text-sm md:text-l lg:text-xl text-[#828F25] rounded-[1.5625rem] border-[3px] border-[#828F25] bg-[#F7F6F2] px-6 py-2 "
            onClick={() => navigate("/AllEvents")}
          >
            find an event near you
          </button>
        </div>
        <img
          src="./home.jpeg"
          alt="homepage header image"
          className="w-full h-auto "
        />
      </div>
      <div className="grid grid-cols-2 bg-[#F7F6F2] pt-3 ">
        <div>
          <img
            src="public/sm-group.jpeg"
            alt="group image"
            // className="h-auto w-[50vh]"
          />
        </div>
        <div className="bg-[#828F25]">
          <div className="p-10 text-lg text-[#F7F6F2]">
            a table full of friends
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
