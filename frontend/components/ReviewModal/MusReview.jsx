import { GetReviewMusById } from "@/utils/MusicAPI";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaRegStar } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const ReviewModalMus = ({ reviewId, isOpen, onClose }) => {
  const [detailReview, setDetailReview] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = await GetReviewMusById({ reviewId });
      setDetailReview(data?.data);
    };
    fetchData();
  }, []);

  if (!isOpen) return null;

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
        <div className="overflow-auto bg-white  rounded-md w-full mx-4 md:mx-0 md:w-[30rem] md:max-h-[30rem] max-h-[35rem]">
          <div className="flex justify-between fixed bg-white w-11/12 md:w-[30rem] p-3 ">
            <h1>COMMENT AND REVIEW DETAIL</h1>
            <div onClick={onClose}>
              <AiOutlineClose className="cursor-pointer mt-1 md:mt-0 " />
            </div>
          </div>
          {detailReview ? (
            <>
              <div className="flex mt-14 mx-3 ">
                <Image
                  src={detailReview?.user?.profile}
                  width={30}
                  height={30}
                  alt="profile"
                  className="rounded-full"
                />
                <p className="flex mx-2 items-center justify-center">
                  {detailReview?.user?.name}
                </p>
              </div>
              <div className="flex items-center gap-3 my-2 mx-3">
                <p className="text-xs mt-1">{detailReview?.review?.time}</p>
                <p>•</p>
                <div className="flex items-center gap-2">
                  <FaRegStar className="font-bold" />
                  <p>{detailReview?.review?.rate?.$numberDecimal}</p>
                </div>
              </div>
              <div className="mx-3 my-4 w-11/12 break-words">
                {detailReview?.review?.comment}
              </div>
            </>
          ) : (
            <div role="status" class="animate-pulse mx-3 my-12">
              <div class="flex items-center  my-4">
                <svg
                  class="w-8 h-8 text-gray-200 dark:text-gray-700 mr-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <div class="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mr-3"></div>
                <div class="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ReviewModalMus;
