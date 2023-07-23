import Image from "next/image";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa";

const MovieCard = ({ movieDetail }) => {
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";
  const date = new Date(movieDetail.release_date);
  const year = date.getFullYear();
  return (
    <>
      <Link href={`/Movie/Detail/${movieDetail.id}`}>
        <div className="relative group cursor-pointer w-[15rem] text-black">
          <Image
            src={`${baseImageUrl}${movieDetail.poster_path}`}
            alt={movieDetail.title}
            width={240}
            height={240}
            className="rounded-md "
          />
          <div className="absolute inset-0  w-full opacity-0 bg-black bg-opacity-75 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
            <div className="text-white bg-[#EB4A4A] flex w-fit absolute right-0 p-2 rounded-bl-lg rounded-tr-sm gap-1 items-center">
              <div>
                <FaRegStar />
              </div>
              <p className="pt-[2px]">{movieDetail.vote_average}</p>
            </div>
            <div className="absolute bottom-0">
              <p className=" items-end text-gray-400 px-2 ">
                {movieDetail.title} ({year})
              </p>
              {/* <p className=" items-end text-gray-400 px-2 ">{year}</p> */}
              {movieDetail?.overview !== "" && (
                <p className="text-white items-end px-2 pt-2 pb-3 text-xs w-fit">
                  {movieDetail.overview.slice(0, 120) + "..."}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-[100%]">
          <p className="mt-3 text-black text-sm">
            {movieDetail.title.length > 30
              ? movieDetail.title.slice(0, 30) + "..."
              : movieDetail.title}
          </p>
        </div>
      </Link>
    </>
  );
};

export default MovieCard;
