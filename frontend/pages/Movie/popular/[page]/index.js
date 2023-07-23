import MovieCard from "@/components/MovieCard/MovieCard";
import Navbar from "@/components/Navbar/Navbar";
import { GetAllPopularMovie } from "../../../../utils/MovieAPI";
import React, { useState, useEffect } from "react";
import { FaGripLinesVertical } from "react-icons/fa";
import { useRouter } from "next/router";
import SpinnerLoading from "@/components/Loading/SpinnerLoading";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";

const index = () => {
  const router = useRouter();
  const { page } = router.query;
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const [totalPages, setTotalPages] = useState(50);
  const [trending, setTrending] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const { data } = await GetAllPopularMovie({ moviePage: page });
      setTrending(data?.data.results);
      setCurrentPage(parseInt(page));
    };
    fetchData();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [page]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    router.push(`/Movie/popular/${pageNumber}`);
  };

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
      <div className="text-2xl md:text-4xl ml-10 pt-32 flex">
        <div className="flex">
          <FaGripLinesVertical className="text-[#EB4A4A] mt-1 md:mt-0" />
          <h2>Popular Movie's</h2>
        </div>
      </div>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <>
          <div className="flex items-center justify-center gap-10 flex-wrap py-10">
            {trending?.map((item, index) => (
              <div key={index} className="text-white">
                <MovieCard movieDetail={item} />
              </div>
            ))}
          </div>
          <div className="flex justify-between my-14 items-center px-4 md:px-20 py-5 bg-white shadow-sm">
            <div>page {page} of 50</div>
            <div>{RenderPageButtons()}</div>
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
