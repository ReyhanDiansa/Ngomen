import Navbar from "@/components/Navbar/Navbar";
import React, { useState, useEffect } from "react";
import { FaGripLinesVertical } from "react-icons/fa";
import { GetMusicDetail, GetPopularMusic } from "@/utils/MusicAPI";
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

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const { data } = await GetPopularMusic({ currentPage });
      const skip = (currentPage - 1) * 15;
      
      let response;
      if(data?.tracks?.track?.length > 15){
        response = data?.tracks?.track.slice(skip, skip + 15);
      } else {
        response = data?.tracks?.track
      }
      setTrending(response);
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
      <div
        className={`${
          isLoading ? "bg-white" : ""
        } text-2xl md:text-4xl pl-10 pt-32 flex`}
      >
        <div className="flex">
          <FaGripLinesVertical className="text-[#EB4A4A] pt-1 md:mt-0" />
          <h2>Popular Music's</h2>
        </div>
      </div>
      {isLoading ? (
        <div className="pt-16 bg-white">
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
          <div className="md:flex justify-center md:justify-between my-14 items-center px-4 md:px-20 py-5 bg-white shadow-sm">
            <div>
              <p className="text-center md:text-start">
                Page {currentPage} of 50
              </p>
            </div>
            <div>
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
