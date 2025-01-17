import Image from "next/image";
import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt from "jsonwebtoken";
import { UserLogin } from "../../utils/LoginApi";
import { useRouter } from "next/router";
import SpinnerLoading from "@/components/Loading/SpinnerLoading";
import Head from "next/head";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const googleLogin = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isSuccess = async (credentialResponse) => {
    const data = jwt.decode(credentialResponse.credential);
    setIsLoading(true);
    const userData = {
      email: data.email,
      googleId: data.sub,
      name: data.name,
      profile: data.picture,
    };
    try {
      await UserLogin(userData);
      setTimeout(() => {
        setIsLoading(false);
        router.push("/");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  const isFailed = () => {
    setIsError(true);
  };

  return (
    <>
      {isLoading && <SpinnerLoading />}
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENTID}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            isSuccess(credentialResponse);
          }}
          onError={isFailed}
          useOneTap
          className="mx-auto flex justify-center"
        />
      </GoogleOAuthProvider>
      {isError && (
        <div className="mx-auto flex justify-center py-3 text-sm text-red-600">
          <p>Login Failed</p>
        </div>
      )}
    </>
  );
};
const index = () => {
  const date = new Date();
  const year = date.getFullYear();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Login | Ngomen</title>
        <meta
          name="description"
          content="Login to our dynamic movie and music review platform and become part of a passionate community of film and music lovers. Share your thoughts, critiques, and comments on your favorite movies and songs sourced from TMDB API and Last.fm API. Join us now to rate and review the latest releases, engage in meaningful discussions, and be a part of an exciting world of entertainment!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/logo_title.svg" />
        <meta property="og:title" content="Ngomen Login" />
        <meta
          property="og:description"
          content="Login to our dynamic movie and music review platform and become part of a passionate community of film and music lovers. Share your thoughts, critiques, and comments on your favorite movies and songs sourced from TMDB API and Last.fm API. Join us now to rate and review the latest releases, engage in meaningful discussions, and be a part of an exciting world of entertainment!"
        />
      </Head>
      <div className="w-full bg-white h-full">
        <div className="bg-white border-2 shadow-md  rounded-md flex flex-col-reverse md:flex-row w-10/12 md:w-8/12 my-20 md:h-[35rem] mx-auto justify-between">
          <div className="w-full md:w-6/12 flex flex-col my-7 items-center justify-center ">
            <div className="mx-auto my-4">
              <Image src={"/logo/black.svg"} width={200} height={200} />
            </div>
            <div className="mx-auto text-center  text-xs w-8/12">
              <p>
                Welcome to our film and music review website! Discover the
                latest reviews, film recommendations, and popular music. Share
                your thoughts on your favorite films and music.
              </p>
            </div>
            <div className="mx-auto  md:w-5/12 justify-center flex flex-col my-14">
              {googleLogin()}
            </div>
            <div
              className="text-xs flex items-center cursor-pointer underline underline-offset-2 gap-1 md:gap-2 text-blue-600"
              onClick={() => router.push("/")}
            >
              {/* <FiArrowLeft /> */}
              <p>Back to Home</p>
            </div>
            <div className="text-sm text-gray-500">
              <p>© {year} Ngomen All rights reserved.</p>
            </div>
          </div>
          <div className="hidden md:flex md:w-7/12 p-3 bg-slate-50 items-center justify-center">
            <Image src={"/images/login_illus.svg"} width={500} height={500} />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
