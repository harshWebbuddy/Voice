  import "../styles/myanimation.css";

const HeroSection = () => {
  return (
    <section className="">
      <div className="relative flex items-center w-full h-full  rounded-b-[40px] pt-20  xl:pt-20 bg-white">
        <div className="w-full h-full mx-auto flex flex-col  justify-between max-h-[870px] max-w-[1920px] items-center">
          <div className="flex flex-col items-center justify-center mx-auto w-full">
            <div className=" w-full gap-y-4 flex flex-col items-center justify-center mx-auto">
              <div className="bg-[#0347371A] text-[#034737] whitespace-nowrap py-2 px-4 flex items-center gap-3 text-[12px] rounded-full tracking-widest  font-semibold uppercase w-full max-w-[133px] ">
                Unmatched
              </div>

              <div className="  items-center flex flex-col gap-y-4 justify-center  mx-auto ">
                <h1 className="text-[24px] xl:text-[42px] gap-2 leading-12 flex   items-center justify-center bg-gradient-to-b from-black to-black/30 bg-clip-text ">
                  <span className="font-semibold text-center">
                    Unified platform:
                  </span>
                  <span className="font-light text-center">
                    Features across competitors
                  </span>
                </h1>
                <p className="text-[18px]  items-center justify-center text-center max-w-[920px] leading-loose">
                  With our unified platform, users gain access to a diverse
                  range of functionalities that would typically require multiple
                  tools or platforms to access. This streamlined approach
                  enhances efficiency, reduces complexity, and provides a
                  seamless user experience.
                </p>{" "}
                <svg
                  className="absolute translate-x-64 translate-y-32"
                  width="192"
                  height="192"
                  viewBox="0 0 192 192"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_7944_9073)">
                    <path
                      className="drawing-effect2 doodle-effectgreen"
                      d="M107.459 23.7357C122.001 22.8323 136.595 24.4342 150.606 28.4716C156.976 30.2975 163.748 32.919 168.06 38.2057C172.025 43.0828 172.222 49.5373 169.671 55.1305C166.916 61.1485 162.049 65.9045 156.985 70.007C150.848 74.7867 144.166 78.8234 137.078 82.0334C123.27 88.396 108.9 93.469 94.1522 97.1879C85.885 99.3397 77.5281 101.103 69.0815 102.478C65.1366 103.285 61.1348 103.788 57.1115 103.983C53.5774 103.986 49.6567 103.273 47.7714 99.9413C47.4954 99.4451 47.9354 98.8159 48.2656 98.5015C54.1618 92.6998 61.6111 88.9702 69.4161 86.4137C76.7459 84.0649 84.2643 82.3466 91.8896 81.2777C99.4698 80.1936 107.125 79.7108 114.785 79.8338C122.438 79.7977 130.078 80.5269 137.59 82.0104C144.022 83.4586 150.741 87.0324 151.977 94.0864C153.348 101.747 145.059 107.703 139.554 111.348C132.696 115.905 124.947 118.91 117.244 121.679C109.156 124.597 101.052 127.248 92.8775 129.78C74.3245 135.504 55.5502 140.455 36.7601 145.344C35.9654 145.555 34.9498 145.373 35.1926 144.358C35.4353 143.343 36.9378 142.613 37.8584 142.307C53.5246 138.178 69.2066 134.096 84.7936 129.495C92.4651 127.245 100.097 124.878 107.69 122.36C115.16 120.006 122.5 117.259 129.679 114.13C133.124 112.593 136.412 110.725 139.496 108.554C142.24 106.582 145.425 104.201 146.995 101.054C150.183 94.8713 144.8 88.7017 139.374 86.4203C136.083 85.1738 132.64 84.3753 129.139 84.0465C125.528 83.5804 121.917 83.2401 118.307 83.0258C111.186 82.6466 104.049 82.7984 96.9534 83.4799C88.9278 84.2525 80.9866 85.7229 73.2196 87.8745C65.2646 90.0608 57.2636 93.2074 51.2809 99.0798L51.775 97.64C53.3999 100.507 56.7379 101.031 59.776 100.924C63.1484 100.686 66.5022 100.238 69.8178 99.5825C76.8532 98.4629 83.8357 97.0599 90.7655 95.3734C104.471 92.0853 117.889 87.7061 130.892 82.2777C137.531 79.5834 143.897 76.2624 149.904 72.3597C155.268 68.7771 160.583 64.4702 164.119 59.012C167.214 54.1987 168.726 48.2421 165.902 42.9021C162.88 37.1919 156.438 34.0356 150.563 32.0765C136.059 27.4026 120.805 25.525 105.613 26.5434C104.716 26.6053 104.439 25.9516 104.887 25.2044C105.186 24.7804 105.574 24.4266 106.023 24.1676C106.473 23.9086 106.973 23.7505 107.491 23.7042L107.459 23.7357Z"
                      fill="#034737"
                    />
                    <path
                      className="drawing-effect2 doodle-effectgreen"
                      d="M50.9843 133.405C41.0414 138.414 31.067 143.361 21.1556 148.418L21.5854 145.876C32.636 145.559 43.7187 145.808 54.7784 146.507C55.6994 146.563 55.2992 147.562 55.0007 148.018C54.6956 148.412 54.3111 148.737 53.8721 148.972C53.4331 149.208 52.9493 149.348 52.4521 149.385C41.5187 148.938 30.4992 148.925 19.5427 148.974C17.512 148.988 18.9814 146.919 19.9725 146.433C29.9628 141.518 39.8978 136.484 49.8565 131.506C50.4307 131.216 51.8546 130.548 52.3278 131.368C52.8011 132.187 51.5035 133.153 50.9608 133.428L50.9843 133.405Z"
                      fill="#034737"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_7944_9073">
                      <rect
                        width="183.844"
                        height="86.7188"
                        fill="white"
                        transform="matrix(-0.707107 0.707107 0.707107 0.707107 130 0)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
          <div className="2xl:flex xl:flex flex-col hidden relative ">
            <img
              src="/circle.svg"
              alt="img"
              width={900}
              height={518}
              className=""
            />{" "}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
