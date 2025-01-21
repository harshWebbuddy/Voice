import React from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { companyemployees } from "@/lib/blogs";
import { motion } from "framer-motion";

const Carousel = () => {
  return (
    <div className="w-full py-20 overflow-hidden">
      <div className="bg-[#034737] relative flex flex-col gap-y-10 max-w-[1800px] min-h-[788px] w-full rounded-[40px] p-10 mx-auto shadow-2xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full filter blur-3xl" />
        </div>

        <div className="relative w-full text-white gap-y-6 flex flex-col items-center justify-center mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-sm text-white whitespace-nowrap py-2 px-6 flex items-center gap-3 text-sm rounded-full tracking-widest font-semibold uppercase hover:bg-white/20 transition-all duration-300"
          >
            Funding
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="items-center flex flex-col gap-y-6 justify-center mx-auto text-center"
          >
            <h1 className="text-3xl xl:text-5xl gap-3 leading-tight flex flex-wrap items-center justify-center text-white">
              <span className="font-bold">Backed by</span>
              <span className="font-light">the best</span>
            </h1>
            <p className="text-lg xl:text-xl text-white/80 max-w-3xl leading-relaxed">
              GrowStack proud to have 100+ founders as investors and supporters
            </p>
          </motion.div>
        </div>

        <div className="relative mt-10">
          <Swiper
            slidesPerView={4.5}
            spaceBetween={30}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop
            speed={1000}
            modules={[Autoplay, EffectFade]}
            className="mySwiper"
            breakpoints={{
              1400: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1000: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              600: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
            }}
          >
            {companyemployees.map((item, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full p-6"
                >
                  <div className="w-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10">
                    <div className="flex flex-col gap-y-6">
                      <div className="h-20">
                        <img
                          src={item.imageUrl}
                          className="w-auto h-full object-contain"
                          alt={item.name}
                        />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-white truncate">
                          {item.name}
                        </h2>
                        <p className="text-lg font-medium text-white/80">
                          {item.role}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <img
                          src={item.imageUrlbox}
                          className="w-6 h-6"
                          alt="icon"
                        />
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
