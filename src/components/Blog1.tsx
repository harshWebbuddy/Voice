import React from "react";
import Navbar from "@/components/Navbar";
import HeroSectionAi from "@/components/HeroSectionAi";
import { blogs } from "@/lib/blogs";
import { Link } from "react-router-dom";
import ContentBoxAi from "@/components/ContentBoxAi";
const BlogpageAI = () => {
  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-40">
        <Navbar />
      </div>
      <HeroSectionAi
        title="Privacy policy"
        description="Your privacy matters to us. Review how we collect, use, and protect your personal information."
        lastUpdatedDate="12-09-2024"
      />
      <div className="px-4 sm:px-8 mt-10 sm:mt-20">
        <ContentBoxAi />
      </div>
      <div className="p-4 sm:p-0 max-w-[1240px] mt-10 sm:mt-40 items-center justify-center mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold">Related articles</h1>
        {blogs.map((item, index) => (
          <Link to={item.href} key={index}>
            <div className="p-4 sm:p-0 mt-6 sm:mt-10 space-y-4 sm:flex sm:flex-row flex-col gap-4 sm:gap-10 items-center shadow-box-sm bg-white/80 rounded-2xl sm:rounded-3xl border border-teal-200 hover:shadow-teal-100 transition-all duration-300">
              <div className="relative w-full sm:w-1/2 flex justify-center items-center">
                <img
                  src={item.background_poster}
                  alt="blog"
                  height={1000}
                  width={1000}
                  className="w-full rounded-2xl sm:rounded-l-3xl"
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
              <div className="w-full sm:w-1/2 flex flex-col justify-between gap-4 sm:gap-y-4 gap-x-3">
                <div className="space-y-2 sm:space-y-4">
                  <div
                    className="py-2 sm:py-3 px-4 sm:px-5 font-semibold text-[10px] sm:text-[14px] rounded-full max-w-fit"
                    style={{ backgroundColor: item.tag.theme_color }}
                  >
                    {item.tag.tage_title}
                  </div>
                  <h1 className="text-[16px] sm:text-3xl leading-normal font-semibold bg-gradient-to-b from-teal-500 to-teal-600 bg-clip-text text-transparent">
                    {item.title}
                  </h1>
                  <p className="text-[12px] sm:text-[14px] leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex gap-2 items-center">
                    <img
                      src={item.author.profile_img}
                      alt="author"
                      width={1000}
                      height={1000}
                      className="w-[30px] h-[30px] sm:w-[60px] sm:h-[60px] object-cover rounded-full"
                    />
                    <div>
                      <h1 className="text-[12px] sm:text-[14px] font-semibold">
                        {item.author.names}
                      </h1>
                      <p className="text-[10px] sm:text-sm text-[#041D34] text-opacity-50">
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
      </div>
    </div>
  );
};

export default BlogpageAI;
