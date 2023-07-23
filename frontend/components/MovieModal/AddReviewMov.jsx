import React, { useState, useEffect } from "react";
import withAuth from "@/utils/WithAuth";
import { AddMovieReview } from "@/utils/MovieAPI";

const AddReviewMov = ({ movieDetail, isOpen, onClose, movieId }) => {
  const [rate, setRate] = useState("");
  const [comment, setComment] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSend = async () => {
    setButtonLoading(true);
    const data = {
      rate,
      comment,
      movie_id: movieId,
    };

    const isValid = /^([1-9]|10)(\.\d{1,2})?$/.test(data.rate);
    if (isValid) {
      try {
        await AddMovieReview({ reviewData: data });
        setButtonLoading(false);
        setErrorMessage("");
        setIsError(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 5000);
      } catch (error) {
        setErrorMessage("");
        setIsSuccess(false);
        setIsError(true);
      }
    } else {
      setIsSuccess(false);
      setIsError(false);
      setButtonLoading(false);
      setErrorMessage("Please add correct rate between 1.0-10.0!!!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="overflow-auto bg-white p-6 rounded-md w-full md:mx-0 mx-4 md:w-[30rem] max-h-[35rem] md:max-h-[30rem]">
        <h1>ADD YOUR COMMENT AND REVIEW</h1>

        {/* alert */}
        {isSuccess && (
          <div
            id="alert-border-3"
            class="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
            role="alert"
          >
            <svg
              class="flex-shrink-0 w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div class="ml-3 text-sm font-medium">
              Success Add Movie Review
              <p className="text-xs">
                You will automatic redirect to previous page and{" "}
                <span className="font-bold">Please refresh the page!!!</span>
              </p>
            </div>
          </div>
        )}
        {isError && (
          <div
            id="alert-border-2"
            class="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
            role="alert"
          >
            <svg
              class="flex-shrink-0 w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div class="ml-3 text-sm font-medium">
              Failed Add Movie Review
              <p className="text-xs">Please try Again</p>
            </div>
          </div>
        )}
        {errorMessage !== "" && (
          <div
            id="alert-border-2"
            class="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
            role="alert"
          >
            <svg
              class="flex-shrink-0 w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div class="ml-3 text-sm font-medium">
              Failed Add Movie Review
              <p className="text-xs">{errorMessage}</p>
            </div>
          </div>
        )}

        <div className="my-4">
          <label
            for="helper-text"
            className="block mb-2 text-sm font-medium text-black "
          >
            Rate
          </label>
          <input
            type="text"
            id="helper-text"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-[#EB4A4A] text-gray-900 text-sm rounded-lg active:border-[#EB4A4A] focus:border-[#EB4A4A] focus:border block w-full p-2.5 outline-none"
            placeholder="eg. 8.6"
            onChange={(e) => setRate(e.target.value)}
          />
          <p
            id="helper-text-explanation"
            className="mt-2 text-xs text-gray-500 dark:text-gray-400"
          >
            Enter the rating you want to give from 1.0 - 10.0
          </p>
        </div>
        <div>
          <label
            for="message"
            className="block mb-2 text-sm font-medium text-black "
          >
            Comment / Review
          </label>
          <textarea
            id="message"
            rows="4"
            className="bg-gray-50 border border-[#EB4A4A] text-gray-900 text-sm rounded-lg active:border-[#EB4A4A] focus:border-[#EB4A4A] focus:border block w-full p-2.5 outline-none"
            placeholder="Write your thoughts here..."
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <p
            id="helper-text-explanation"
            className="mt-2 text-xs text-gray-500 dark:text-gray-400"
          >
            Enter your comment, review, and critiques for this film
          </p>
        </div>
        <div className="flex gap-5 mt-8">
          <button
            onClick={handleSend}
            className="mt-4 py-2 px-4 bg-transparant border-2 border-[#EB4A4A] text-black rounded-md flex gap-1 items-center "
          >
            {buttonLoading ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 mr-3 text-black animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                <p>Loading....</p>
              </>
            ) : (
              "Send"
            )}
          </button>
          <button
            className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
        <p
          id="helper-text-explanation"
          className="mt-2 text-xs text-gray-500 dark:text-gray-400"
        >
          You can only post a comment once, make sure it's correct
        </p>
      </div>
    </div>
  );
};

export default withAuth(AddReviewMov);
