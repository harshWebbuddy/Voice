import React from "react";

const logos = [
  { name: "Tesla", },
  { name: "Amazon", },
  { name: "Stanford", },
  { name: "Strava", },
];

const LogoCloud = () => {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap opacity-50">
          {logos.map((logo) => (
            <div key={logo.name} className="text-gray-400 font-semibold">
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCloud;