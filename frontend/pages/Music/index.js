import Navbar from "@/components/Navbar/Navbar";
import React, { useState, useEffect } from "react";
import { FaGripLinesVertical, FaSearch } from "react-icons/fa";
import { GetAllMusic, GetMusicByTitle, GetMusicDetail } from "@/utils/MusicAPI";
import MusicCard from "@/components/MusicCard/MusicCard";
import SpinnerLoading from "@/components/Loading/SpinnerLoading";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";

const index = () => {
  const [trending, setTrending] = useState();
  const [detailPop, setDetailPop] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(50);
  const [keyword, setKeyword] = useState("");

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      if (keyword === "") {
        const { data } = await GetAllMusic({ musicPage: currentPage });
        setTrending(data?.data?.tracks?.track);
      } else {
        const { data } = await GetMusicByTitle({ musicKeyword: keyword });
        setTrending(data?.data?.results?.trackmatches?.track);
      }
    };
    fetchData();
  }, [currentPage, keyword]);

  useEffect(() => {
    const fetchDetail = async () => {
      const fetchPromises = trending?.map(async (item) => {
        if (keyword === "") {
          const { data } = await GetMusicDetail({ MusicDetail: item });
          return data;
        } else {
          const dataMus = { name: item.name, artist: { name: item.artist } };
          const { data } = await GetMusicDetail({ MusicDetail: dataMus });
          return data;
        }
      });
      const results = await Promise.all(fetchPromises);
      setDetailPop(results);
    };
    if (trending && trending.length > 0) {
      fetchDetail();
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [trending]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        <title> Music | Ngomen</title>
        <meta
          name="description"
          content="Discover an extensive collection of music from various genres and eras. Find detailed information and reviews for each music and immerse yourself in the world of music entertainment.  Start your music exploration now and let the magic of storytelling unfold before your eyes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/logo_title.svg" />
        <meta property="og:title" content="Ngomen Music" />
        <meta
          property="og:description"
          content="Discover an extensive collection of music from various genres and eras. Find detailed information and reviews for each music and immerse yourself in the world of music entertainment.  Start your music exploration now and let the magic of storytelling unfold before your eyes"
        />
      </Head>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col md:flex-row justify-between mx-10 pt-32 items-center">
        <div className=" md:text-4xl flex items-center">
          <div>
            <FaGripLinesVertical className="text-[#EB4A4A] mt-1 md:mt-0 text-[4rem]" />
          </div>
          <div>
            <h1>OUR MUSIC</h1>
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
              placeholder="Search by Music Title"
            />
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="mt-16">
          <SpinnerLoading />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center gap-10 flex-wrap py-10 my-5">
            {detailPop?.length > 0 ? (
              detailPop?.map((item, index) => (
                <div key={index} className="text-white">
                  <MusicCard MusicDetail={item?.data?.track} />
                </div>
              ))
            ) : (
              <div>Nothing Music to Show</div>
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
