import Image from "next/image";
import Link from "next/link";
import { AiOutlineSound } from "react-icons/ai";
import React, { useState } from "react";

const MusicCard = ({ MusicDetail }) => {
  const [imageError, setImageError] = useState(false);
  const listener = parseInt(MusicDetail?.listeners);
  const urlError =
    "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png";

  return (
    <>
      <Link
        href={`/Music/Detail/${MusicDetail?.name}/${MusicDetail?.artist?.name}`}
      >
        <div className="relative group cursor-pointer w-[15rem] text-black">
          <Image
            src={imageError ? urlError : MusicDetail?.album?.image[3]["#text"]}
            alt={MusicDetail?.name || "music poster"}
            width={240}
            height={240}
            className="rounded-md"
            onError={() => setImageError(true)}
          />

          <div className="absolute inset-0  w-full opacity-0 bg-black bg-opacity-75 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
            <div className="text-white bg-[#EB4A4A] flex w-fit absolute right-0 p-2 rounded-bl-lg rounded-tr-sm gap-1 items-center">
              <div className="mt-[1px]">
                <AiOutlineSound />
              </div>
              <p className="pt-[2px]">{listener}</p>
            </div>
            <div className="absolute bottom-0 w-11/12">
              <p className="items-end text-gray-400 px-2 w-fit">
                {MusicDetail?.name} ({MusicDetail?.artist?.name})
              </p>
              <p className="text-white items-end px-2 pt-2 pb-3 text-xs  break-words">
                {MusicDetail?.wiki?.summary !== undefined &&
                  MusicDetail?.wiki?.summary?.slice(0, 120) + "..."}
              </p>
            </div>
          </div>
        </div>
      </Link>
      <div className="w-[100%]">
        <p className="mt-3 text-black text-sm">
          {MusicDetail?.name?.length > 30
            ? MusicDetail?.name?.slice(0, 30) + "..."
            : MusicDetail?.name}
        </p>
      </div>
    </>
  );
};

export default MusicCard;
