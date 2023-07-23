import Navbar from "@/components/Navbar/Navbar";
import { GetAllMovie, GetMovieByTitle } from "@/utils/MovieAPI";
import React, { useState, useEffect } from "react";
import MovieCard from "@/components/MovieCard/MovieCard";
import SpinnerLoading from "@/components/Loading/SpinnerLoading";
import { FaGripLinesVertical, FaSearch } from "react-icons/fa";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";

const index = () => {
  const [movieData, setMovieData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      if (keyword === "") {
        const { data } = await GetAllMovie({ moviePage: currentPage });
        setMovieData(data?.data.results);
      } else {
        const { data } = await GetMovieByTitle({ movieKeyword: keyword });
        setMovieData(data?.data.results);
      }
    };
    fetchData();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [currentPage, keyword]);

  const RenderPageButtons = () => {
    const pageButtons = [];

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (startPage === 2) {
      pageButtons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="p-3 bg-[#EB4A4A] text-white border-none ml-2 rounded-sm cursor-pointer"
        >
          1
        </button>
      );
    } else if (startPage > 2) {
      pageButtons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="p-3 bg-[#EB4A4A] text-white border-none ml-2 rounded-sm cursor-pointer"
        >
          1
        </button>
      );
      pageButtons.push(
        <span className="pt-2 pl-1" key="dots1">
          ...
        </span>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
          className={`p-3 bg-[#EB4A4A] text-white border-none ml-2  rounded-sm cursor-pointer ${
            i === currentPage ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage === totalPages - 1) {
      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="p-3 bg-[#EB4A4A] text-white border-none rounded-sm ml-2 cursor-pointer"
        >
          {totalPages}
        </button>
      );
    } else if (endPage < totalPages - 1) {
      pageButtons.push(
        <span className="pt-2 pl-1" key="dots2">
          ...
        </span>
      );
      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="p-3 bg-[#EB4A4A] text-white border-none ml-2 rounded-sm cursor-pointer"
        >
          {totalPages}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <>
      <Head>
        <title>Movie | Ngomen</title>
        <meta
          name="description"
          content="Discover an extensive collection of movies from various genres and eras. Find detailed information and reviews for each movie and immerse yourself in the world of film entertainment. Whether you're a seasoned cinephile or a casual moviegoer, our curated list of movies has something for everyone. Start your cinematic exploration now and let the magic of storytelling unfold before your eyes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/logo_title.svg" />
        <meta property="og:title" content="Movie | Ngomen" />
        <meta
          property="og:description"
          content="Discover an extensive collection of movies from various genres and eras. Find detailed information and reviews for each movie and immerse yourself in the world of film entertainment. Whether you're a seasoned cinephile or a casual moviegoer, our curated list of movies has something for everyone. Start your cinematic exploration now and let the magic of storytelling unfold before your eyes"
        />
      </Head>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-between mx-10 pt-32 items-center">
        <div className=" md:text-4xl flex items-center">
          <div>
            <FaGripLinesVertical className="text-[#EB4A4A] mt-1 md:mt-0 text-[4rem]" />
          </div>
          <div>
            <h1>OUR MOVIE</h1>
            <p className="text-sm ml-0 md:ml-1">Ready For Review</p>
          </div>
        </div>
        <div className="relative mt-5 md:mt-0 w-11/12 md:w-7/12">
          <div className="absolute top-[0.9rem] left-2">
            <FaSearch className="opacity-25" />
          </div>
          <div className="w-full">
            <input
              type="text"
              onChange={(e) => setKeyword(e.target.value)}
              className="bg-gray-50 border border-[#EB4A4A] text-gray-900 text-sm rounded-lg active:border-[#EB4A4A] focus:border-[#EB4A4A] focus:border block w-full py-3 px-7  outline-none"
              placeholder="Search by Movie Title"
            />
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="pt-20">
          <SpinnerLoading />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center gap-10 mx-5 flex-wrap pt-20">
            {movieData?.length > 0 ? (
              movieData?.map((item, index) => (
                <div key={index} className="text-white">
                  <MovieCard movieDetail={item} />
                </div>
              ))
            ) : (
              <div>Nothing Film to Show</div>
            )}
          </div>
          {keyword === "" && (
            <div className="flex justify-between my-14 items-center px-4 md:px-20 py-5 bg-white shadow-sm">
              <div>page {currentPage} of 50</div>
              <div>{RenderPageButtons()}</div>
            </div>
          )}
          <div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default index;
