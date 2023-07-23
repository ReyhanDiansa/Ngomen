import React, { useState, useEffect } from "react";
import { GetReviewByMovieId } from "@/utils/MovieAPI";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa";
import ReviewModal from "../ReviewModal/MovReview";
import SpinnerLoading from "../Loading/SpinnerLoading";

const MovieReview = ({ movieId }) => {
  const [dataReview, setDataReview] = useState();
  const [isOpenModalReview, setIsOpenModalReview] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentData, setCurrentData] = useState();
  const [responseData, setResponseData] = useState();

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  useEffect(() => {
    const fetchData = async () => {
      const data = await GetReviewByMovieId({ movieId });
      setResponseData(data?.data);
      if (data?.data.success === true) {
        setDataReview(data?.data.data);
      } else {
        setDataReview(data?.data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (responseData?.success === true) {
      setCurrentData(dataReview?.slice(startIndex, endIndex));
      const totalItems = dataReview?.length;
      const totalPages = Math.ceil(totalItems / pageSize);
      setTotalPages(totalPages);
    }
  }, [dataReview, startIndex, endIndex]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClick = (reviewId) => {
    setReviewId(reviewId);
    setIsOpenModalReview(true);
  };

  const handleClose = () => {
    setIsOpenModalReview(false);
    setReviewId(null);
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
    <div>
      <div className="bg-white px-5 py-10 my-4 rounded-sm">
        <div className="text-2xl py-2">
          <p>User's Review</p>
        </div>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-3 w-full mt-7 ">
          {dataReview ? (
            dataReview.success === false ? (
              <p className="mx-auto">{dataReview.message}</p>
            ) : (
              currentData?.map((item, index) => (
                <div
                  className="bg-[#fff1f1] w-full md:w-5/12 p-3 cursor-pointer rounded-md overflow-hidden h-[10rem]"
                  onClick={(e) => handleClick(item?.review?._id)}
                  key={index}
                >
                  <div className="flex">
                    <Image
                      src={item?.user?.profile}
                      width={30}
                      height={30}
                      alt="profile"
                      className="rounded-full"
                    />
                    <p className="flex mx-2 items-center justify-center">
                      {item?.user?.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 my-2">
                    <p className="text-xs mt-1">{item?.review?.time}</p>
                    <p>•</p>
                    <div className="flex items-center gap-2">
                      <FaRegStar className="font-bold" />
                      <p>{item?.review?.rate}</p>
                    </div>
                  </div>
                  <div className="py-2">
                    <p className="w-11/12 whitespace-nowrap overflow-hidden overflow-ellipsis break-words">
                      {item.review.comment.length > 300
                        ? item.review.comment.slice(0, 300) + "..."
                        : item.review.comment}
                    </p>
                  </div>
                </div>
              ))
            )
          ) : (
            <SpinnerLoading />
          )}
        </div>
        {reviewId && (
          <ReviewModal
            onClose={handleClose}
            isOpen={isOpenModalReview}
            reviewId={reviewId}
          />
        )}
        <div className="flex  mt-20  ">{RenderPageButtons()}</div>
        {currentData && (
          <div className="m-2">
            <p>
              Page {currentPage} of {totalPages}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieReview;
