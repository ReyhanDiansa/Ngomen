import MovieCard from "@/components/MovieCard/MovieCard";
import Navbar from "@/components/Navbar/Navbar";
import { GetAllPopularMovie } from "../../../utils/MovieAPI";
import React, { useState, useEffect } from "react";
import { FaGripLinesVertical } from "react-icons/fa";
import { useRouter } from "next/router";
import SpinnerLoading from "@/components/Loading/SpinnerLoading";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";
import { Pagination } from "@nextui-org/react";

const index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [trending, setTrending] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const { data } = await GetAllPopularMovie({ moviePage: currentPage });
      setTrending(data?.data.results);
    };
    fetchData();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Head>
        <title>Popular Movie | Ngomen</title>
        <meta
          name="description"
          content="Discover the latest and most popular movies on our website. Explore a curated collection of blockbuster hits, critically acclaimed films, and fan favorites. Stay up-to-date with the hottest releases, movie trailers, and reviews. Find your next movie night pick from a wide selection of genres, including action, drama, comedy, romance, and more. Join our community of movie enthusiasts and indulge in the world of cinema like never before. Start exploring now!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/logo_title.svg" />
        <meta property="og:title" content="Popular Movie | Ngomen" />
        <meta
          property="og:description"
          content="Discover the latest and most popular movies on our website. Explore a curated collection of blockbuster hits, critically acclaimed films, and fan favorites. Stay up-to-date with the hottest releases, movie trailers, and reviews. Find your next movie night pick from a wide selection of genres, including action, drama, comedy, romance, and more. Join our community of movie enthusiasts and indulge in the world of cinema like never before. Start exploring now!"
        />
      </Head>
      <div>
        <Navbar />
      </div>
      <div
        className={`text-2xl ${
          isLoading ? "bg-white" : ""
        } md:text-4xl pl-10 pt-32 flex`}
      >
        <div className="flex">
          <FaGripLinesVertical className="text-[#EB4A4A] mt-1 md:mt-0" />
          <h2>Popular Movie's</h2>
        </div>
      </div>
      {isLoading ? (
        <div className="bg-white pt-4">
          <SpinnerLoading />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center gap-10 flex-wrap py-10">
            {trending?.map((item, index) => (
              <div key={index} className="text-white">
                <MovieCard movieDetail={item} />
              </div>
            ))}
          </div>
          <div className="md:flex md:justify-between my-14 items-center px-4 md:px-20 py-5 bg-white shadow-sm">
            <div className="text-center md:text-start">page {currentPage} of 50</div>
            <Pagination
              showControls
              total={50}
              initialPage={1}
              classNames={{
                item: "font-bold",
              }}
              color="danger"
              page={currentPage}
              onChange={(p) => handlePageChange(p)}
            />
          </div>
          <div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default index;
