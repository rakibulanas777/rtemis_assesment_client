import Image from "next/legacy/image";
import banner from "../assets/banner.png";
import React from "react";

const Banner = () => {
  return (
    <div className="relative h-[560px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
      <Image src={banner} layout="fill" alt="banner" objectFit="cover" />
      <div className="absolute top-1/2 w-full text-center">
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
          Not sure where to go? Perfect.
        </p>
        <a href="#explore">
          <button className="px-10 py-4 my-3 font-bold bg-white shadow-md rounded-full text-purple-500 active:scale-90 transition duration-150 transform hover:shadow-xl">
            explore
          </button>
        </a>
      </div>
    </div>
  );
};

export default Banner;
