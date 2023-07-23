import React from "react";
import Image from "next/image";

export const Hero = () => {
  const scrollToElement = (elementID) => {
    const targetElement = document.getElementById(elementID);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="flex flex-col-reverse md:flex-row text-white md:py-44 h-full py-5 md:px-14">
      <div className="px-8 py-14 md:pt-20 animate-slide-in md:px-5">
        <p className="md:ml-1 text-sm md:text-md">Hi,There!!</p>
        <h2 className="text-xl md:text-4xl md:w-[70%] text-[#EB4A4A] font-bold mt-2">
          Experience the Magic of Music and Film through Analysis and Critiques
        </h2>
        <button
          className="py-3 px-5 md:px-8 md:text-md text-sm border-2 border-[#EB4A4A] mt-5 md:mt-14 hover:bg-[#EB4A4A]"
          onClick={() => scrollToElement("popular")}
        >
          Browse Now
        </button>
      </div>
      <div className=" animate-slide-in-right animate-bounce-slow px-5 mt-16 md:mt-0">
        <Image
          src={"/images/hero-ill.svg"}
          width={750}
          height={750}
          alt="ngomen logo"
        />
      </div>
    </div>
  );
};
