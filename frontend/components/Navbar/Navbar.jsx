import React, { useState, useEffect } from "react";
import { MenuData } from "./menuData";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaBars, FaUserAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import styles from "../../styles/Navbar.module.css";
import jwt from "jsonwebtoken";
import { getTokenCookie } from "../../utils/HandleCookie";
import { CiLogout } from "react-icons/ci";
import { removeTokenCookie } from "../../utils/HandleCookie";

const Navbar = () => {
  const router = useRouter();
  const [mobile, setMobile] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [isScroll, setisScroll] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    setToken(getTokenCookie());
    setUserData(jwt.decode(token));
  }, [token]);

  const { asPath } = router;

  const pathName = asPath?.split("/").find((res) => res) || "/";
  const activeMenuItem = MenuData.find((item) => {
    if (item.url === "/" && pathName === "/") {
      return true;
    }
    return pathName === item.url.slice(1);
  });

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setisScroll(true);
      } else {
        setisScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll); // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    setisOpen(!isOpen);
  };

  const handleLogOut = () => {
    try {
      removeTokenCookie();
      router.push("/Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed z-20 w-full  ${
        isScroll
          ? mobile
            ? "bg-black"
            : "bg-black"
          : pathName !== "/"
          ? "bg-black"
          : ""
      }`}
    >
      {!mobile ? (
        <div className="flex px-16 py-3 justify-between items-center text-white">
          <div>
            <Image
              src={"/logo/logo.svg"}
              width={150}
              height={150}
              alt="ngomen logo"
            />
          </div>
          <div className="flex gap-16 items-center text-center">
            <div className="flex md:gap-5 lg:gap-24">
              {MenuData.map((item, index) => (
                <div key={index}>
                  <Link href={item.url}>
                    <p
                      className={`p-2 ${
                        activeMenuItem &&
                        activeMenuItem.id === item.id &&
                        "border-b-2  border-[#EB4A4A] p-2"
                      }`}
                    >
                      {item.name}
                    </p>
                  </Link>
                </div>
              ))}
            </div>

            {userData ? (
              <section className="relative">
                <div className="bg-white rounded-full p-1 w-8/12">
                  <Image
                    src={userData.profile}
                    width={50}
                    height={50}
                    className="rounded-full cursor-pointer"
                    onClick={() => setOpenDropdown(!openDropdown)}
                  />
                </div>
                {openDropdown && (
                  <div className="absolute w-[10rem] top-12 text-black right-6 bg-white p-2 rounded-b-md rounded-tl-md ">
                    <div className="py-3  border-b-2 border-black">
                      <h1 className="font-semibold">{userData.name}</h1>
                      <p className="text-gray-500 break-words text-xs ">
                        {userData.email}
                      </p>
                    </div>
                    <div
                      className="flex py-5 gap-1 items-center justify-center hover:bg-slate-200 cursor-pointer my-2 hover:rounded-2xl"
                      onClick={handleLogOut}
                    >
                      <CiLogout className="text-2xl" />
                      <p>Logout</p>
                    </div>
                  </div>
                )}
              </section>
            ) : (
              <Link href={"/Login"}>
                <div className="bg-white text-[#EB4A4A] rounded-lg py-2 px-4 flex gap-2 justify-center items-center cursor-pointer hover:bg-transparent hover:border hover:border-[#EB4A4A]">
                  <FaUserAlt />
                  <p className=" font-semibold">Login</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="flex px-5  py-3 justify-between items-center text-black">
          <div className="w-4/12">
            <Image
              src={"/logo/logo.svg"}
              width={150}
              height={150}
              alt="ngomen logo"
            />
          </div>
          <div className={isOpen ? styles.overlay : ""}>
            <div
              onClick={handleClick}
              className="text-white cursor-pointer fixed right-8 top-6 text-lg"
            >
              {isOpen ? <AiOutlineClose /> : <FaBars />}
            </div>
            {isOpen && (
              <>
                <div
                  className={`fixed right-0 top-14 h-[24rem] rounded w-56 bg-white transform ${
                    isOpen ? styles.open_sidebar : styles.close_sidebar
                  }`}
                >
                  {MenuData.map((item, index) => (
                    <div key={index}>
                      <Link href={item.url}>
                        <p
                          className={`my-5 py-5 text-center ${
                            activeMenuItem &&
                        activeMenuItem.id === item.id 
                              ? "text-[#EB4A4A] text-lg font-semibold"
                              : ""
                          }`}
                        >
                          {item.name}
                        </p>
                      </Link>
                    </div>
                  ))}
                  {userData ? (
                    <section className="relative">
                      <div
                        className="bg-white p-3 w-fit mx-auto flex gap-2 items-center cursor-pointer hover:rounded-lg hover:bg-slate-200"
                        onClick={() => setOpenDropdown(!openDropdown)}
                      >
                        <Image
                          src={userData.profile}
                          width={50}
                          height={50}
                          className="rounded-full "
                        />
                        <p>{userData.name}</p>
                      </div>
                      {openDropdown && (
                        <div className="absolute w-[10rem] top-20 text-black right-6 bg-white p-2 rounded-b-md rounded-tl-md ">
                          <div className="py-3  border-b-2 border-black flex flex-col justify-center items-center">
                            <h1 className="font-semibold">{userData.name}</h1>
                            <p className="text-gray-500 break-words text-xs ">
                              {userData.email}
                            </p>
                          </div>
                          <div
                            className="flex py-5 gap-1 items-center justify-center hover:bg-slate-200 cursor-pointer my-2 hover:rounded-2xl"
                            onClick={handleLogOut}
                          >
                            <CiLogout className="text-2xl" />
                            <p>Logout</p>
                          </div>
                        </div>
                      )}
                    </section>
                  ) : (
                    <Link href={"/Login"}>
                      <div className="bg-white text-[#EB4A4A] py-5 px-4 flex gap-2 justify-center items-center  hover:bg-slate-200 cursor-pointer my-2">
                        <FaUserAlt />
                        <p className=" font-semibold">Login</p>
                      </div>
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
