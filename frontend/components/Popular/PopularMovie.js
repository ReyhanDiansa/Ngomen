import React, { useState, useEffect } from "react";
import { GetPopularMovie } from "../../utils/MovieAPI";
import MovieCard from "../MovieCard/MovieCard";
import { FaAngleRight } from "react-icons/fa";
import Link from "next/link";
import SpinnerLoading from "../Loading/SpinnerLoading";

const PopularMovie = () => {
  const [trending, setTrending] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const { data } = await GetPopularMovie();
      setTrending(data?.data.results?.slice(0, 5));
    };
    fetchData();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return isLoading ? (
    <div className="pt-20">
      <SpinnerLoading />
    </div>
  ) : (
    <div className="py-14">
      <div className="flex justify-end p-3 mr-10 md:mr-20">
        <Link
          href={"/Movie/popular/1"}
          className="cursor-pointer flex  gap-1  items-center"
        >
          <p>
            See <span className="text-[#EB4A4A]">More</span>
          </p>
          <FaAngleRight />
        </Link>
      </div>
      <div className="flex items-center justify-center gap-10 mx-5 flex-wrap">
        {trending?.map((item, index) => (
          <div key={index} className="text-white">
            <MovieCard movieDetail={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMovie;
