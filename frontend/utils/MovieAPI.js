import axios from "axios";
import { getTokenCookie } from "./HandleCookie";
import jwt from "jsonwebtoken";

export const GetPopularMovie = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_MOVIE}/movie/popular?page=1`;
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_BEARER_TOKEN}`,
    },
  };
  try {
    const response = await axios.get(url, options);
    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch data" };
  }
};

export const GetAllPopularMovie = async ({ moviePage }) => {
  const url = `${process.env.NEXT_PUBLIC_API_MOVIE}/movie/popular?page=${moviePage}`;
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_BEARER_TOKEN}`,
    },
  };
  try {
    const response = await axios.get(url, options);
    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch data" };
  }
};

export const GetMovieDetail = async ({ movieId }) => {
  const url = `${process.env.NEXT_PUBLIC_API_MOVIE}/movie/${movieId}`;
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_BEARER_TOKEN}`,
    },
  };
  try {
    const response = await axios.get(url, options);
    return { success: true, data: response };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to fetch data" };
  }
};

export const GetReviewByMovieId = async ({ movieId, currentPage }) => {
  const url = `${process.env.NEXT_PUBLIC_API_HOST}/filmRev/findByMovieId?page=${currentPage}`;
  const dataMovie = {
    movie_id: movieId,
  };
  try {
    const data = await axios.post(url, dataMovie);
    if (data.data.success === false) {
      return { data: data.data };
    } else {
      return { data: data.data };
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetReviewById = async ({ reviewId }) => {
  const url = `${process.env.NEXT_PUBLIC_API_HOST}/filmRev/find_movReview/${reviewId}`;
  try {
    const data = await axios.get(url);
    return { data: data.data.data };
  } catch (error) {
    console.log(error);
  }
};

export const AddMovieReview = async ({ reviewData }) => {
  const url = `${process.env.NEXT_PUBLIC_API_HOST}/filmRev/add_comment`;
  const token = getTokenCookie();
  const userData = jwt.decode(token);
  const data = {
    user_id: userData.googleId,
    rate: reviewData.rate,
    comment: reviewData.comment,
    movie_id: reviewData.movie_id,
  };
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    await axios.post(url, data, options);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const CheckMovieReview = async ({ movieId }) => {
  const url = `${process.env.NEXT_PUBLIC_API_HOST}/filmRev/checkReview`;
  const token = getTokenCookie();
  const userData = jwt.decode(token);

  const data = {
    user_id: userData?.googleId,
    movie_id: movieId,
  };

  try {
    const checkPerm = await axios.post(url, data);
    // console.log(checkPerm.data.add_permission);
    if (checkPerm.data.success === true) {
      return { data: checkPerm.data };
    } else {
      return { data: checkPerm.data };
    }
  } catch (error) {
    return { error };
  }
};

export const GetAllMovie = async ({ moviePage }) => {
  const url = `${process.env.NEXT_PUBLIC_API_MOVIE}/discover/movie?page=${moviePage}`;
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_BEARER_TOKEN}`,
    },
  };
  try {
    const response = await axios.get(url, options);
    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch data" };
  }
};

export const GetMovieByTitle = async ({ movieKeyword }) => {
  const url = `${process.env.NEXT_PUBLIC_API_MOVIE}/search/movie?query=${movieKeyword}`;
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_BEARER_TOKEN}`,
    },
  };
  try {
    const response = await axios.get(url, options);
    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch data" };
  }
};
