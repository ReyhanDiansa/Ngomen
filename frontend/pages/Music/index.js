import Navbar from "@/components/Navbar/Navbar";
import React, { useState, useEffect } from "react";
import { FaGripLinesVertical, FaSearch } from "react-icons/fa";
import { GetAllMusic, GetMusicByTitle, GetMusicDetail } from "@/utils/MusicAPI";
import MusicCard from "@/components/MusicCard/MusicCard";
import SpinnerLoading from "@/components/Loading/SpinnerLoading";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";
import { Pagination } from "@nextui-org/react";

const index = () => {
  const [trending, setTrending] = useState();
  const [detailPop, setDetailPop] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      if (keyword === "") {
        const { data } = await GetAllMusic({ musicPage: currentPage });
        const skip = (currentPage - 1) * 15;
        
        let response;
        if (data?.data?.tracks?.track?.length > 15) {
          response = data?.data?.tracks?.track.slice(skip, skip + 15);
        } else {
          response = data?.data?.tracks?.track;
        }
        setTrending(response);
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
      <div
        className={`${
          isLoading ? "bg-white" : ""
        } flex flex-col md:flex-row justify-between px-10 pt-32 md:items-center`}
      >
        <div className=" md:text-4xl flex items-center">
          <div>
            <FaGripLinesVertical className="text-[#EB4A4A] mt-1 md:mt-0 text-[4rem]" />
          </div>
          <div>
            <h1>OUR MUSIC</h1>
            <p className="text-sm ml-0 md:ml-1">Ready For Review</p>
          </div>
        </div>
        <div className="relative mt-5 md:mt-0 w-11/12 md:w-7/12 mx-auto">
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
        <div className="pt-16 bg-white">
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
            <div className="md:flex md:justify-between my-14 items-center px-4 md:px-20 py-5 bg-white shadow-sm">
              <div className="text-center md:text-start">
                page {currentPage} of 50
              </div>
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
