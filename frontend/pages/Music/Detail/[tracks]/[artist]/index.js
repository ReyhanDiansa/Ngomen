import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar/Navbar";
import { GetMusicDetail } from "@/utils/MusicAPI";
import { FiExternalLink, FiArrowLeft } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import SpinnerLoading from "@/components/Loading/SpinnerLoading";
import { getTokenCookie } from "@/utils/HandleCookie";
import MusicReview from "@/components/UserReview/MusicReview";
import AddReviewButton from "@/components/ButtonAdd/AddReviewButton";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";

const index = () => {
  const [musicDetail, setMusicDetail] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const urlError =
    "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png";
  const router = useRouter();
  const { tracks, artist } = router.query;
  const musicId = {
    artist: artist,
    track: tracks,
  };

  const dataMusic = {
    name: tracks,
    artist: {
      name: artist,
    },
  };

  useEffect(() => {
    if (!tracks || !artist) return;

    const fetchToken = async () => {
      try {
        const { data } = await GetMusicDetail({ MusicDetail: dataMusic });
        setMusicDetail(data?.data?.track);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchToken();
    if (musicDetail?.name !== "undefined") {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [tracks, artist]);

  const seconds = Math.floor((musicDetail?.duration / 1000) % 60);
  const minutes = Math.floor((musicDetail?.duration / 1000 / 60) % 60);

  const arrayInfo = {
    Title: musicDetail?.name,
    Artist: musicDetail?.artist?.name,
    Playcount: musicDetail?.playcount,
    "Published Date": musicDetail?.wiki?.published,
  };

  const startIndex = musicDetail?.wiki?.content.indexOf(
    '<a href="http://www.last.fm'
  );
  const endIndex = musicDetail?.wiki?.content.indexOf("</a>.") + 4;

  const modifiedText =
    startIndex !== -1 && endIndex !== -1
      ? musicDetail?.wiki?.content.substring(0, startIndex) +
        musicDetail?.wiki?.content.substring(endIndex)
      : musicDetail?.wiki?.content;
  return (
    <>
      <Head>
        <title>
          {musicDetail?.name} ({musicDetail?.artist?.name}) | Ngomen Music
        </title>
        <meta
          name="description"
          content={`Explore and review the latest blockbuster movie with our community! Share your thoughts, critiques, and comments on ${musicDetail?.name} (${musicDetail?.artist?.name}). Join the discussion, rate the movie from 1.0 to 10.0, and read what others have to say about this thrilling cinematic experience. Be part of the movie-loving community and discover exciting insights about ${musicDetail?.name} (${musicDetail?.artist?.name}) today!`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/logo_title.svg" />
        <meta
          property="og:title"
          content={`
            ${musicDetail?.name} (${musicDetail?.artist?.name}) | Ngomen Music
          `}
        />
        <meta
          property="og:description"
          content={`Explore and review the latest blockbuster movie with our community! Share your thoughts, critiques, and comments on ${musicDetail?.name} (${musicDetail?.artist?.name}). Join the discussion, rate the movie from 1.0 to 10.0, and read what others have to say about this thrilling cinematic experience. Be part of the movie-loving community and discover exciting insights about ${musicDetail?.name} (${musicDetail?.artist?.name}) today!`}
        />
      </Head>
      <Navbar />
      <div className="pt-10 md:pt-20">
        {isLoading ? (
          <div className="pt-10 bg-white">
            <SpinnerLoading />
          </div>
        ) : (
          musicDetail && (
            <>
              {/* button header */}
              <div className="mx-2 md:mx-14  my-10 md:my-5">
                <div className="text-xs md:text-base flex justify-between">
                  <div
                    className="flex items-center cursor-pointer hover:underline hover:underline-offset-2 gap-1 md:gap-2 "
                    onClick={() => router.push("/Music")}
                  >
                    <FiArrowLeft />
                    <p>Back to Music</p>
                  </div>
                  {/* {renderAddReviewButton()} */}
                  <AddReviewButton type={"music"} checkId={musicId} />
                </div>
              </div>

              {/* header container */}
              <div className="bg-white rounded-sm flex flex-col md:flex-row px-5 py-10  mx-3 md:mx-20">
                <div className="mx-auto md:mx-20">
                  <Image
                    src={
                      imageError
                        ? urlError
                        : musicDetail.album?.image[3]["#text"]
                    }
                    alt={musicDetail?.name}
                    width={240}
                    height={240}
                    className="rounded-md"
                    onError={() => setImageError(true)}
                  />
                </div>
                <div className="mt-0 ">
                  <h1 className="text-2xl text-center md:text-start md:text-[4rem] leading-relaxed w-full py-2">
                    {musicDetail?.name}
                  </h1>
                  <p className="md:ml-2 md:mt-3 text-center md:text-start">
                    ({musicDetail?.artist.name})
                  </p>
                  <div className="flex flex-col md:flex-row gap-2 mt-12 items-center ml-2">
                    {musicDetail?.duration !== "0" && (
                      <>
                        <div className="flex items-center gap-2">
                          <FaRegClock />
                          {minutes}m {seconds}s
                        </div>
                        <div className="hidden md:block">•</div>
                      </>
                    )}
                    <div>{musicDetail?.listeners} listener's (By last.fm)</div>
                  </div>
                </div>
              </div>

              {/* info container */}
              <div className="bg-white px-5 py-10 rounded-sm mx-3 md:mx-20 my-3">
                <div>
                  {arrayInfo &&
                    Object.entries(arrayInfo).map(
                      ([key, value], index) =>
                        value !== "" && (
                          <div
                            key={index}
                            className="flex justify-between py-3"
                          >
                            <p className="w-6/12 font-semibold">{key}</p>
                            <div className="w-8/12 flex gap-2">
                              <p>:</p>
                              <p>{value}</p>
                            </div>
                          </div>
                        )
                    )}
                </div>
              </div>

              {/* summary container */}
              {musicDetail?.wiki?.content !== "" && (
                <div className="bg-white px-5 py-10 rounded-sm mx-3 md:mx-20 my-3">
                  <div
                    key={index}
                    className="flex justify-center w-full text-center md:text-start flex-col md:flex-row md:justify-between py-3"
                  >
                    <p className="md:w-6/12 font-semibold">Summary</p>
                    <div className="md:w-8/12 flex gap-2">
                      <p className="hidden md:block">:</p>
                      <p>{modifiedText}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* link official web */}
              {musicDetail?.url && (
                <div className="bg-white px-5 py-5 rounded-sm my-4 mx-3 md:mx-20">
                  <Link
                    href={musicDetail?.url}
                    className="flex gap-2 items-center w-fit hover:underline hover:underline-offset-2"
                  >
                    <FiExternalLink />
                    <p className="mt-[1px]">Listen Music Now</p>
                  </Link>
                </div>
              )}

              {/* tags container */}
              {musicDetail?.toptags?.tag?.length > 0 && (
                <div className="bg-white px-5 py-10 my-4 rounded-sm mx-3 md:mx-20">
                  <div className="flex justify-between py-3">
                    <p className="w-6/12 font-semibold">Tags</p>
                    <p className="p-1">:</p>
                    <div className="w-8/12 flex gap-2 flex-wrap">
                      {musicDetail?.toptags?.tag?.map((item, index) => (
                        <p
                          key={index}
                          className="px-2 py-1 bg-[#fde3e3] rounded-lg border-2 border-red-600"
                        >
                          {item.name}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* User's Review */}
              {musicId && (
                <div className="mx-3 md:mx-20">
                  <MusicReview musicId={musicId} />
                </div>
              )}

              <div>
                <Footer />
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default index;
