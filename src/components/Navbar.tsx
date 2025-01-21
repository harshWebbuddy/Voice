import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const HandleSignIn = () => {
    window.location.href = "/sign-up";
  };

  const scrollToUseCases = (e) => {
    e.preventDefault();
    const element = document.getElementById("use-cases");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Update URL without page reload
      window.history.pushState(null, "", "/#use-cases");
    }
  };

  const scrollToFAQ = (e) => {
    e.preventDefault();
    const element = document.getElementById("faq");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Update URL without page reload
      window.history.pushState(null, "", "/#faq");
    }
  };

  return (
    <>
      <nav className="relative z-50 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 pl-2">
              <Link
                to="/"
                className="text-3xl font-extrabold text-white tracking-wide"
              >
                VoiceAI
              </Link>
            </div>

            {/* Navigation Links and CTA Button Container */}
            <div className="flex items-center space-x-8">
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#use-cases"
                  onClick={scrollToUseCases}
                  className="text-white hover:text-teal-200 transition-colors relative group"
                >
                  Use Cases
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-200 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a
                  href="#"
                  className="text-white hover:text-teal-200 transition-colors relative group"
                >
                  Company
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-200 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a
                  href="#"
                  className="text-white hover:text-teal-200 transition-colors relative group"
                >
                  Pricing
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-200 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a
                  href="#faq"
                  onClick={scrollToFAQ}
                  className="text-white hover:text-teal-200 transition-colors relative group"
                >
                  Faq
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-200 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
              </div>

              {/* CTA Button */}
              <div
                onClick={HandleSignIn}
                className="bg-teal-200 hover:bg-teal-300 text-teal-900 px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                Get started for free
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Subtle Border */}
      <div className="h-px bg-teal-100/30 w-full"></div>
    </>
  );
};

export default Navbar;
