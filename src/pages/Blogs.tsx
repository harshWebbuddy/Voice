"use client";

import { Link, Search } from "lucide-react";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { blogs, blogTags } from "@/lib/blogs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Blogs() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="p-4 sm:p-8 md:p-0  mt-10 max-w-[1480px] mx-auto">
        <div className="space-y-4">
          <h1 className="text-[18px] sm:text-[28px] md:text-[42px] max-w-4xl mx-auto leading-normal text-center font-semibold bg-gradient-to-b from-teal-500 to-teal-600 bg-clip-text text-transparent">
            We don't merely transcribe words; we craft them too.
          </h1>
          <div className="ring-1 ring-teal-200 p-1 sm:p-3 text-[14px] sm:text-[16px] md:text-[18px] md:p-4 rounded-full max-w-md sm:max-w-xl md:max-w-3xl mx-auto flex items-center gap-4">
            <Search className="text-teal-500" />
            <input
              type="search"
              placeholder="Search"
              className="w-full flex items-center"
            />
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row w-full max-w-[1220px] my-8 sm:my-12 md:my-20 sm:max-h-[500px] md:max-h-[640px] h-full items-center bg-white/80 rounded-[30px] border-teal-200 border shadow-lg mx-auto hover:shadow-teal-100 transition-all duration-300"
          data-aos="fade-up"
        >
          <div className="flex flex-col gap-y-4 sm:gap-y-6 md:gap-y-10 sm:mb-10 md:mb-20 items-start justify-start pl-4 sm:pl-6 md:pl-10 py-6 sm:pr-20 md:pr-44">
            <div className="flex items-start justify-start">
              {blogTags.map(
                (tag, index) =>
                  index === 1 && (
                    <div
                      key={index}
                      className="p-2 sm:p-2 md:p-0 px-4 sm:px-5 md:px-6 py-2 sm:py-2 md:py-3 font-bold cursor-pointer text-[10px] sm:text-[12px] md:text-[14px] rounded-full max-w-fit shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                      style={{ backgroundColor: tag.theme_color }}
                    >
                      {tag.tage_title}
                    </div>
                  )
              )}
            </div>
            <div className="flex flex-col gap-y-2 sm:gap-y-4 md:gap-y-6 items-start justify-start">
              <h1 className="text-[18px] sm:text-[24px] md:text-[32px] w-full leading-normal text-start font-semibold bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                What is Sales Planning? How to Create a Sales Plan
              </h1>
              <div className="flex items-center gap-x-4">
                <img
                  src="/1.jpg"
                  width={50}
                  height={50}
                  alt="Author image"
                  className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] md:w-[60px] md:h-[60px] object-cover rounded-full"
                />
                <span>
                  <h2 className="font-bold text-[12px] sm:text-[14px] md:text-[16px] text-gray-700">
                    Josh Gould
                  </h2>
                  <p className="text-[10px] sm:text-[12px] md:text-[14px] text-gray-500">
                    February 13, 2024
                  </p>
                </span>
              </div>
              <p className="max-w-md text-[12px] sm:text-[14px] md:text-[18px] font-medium text-gray-600">
                Sales planning is a fundamental component of sound selling.
                After all, you can't structure an effective sales effort if you
                don't have, well, structure.
              </p>
            </div>
          </div>
          <div className="relative w-full h-full justify-end items-end">
            <img
              src="/rightside.svg"
              width={624}
              height={640}
              alt="Sales planning image"
              className="rounded-r-[30px] shadow-lg"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 my-8 sm:my-10">
          {blogTags.map((tag, index) => (
            <div
              key={index}
              className={`p-2 md:p-0 px-4 sm:px-5 md:py-3 font-bold cursor-pointer md:px-6 text-[10px] sm:text-[12px] md:text-[14px] rounded-full max-w-fit shadow-md hover:shadow-lg transition-all duration-300 ease-in-out ${
                index === 0 && "text-white"
              }`}
              style={{ backgroundColor: tag.theme_color }}
            >
              {tag.tage_title}
            </div>
          ))}
        </div>
        {/* final */}
        {/* <div>
        <h1 className="text-[18px] sm:text-2xl md:text-3xl font-semibold">
          All articles
        </h1>
        {blogs.map((item, index) => (
          <Link href={item.href || " "}>
            <div
              key={index}
              className="p-4 sm:p-6 md:p-0 mt-10 space-y-4 sm:space-y-6 flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 items-center shadow-box-sm bg-white rounded-3xl border border-[#E8E8E8]"
            >
              <div className="relative w-full flex justify-center items-center">
                <img
                  src={item.background_poster}
                  alt="blog"
                  height={1000}
                  width={1000}
                  className="w-full rounded-3xl sm:rounded-3xl md:rounded-l-3xl"
                />
                <div className="absolute inset-10 flex justify-center items-center">
                  <img
                    src={item.banner_img}
                    alt="blog"
                    height={520}
                    width={520}
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col sm:flex-col md:flex-row justify-between gap-y-4 sm:gap-y-2 md:gap-y-4 gap-x-3">
                <div className="space-y-2 sm:space-y-4 md:space-y-6">
                  <div
                    className="md:py-3 px-4 py-2 sm:px-4 md:px-5 font-semibold text-[10px] sm:text-[12px] md:text-[14px] rounded-full max-w-fit"
                    style={{ backgroundColor: item.tag.theme_color }}
                  >
                    {item.tag.tage_title}
                  </div>
                  <h1 className="text-[18px] sm:text-xl md:text-3xl leading-normal font-semibold bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
                    {item.title}
                  </h1>
                  <p className="text-[12px] sm:text-[14px] md:text-[14px] leading-relaxed max-w-5xl">
                    {item.description}
                  </p>
                  <div className="flex gap-2 items-center">
                    <img
                      src={item.author.profile_img}
                      alt=""
                      width={1000}
                      height={1000}
                      className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] md:w-[60px] md:h-[60px] object-cover rounded-full"
                    />
                    <div>
                      <h1 className="text-[12px] sm:text-[14px] md:text-[14px] font-semibold">
                        {item.author.names}
                      </h1>
                      <p className="text-[10px] sm:text-[12px] md:text-sm text-[#041D34] text-opacity-50">
                        {item.author.date_posted}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end"></div>
              </div>
            </div>
          </Link>
        ))}
      </div> */}
      </div>
      <Footer/>
    </div>
  );
}
