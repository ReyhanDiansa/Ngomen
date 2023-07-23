import axios from "axios";
import { getTokenCookie } from "./HandleCookie";
import  jwt  from "jsonwebtoken";

export const GetPopularMusic = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_MUSIC}/?api_key=${process.env.NEXT_PUBLIC_MUSIC_API_KEY}&format=json&page=1&method=chart.gettoptracks`;
    try {
      const response = await axios.get(url);
      return { data: response };
    } catch (error) {
      console.error(error);
      return { error: "Failed to fetch data" };
    }
}

export const GetAllMusic = async ({musicPage}) => {
    const url = `${process.env.NEXT_PUBLIC_API_MUSIC}/?api_key=${process.env.NEXT_PUBLIC_MUSIC_API_KEY}&format=json&page=${musicPage}&method=chart.gettoptracks`;
    try {
      const response = await axios.get(url);
      return { data: response };
    } catch (error) {
      console.error(error);
      return { error: "Failed to fetch data" };
    }
}

export const GetMusicDetail = async ({MusicDetail}) =>{
    const url = `${process.env.NEXT_PUBLIC_API_MUSIC}/?api_key=${process.env.NEXT_PUBLIC_MUSIC_API_KEY}&format=json&method=track.getInfo&track=${MusicDetail?.name}&artist=${MusicDetail?.artist?.name}`;
    // console.log("ur",url);
    try {
        const response = await axios.get(url);
        return { data: response };
      } catch (error) {
        console.error(error);
        return { error: "Failed to fetch data" };
      }
}

export const CheckMusicReview = async ({ musicId }) => {
  const url = `${process.env.NEXT_PUBLIC_API_HOST}/musicRev/checkReview`;
  const token = getTokenCookie();
  const userData = jwt.decode(token);

  const data = {
    user_id:userData?.googleId,
    track: musicId?.track,
    artist:musicId?.artist
  };

  try {
    const checkPerm = await axios.post(url, data);
    // console.log(checkPerm.data.add_permission);
    if (checkPerm.data.success === true) {
      return { data: checkPerm.data};
    } else {
      return { data: checkPerm.data };
    }
  } catch (error) {
    return { error };
  }
};

export const AddMusicReview = async ({ reviewData }) => {
  const url = `${process.env.NEXT_PUBLIC_API_HOST}/musicRev/add_comment`;
  const token = getTokenCookie();
  const userData = jwt.decode(token);
  const data = {
    user_id: userData.googleId,
    rate: reviewData.rate,
    comment: reviewData.comment,
    artist: reviewData.artist,
    track:reviewData.track
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

export const GetReviewMusById = async ({ reviewId }) => {
  const url = `${process.env.NEXT_PUBLIC_API_HOST}/musicRev/find_musReview/${reviewId}`;
  try {
    const data = await axios.get(url);
    return { data: data.data.data };
  } catch (error) {
    console.log(error);
  }
};

export const GetReviewByMusicId = async ({ musicId }) => {
  const url = `${process.env.NEXT_PUBLIC_API_HOST}/musicRev/findByMusicId`;
  const dataMovie = {
    track: musicId.track,
    artist:musicId.artist
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

export const GetMusicByTitle = async ({musicKeyword}) => {
  const url = `${process.env.NEXT_PUBLIC_API_MUSIC}/?api_key=${process.env.NEXT_PUBLIC_MUSIC_API_KEY}&format=json&track=${musicKeyword}&method=track.search`;
  try {
    const response = await axios.get(url);
    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch data" };
  }
}
