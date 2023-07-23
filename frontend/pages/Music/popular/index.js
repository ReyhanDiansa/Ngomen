import Navbar from "@/components/Navbar/Navbar";
import React, { useState, useEffect } from "react";
import { FaGripLinesVertical } from "react-icons/fa";
import { GetMusicDetail, GetPopularMusic } from "@/utils/MusicAPI";
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
  const [totalPages, setTotalPages] = useState();

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const { data } = await GetPopularMusic();
      setTrending(data.data.tracks?.track);
    };
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const fetchDetail = async () => {
      const fetchPromises = trending?.map(async (item) => {
        const { data } = await GetMusicDetail({ MusicDetail: item });
        return data;
      });
      const results = await Promise.all(fetchPromises);
      setDetailPop(results?.slice(startIndex, endIndex));
      const totalItems = trending?.length;
      const totalPages = Math.ceil(totalItems / pageSize);
      setTotalPages(totalPages);
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
        <title>Popular Music | Ngomen</title>
        <meta
          name="description"
          content="Discover the latest and most popular music on our website.  Stay up-to-date with the hottest releases. Find your music pick from a wide selection of genres. Join our community of music enthusiasts. Start exploring now!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/logo_title.svg" />
        <meta property="og:title" content="Popular Music | Ngomen" />
        <meta
          property="og:description"
          content="Discover the latest and most popular music on our website.  Stay up-to-date with the hottest releases. Find your music pick from a wide selection of genres. Join our community of music enthusiasts. Start exploring now!"
        />
      </Head>
      <div>
        <Navbar />
      </div>
      <div className="text-2xl md:text-4xl ml-10 pt-32 flex">
        <div className="flex">
          <FaGripLinesVertical className="text-[#EB4A4A] mt-1 md:mt-0" />
          <h2>Popular Music's</h2>
        </div>
      </div>
      {isLoading ? (
        <div className="mt-16">
          <SpinnerLoading />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center gap-10 flex-wrap py-10">
            {detailPop?.map((item, index) => (
              <div key={index} className="text-white">
                <MusicCard MusicDetail={item?.data?.track} />
              </div>
            ))}
          </div>
          <div className="flex justify-between my-14 items-center px-4 md:px-20 py-5 bg-white shadow-sm">
            <div>
              <p>
                Page {currentPage} of {totalPages}
              </p>
            </div>
            <div className="justify-end">{RenderPageButtons()}</div>
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
