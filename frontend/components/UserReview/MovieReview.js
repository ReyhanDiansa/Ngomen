import React, { useState, useEffect } from "react";
import { GetReviewByMovieId } from "@/utils/MovieAPI";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa";
import ReviewModal from "../ReviewModal/MovReview";
import SpinnerLoading from "../Loading/SpinnerLoading";
import { Pagination } from "@nextui-org/react";
import StarRatings from "react-star-ratings";

const MovieReview = ({ movieId }) => {
  const [dataReview, setDataReview] = useState();
  const [isOpenModalReview, setIsOpenModalReview] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [responseData, setResponseData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetReviewByMovieId({ movieId, currentPage });
      setResponseData(data?.data);
      if (data?.data.success === true) {
        setDataReview(data?.data?.result?.data);
      } else {
        setDataReview(data?.data);
      }
    };
    fetchData();
  }, [currentPage]);

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

  return (
    <div>
      <div className="bg-white px-5 py-10 my-4 rounded-sm">
        <div className="text-2xl flex md:flex-row flex-col justify-between py-2">
          <p>User's Review</p>
          {dataReview?.length > 0 && (
            <div className="flex md:flex-row flex-col md:items-center nd:gap-1 md:mt-0 mt-1">
              <StarRatings
                rating={responseData?.averageRate}
                starRatedColor={"#ffd700"}
                numberOfStars={10}
                name="rating"
                starDimension="20px"
                starSpacing="2px"
              />
              <p className="text-base mt-1 font-semibold">
                {responseData?.averageRate}{" "}
                <span className="text-xs font-normal">
                  {" "}
                  (rate avg by Ngomen User's){" "}
                </span>
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-3 w-full mt-7 ">
          {dataReview ? (
            responseData?.success === false ? (
              <p className="mx-auto">{dataReview.message}</p>
            ) : (
              dataReview?.map((item, index) => (
                <div
                  className="bg-[#fce6e6] border-2 border-red-600 w-full md:w-5/12 p-3 cursor-pointer rounded-md overflow-hidden h-[10rem]"
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
                      <p>{item?.review?.rate?.$numberDecimal}</p>
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
        {dataReview?.length > 0 && (
          <div className="flex  mt-10">
            <Pagination
              showControls
              total={responseData?.result?.meta?.total_pages}
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
      </div>
    </div>
  );
};

export default MovieReview;
