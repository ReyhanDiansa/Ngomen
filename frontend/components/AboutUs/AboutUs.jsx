import React from "react";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="flex flex-col md:flex-row text-white md:py-14 h-full py-5 md:px-32 w-full justify-center md:justify-between">
      <div className=" animate-slide-in-left animate-bounce-slow px-5 mt-16 md:mt-0 md:w-6/12">
        <Image
          src={"/images/aboutus_illus.svg"}
          width={750}
          height={750}
          alt="ngomen logo"
        />
      </div>
      <div className="px-8 py-14 md:pt-20 animate-slide-in md:px-5 md:w-6/12">
        <p className="text-center md:text-start md:ml-1 text-md md:text-md text-black">
          Ngomen is a platform that offers a unique experience for movie and
          music enthusiasts. It is the perfect destination for those who love to
          explore and discuss their favorite films and songs. Whether you're
          seeking reviews, critiques, or lively conversations, you'll find it
          all here. Our comprehensive movie database is powered by the TMDB API,
          ensuring that you have access to the latest and most accurate
          information about your beloved films. Likewise, our music section
          sources data from the Last.fm API, granting you the opportunity to
          discover new music, delve into artist discographies, and engage in
          passionate discussions with like-minded music lovers. Join our vibrant
          community and unleash your love for movies and music like never
          before!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
