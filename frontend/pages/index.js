import AboutUs from "@/components/AboutUs/AboutUs";
import Footer from "@/components/Footer/Footer";
import { Hero } from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import PopularMovie from "@/components/Popular/PopularMovie";
import PopularMusic from "@/components/Popular/PopularMusic";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ngomen</title>
        <meta
          name="description"
          content="Ngomen is a platform that offers a unique experience for movie and music enthusiasts. It is the perfect destination for those who love to explore and discuss their favorite films and songs. Whether you're seeking reviews, critiques, or lively conversations, Ngomen provides a vibrant community where you can immerse yourself in the world of entertainment. Join us now and become part of a passionate community that shares your love for the arts. Embrace your passion for cinema and music, express your thoughts, and engage with like-minded individuals in a welcoming and engaging atmosphere. Ngomen is where your opinions matter and your voice is heard!
          "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/logo_title.svg" />
        <meta property="og:title" content="Ngomen" />
        <meta
          property="og:description"
          content="Ngomen is a platform that offers a unique experience for movie and music enthusiasts. It is the perfect destination for those who love to explore and discuss their favorite films and songs. Whether you're seeking reviews, critiques, or lively conversations, Ngomen provides a vibrant community where you can immerse yourself in the world of entertainment. Join us now and become part of a passionate community that shares your love for the arts. Embrace your passion for cinema and music, express your thoughts, and engage with like-minded individuals in a welcoming and engaging atmosphere. Ngomen is where your opinions matter and your voice is heard!"
        />
      </Head>
      <div className="bg-cover bg-[url('/images/hero-bg.jpg')] h-full">
        <div>
          <Navbar />
        </div>
        <div>
          <Hero />
        </div>
      </div>
      <div className="pt-36" id="popular">
        <div className="text-4xl text-center">
          <h2>
            <span className="border-b-[3px] border-[#EB4A4A]">Popular</span>{" "}
            <span className=" text-[#EB4A4A]">Movie's</span>
          </h2>
        </div>
        <PopularMovie />
      </div>
      <div className="pt-20">
        <div className="text-4xl text-center">
          <h2>
            <span className=" text-[#EB4A4A]">Popular</span>{" "}
            <span className="border-b-[3px] border-[#EB4A4A]">Music's</span>
          </h2>
        </div>
        <PopularMusic />
      </div>

      <div className="pt-36">
        <div className="text-4xl text-center">
          <h2>
            <span className="border-b-[3px] border-[#EB4A4A]">About</span>{" "}
            <span className=" text-[#EB4A4A]">Us</span>
          </h2>
        </div>
        <AboutUs />
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}
