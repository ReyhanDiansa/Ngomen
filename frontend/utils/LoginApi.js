import axios from "axios";
import { setTokenCookie } from './HandleCookie';



export const UserLogin = async (userData) => {
  const url = `${process.env.NEXT_PUBLIC_API_HOST}/user/login`;
  const data = {
    email:userData.email,
    googleId:userData.googleId,
    name:userData.name,
    profile:userData.profile
  }
  try {
    const response = await axios.post(url, data);
    const token = response.data.data.token
    setTokenCookie(token);
    return { data: response }
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch data" };
  }
};