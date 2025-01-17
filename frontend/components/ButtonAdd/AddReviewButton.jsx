import { getTokenCookie } from "@/utils/HandleCookie";
import React, { useState, useEffect } from "react";
import AddReviewMov from "@/components/MovieModal/AddReviewMov";
import AddReviewMus from "@/components/MusicModal/AddReviewMus";
import { FaCheck } from "react-icons/fa";
import { CheckMusicReview } from "@/utils/MusicAPI";
import { CheckMovieReview } from "../../utils/MovieAPI";
import SpinnerLoading from "../Loading/SpinnerLoading";

const AddReviewButton = ({ type, checkId, itemDetail }) => {
  const [checkResponse, setCheckResponse] = useState();
  const [isModalMovieOpen, setIsModalMovieOpen] = useState(false);
  const [isModalMusicOpen, setIsModalMusicOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const token = getTokenCookie();
  useEffect(() => {
    setIsLoading(true);
    const fetchToken = async () => {
      if (token !== null || token !== undefined) {
        if (type === "movie") {
          const fetchCheck = await CheckMovieReview({ movieId: checkId });
          setCheckResponse(fetchCheck);
          setIsLoading(false);
        } else if (type === "music") {
          const fetchCheck = await CheckMusicReview({ musicId: checkId });
          setCheckResponse(fetchCheck);
          setIsLoading(false);
        }
      }
    };
    fetchToken();
  }, [checkId]);

  const closeModalMovie = () => {
    setIsModalMovieOpen(false);
  };

  const closeModalMusic = () => {
    setIsModalMusicOpen(false);
  };

  const renderModal = () => {
    if (isModalMovieOpen) {
      return (
        <AddReviewMov
          isOpen={isModalMovieOpen}
          movieDetail={itemDetail}
          onClose={closeModalMovie}
          movieId={checkId}
        />
      );
    }

    if (isModalMusicOpen) {
      return (
        <AddReviewMus
          isOpen={isModalMusicOpen}
          onClose={() => closeModalMusic()}
          musicId={checkId}
        />
      );
    }

    return null;
  };

  const openModal = () => {
    if (type === "music") {
      setIsModalMusicOpen(true);
    } else if (type === "movie") {
      setIsModalMovieOpen(true);
    }
  };

  if (isLoading) {
    return (
      <>
        <button className="bg-transparent px-3 hover:bg-[#EB4A4A] hover:text-white border-2 border-[#EB4A4A]">
          <SpinnerLoading />
        </button>
      </>
    );
  }

  if (
    token === null ||
    token === undefined ||
    !token ||
    token === "undefined"
  ) {
    return (
      <>
        {renderModal()}
        <button
          className="bg-transparent p-2 hover:bg-[#EB4A4A] hover:text-white border-2 border-[#EB4A4A]"
          onClick={openModal}
        >
          Add Review
        </button>
      </>
    );
  } else if (checkResponse?.data?.add_permission === true) {
    return (
      <>
        {renderModal()}
        <button
          className="bg-transparent p-2 hover:bg-[#EB4A4A] hover:text-white border-2 border-[#EB4A4A]"
          onClick={openModal}
        >
          Add Review
        </button>
      </>
    );
  } else {
    return (
      <div className="flex gap-2 items-center justify-end p-2 border border-[#EB4A4A]">
        <FaCheck />
        <p>Kamu sudah mereview {type === "music" ? "music" : "film"} ini</p>
      </div>
    );
  }
};

export default AddReviewButton;
