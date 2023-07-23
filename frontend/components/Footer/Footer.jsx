import React from "react";
import Link from "next/link";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="mt-12 w-full h-full py-5 bg-black text-white ">
      <div className="container mx-auto h-full flex flex-col justify-center items-center">
        <div className="flex justify-center items-center gap-8 py-4 text-xl">
          <Link href="https://www.instagram.com/reyhanmd._">
            <FaInstagram className="cursor-pointer" />
          </Link>
          <Link href="https://www.linkedin.com/in/reyhan-marsalino-diansa-02052a247/">
            <FaLinkedin className="cursor-pointer" />
          </Link>
          <Link href="mailto:reyhandiansa@gmail.com">
            <MdEmail className="cursor-pointer" />
          </Link>
        </div>

        <div className="flex justify-center items-center gap-10 my-4">
          <h4>
            <Link href="/" className="text-white">
              Home
            </Link>
          </h4>
          <h4>
            <Link href="/Movie" className="text-white">
              Movie
            </Link>
          </h4>
          <h4>
            <Link href="/Music" className="text-white">
              Music
            </Link>
          </h4>
        </div>

        <div className="text-center mt-6">Copyright © {year}</div>
      </div>
    </footer>
  );
};

export default Footer;
