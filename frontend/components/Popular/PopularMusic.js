import React, { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";
import Link from "next/link";
import { GetMusicDetail, GetPopularMusic } from "@/utils/MusicAPI";
import MusicCard from "../MusicCard/MusicCard";
import SpinnerLoading from "../Loading/SpinnerLoading";

const PopularMusic = () => {
  const [popular, setPopular] = useState();
  const [detailPop, setDetailPop] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    let currentPage = 1;

    const fetchData = async () => {
      const { data } = await GetPopularMusic({ currentPage });
      console.log('kk', data);
      
      setPopular(data?.tracks?.track?.slice(0, 5));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDetail = async () => {
      const fetchPromises = popular.map(async (item) => {
        const { data } = await GetMusicDetail({ MusicDetail: item });
        return data;
      });
      const results = await Promise.all(fetchPromises);
      setDetailPop(results);
    };

    if (popular && popular.length > 0) {
      fetchDetail();
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [popular]);

  return isLoading ? (
    <div className="pt-20">
      <SpinnerLoading />
    </div>
  ) : (
    <div className="py-14">
      <div className="flex justify-end p-3 mr-10 md:mr-20">
        <Link
          href={"/Music/popular"}
          className="cursor-pointer flex  gap-1  items-center"
        >
          <p>
            See <span className="text-[#EB4A4A]">More</span>
          </p>
          <FaAngleRight />
        </Link>
      </div>
      <div className="flex items-center justify-center gap-10 mx-5 flex-wrap">
        {detailPop?.map((item, index) => (
          <div key={index} className="text-white">
            <MusicCard MusicDetail={item?.data?.track} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMusic;
