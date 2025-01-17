import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetMovieDetail } from "../../../../utils/MovieAPI";
import Navbar from "@/components/Navbar/Navbar";
import StarRatings from "react-star-ratings";
import { FaRegClock } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink, FiArrowLeft } from "react-icons/fi";
import MovieReview from "@/components/UserReview/MovieReview";
import SpinnerLoading from "@/components/Loading/SpinnerLoading";
import AddReviewButton from "@/components/ButtonAdd/AddReviewButton";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";

const index = () => {
  const [detailMovie, setDetailMovie] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [arrayInfo, setArrayInfo] = useState();
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (!id) return;
    // setIsLoading(true);
    const fetchData = async () => {
      const { data, success } = await GetMovieDetail({ movieId: id });
      if (success) {
        setDetailMovie(data?.data);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    setArrayInfo({
      "Original Title": detailMovie?.original_title,
      "Release Date": detailMovie?.release_date,
      Overview: detailMovie?.overview,
      Tagline: detailMovie?.tagline,
      "Original Language": detailMovie?.original_language,
    });
    if (arrayInfo) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [detailMovie]);

  const date = new Date(detailMovie?.release_date);
  const year = date?.getFullYear();
  const hours = Math.floor(detailMovie?.runtime / 60);
  const minutes = detailMovie?.runtime % 60;
  const formattedTime = `${hours}h ${minutes}m`;
  const baseImageUrl = "https://image.tmdb.org/t/p/original";

  return (
    <>
      <Head>
        <title>{detailMovie?.title} | Ngomen Movie</title>
        <meta
          name="description"
          content={`Explore and review the latest blockbuster movie with our community! Share your thoughts, critiques, and comments on ${detailMovie?.title}. Join the discussion, rate the movie from 1.0 to 10.0, and read what others have to say about this thrilling cinematic experience. Be part of the movie-loving community and discover exciting insights about ${detailMovie?.title} today!`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/logo_title.svg" />
        <meta
          property="og:title"
          content={`${detailMovie?.title} | Ngomen Movie`}
        />
        <meta
          property="og:description"
          content={`Explore and review the latest blockbuster movie with our community! Share your thoughts, critiques, and comments on ${detailMovie?.title}. Join the discussion, rate the movie from 1.0 to 10.0, and read what others have to say about this thrilling cinematic experience. Be part of the movie-loving community and discover exciting insights about ${detailMovie?.title} today!`}
        />
      </Head>
      {!detailMovie && !isLoading ? (
        <div>Error loading movie details</div>
      ) : (
        <>
          <Navbar />
          <div className="pt-10 md:pt-20">
            {isLoading ? (
              <div className="pt-20 bg-white">
                <SpinnerLoading />
              </div>
            ) : (
              <>
                <div className="mx-2 md:mx-14  my-10 md:my-5">
                  {/* button header */}
                  <div className="text-xs md:text-base flex justify-between">
                    <div
                      className="flex items-center cursor-pointer hover:underline hover:underline-offset-2 gap-1 md:gap-2 "
                      onClick={() => router.push("/Movie")}
                    >
                      <FiArrowLeft />
                      <p>Back to Movie List</p>
                    </div>
                    {/* {renderAddReviewButton()} */}
                    <AddReviewButton
                      type={"movie"}
                      checkId={id}
                      itemDetail={detailMovie}
                    />
                  </div>

                  {/* header container */}
                  <div className="mx-2 flex flex-col md:flex-row justify-between">
                    <div className="mt-5">
                      <h2 className="text-2xl">{detailMovie?.title}</h2>
                      <div className="flex text-gray-500 gap-4">
                        <p>{year}</p>
                        {/* <p>•</p> */}
                        <p>|</p>
                        <div className="flex items-center gap-1">
                          <FaRegClock />
                          <p>{formattedTime}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:items-center gap-1 flex-col md:flex-row">
                      <StarRatings
                        rating={detailMovie?.vote_average}
                        starRatedColor={"#ffd700"}
                        numberOfStars={10}
                        name="rating"
                        starDimension="20px"
                        starSpacing="2px"
                      />
                      <p className="mt-1">
                        {detailMovie?.vote_average}{" "}
                        <span className="text-xs">(rate avg by tmdb)</span>
                      </p>
                    </div>
                  </div>

                  {/* image container */}
                  <div className="flex justify-between gap-x-2 p-2 rounded-sm my-4 bg-white">
                    <div className="h-fit">
                      <Image
                        src={`${baseImageUrl}${detailMovie?.poster_path}`}
                        width={400}
                        height={400}
                        alt={detailMovie?.title}
                        className="rounded-sm"
                      />
                    </div>

                    <div className="h-fit">
                      <Image
                        src={`${baseImageUrl}${detailMovie?.backdrop_path}`}
                        width={1000}
                        height={400}
                        alt={detailMovie?.title}
                        className="rounded-sm"
                      />
                    </div>
                  </div>

                  {/* detail info container */}
                  <div className="bg-white px-5 py-10 rounded-sm">
                    <div>
                      {arrayInfo &&
                        Object.entries(arrayInfo).map(([key, value], index) => (
                          <div
                            key={index}
                            className="flex justify-between py-3"
                          >
                            {value !== "" && (
                              <>
                                <p className="w-6/12 font-semibold">{key}</p>
                                <div className="w-8/12 flex gap-2">
                                  <p>:</p>
                                  <p>{value}</p>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Genre container */}
                  {detailMovie?.genres?.length > 0 && (
                    <div className="bg-white px-5 py-10 my-4 rounded-sm">
                      <div className="flex justify-between py-3">
                        <p className="w-6/12 font-semibold">Genre</p>
                        <p className="p-1">:</p>
                        <div className="w-8/12 flex gap-2 flex-wrap">
                          {detailMovie?.genres.map((item, index) => (
                            <p
                              key={index}
                              className="px-2 py-1 bg-[#fde3e3] border-2 border-red-600 rounded-lg"
                            >
                              {item.name}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* companies info */}
                  {/* {detailMovie?.production_companies.length !== 0 || */}
                  {/* detailMovie?.production_countries.length !== 0 &&  */}
                  <div className="bg-white px-5 py-10 my-4 rounded-sm">
                    {detailMovie?.production_companies?.length > 0 && (
                      <div className="flex justify-between py-3">
                        <p className="w-6/12 font-semibold">
                          Production Companies
                        </p>
                        <p className="p-1">:</p>
                        <div className="w-8/12 flex gap-2 flex-wrap">
                          {detailMovie?.production_companies.map(
                            (item, index) => (
                              <p
                                key={index}
                                className="px-2 py-1 bg-[#fde3e3] border-2 border-red-600 rounded-lg"
                              >
                                {item.name}
                              </p>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {detailMovie?.production_countries?.length > 0 && (
                      <div className="flex justify-between py-3">
                        <p className="w-6/12 font-semibold">
                          Production Countries
                        </p>
                        <p className="p-1">:</p>
                        <div className="w-8/12 flex gap-2 flex-wrap">
                          {detailMovie?.production_countries.map(
                            (item, index) => (
                              <p
                                key={index}
                                className="px-2 py-1 bg-[#fde3e3] border-2 border-red-600 rounded-lg"
                              >
                                {item.name}
                              </p>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* } */}

                  {/* link official web */}
                  {detailMovie?.homepage && (
                    <div className="bg-white px-5 py-5 rounded-sm my-4 ">
                      <Link
                        href={detailMovie.homepage}
                        className="flex gap-2 items-center w-fit hover:underline hover:underline-offset-2"
                      >
                        <FiExternalLink />
                        <p className="mt-[1px]">Go to Official Website</p>
                      </Link>
                    </div>
                  )}

                  {/* User's Review */}
                  {id && <MovieReview movieId={id} />}
                </div>
                <div>
                  <Footer />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default index;
