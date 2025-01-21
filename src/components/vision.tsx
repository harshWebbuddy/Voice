 
import React from "react";

const Vision = () => {
  return (
    <div className="max-w-[1226px] mx-auto flex flex-col gap-y-6 items-start w-full justify-center">
      <div
        data-aos="fade-right"
        className="bg-[#034737]/10 text-[#034737] whitespace-nowrap py-2 px-4 flex items-center gap-3 text-[12px] rounded-full tracking-widest  font-semibold uppercase w-full max-w-[170px]"
      >
        Vision & Mission
      </div>

      <div className="flex flex-row w-full text-[42px] items-center justify-between">
        <div
          className="max-w-[600px] w-full flex flex-col"
          data-aos="fade-left"
        >
          <h2 className="font-extrabold">Our Purpose and Aspirations</h2>
          {/* <h2>behind GrowStack</h2> */}
        </div>
        <h2 className="text-[18px] max-w-[600px] w-full" data-aos="fade-up">
          See how Growstack's mission and vision drive innovation and shape the
          future.
        </h2>
      </div>

      <div className="flex flex-row gap-32 w-full justify-between">
        <div data-aos="fade-right">
          <img
            src="/company/company.svg"
            width={500}
            height={500}
            alt="width"
          />
        </div>

        <div className="max-w-[600px] w-full mx-auto">
          <div className="mb-10" data-aos="fade-left">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Our mission
            </h2>
            <p className="text-[16px] text-gray-600 leading-relaxed">
              Empowering businesses to scale smarter through cutting-edge AI
              solutions that streamline workflows, enhance decision-making, and
              drive sustainable growth
            </p>
          </div>

          <div className="mb-12" data-aos="fade-left">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Our vision
            </h2>
            <div className="border border-[#E8E8E8] my-8"></div>

            <div className="space-y-4">
              <div
                className="flex flex-row items-start gap-4"
                data-aos="fade-up"
              >
                <div className="hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="42" height="42" fill="#D9D9D9" />
                  </svg>
                </div>
                <p className="text-[16px] text-gray-600 flex flex-col gap-y-4">
                  <strong className="text-[#034737] text-[20px]">
                    Develop cutting-edge technology
                  </strong>{" "}
                  We pioneer advanced solutions to keep our clients ahead in a
                  rapidly evolving digital landscape.
                  <div className="border border-[#E8E8E8] mt-2"></div>
                </p>
              </div>

              <div
                className="flex flex-row items-start gap-4"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="42" height="42" fill="#D9D9D9" />
                  </svg>
                </div>
                <p className="text-[16px] text-gray-600 flex flex-col gap-y-4">
                  <strong className="text-[#034737] text-[20px]">
                    Enable automation and efficiency
                  </strong>{" "}
                  We leverage AI automation to help businesses streamline
                  processes and boost productivity.
                  <div className="border border-[#E8E8E8] mt-2"></div>
                </p>
              </div>

              <div
                className="flex flex-row items-start gap-4"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="42" height="42" fill="#D9D9D9" />
                  </svg>
                </div>
                <p className="text-[16px] text-gray-600 flex flex-col gap-y-4">
                  <strong className="text-[#034737] text-[20px]">
                    Drive innovation
                  </strong>{" "}
                  We drive change and innovation, helping businesses unlock
                  opportunities and lead with transformative ideas.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8"></div>
        </div>
      </div>
    </div>
  );
};

export default Vision;
