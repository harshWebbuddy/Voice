import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className="relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 pl-2">
              <Link to="/" className="text-2xl font-bold text-gray-900">VoiceAI</Link>
            </div>

            {/* Navigation Links and CTA Button Container */}
            <div className="flex items-center space-x-8">
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-[#7C3AED] transition-colors relative group"
                >
                  Use Cases
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7C3AED] transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-[#7C3AED] transition-colors relative group"
                >
                  Company
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7C3AED] transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-[#7C3AED] transition-colors relative group"
                >
                  Careers
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7C3AED] transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </a>
              </div>

              {/* CTA Button */}
              <div>
                <Link 
                  to="/signup"
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.45)]"
                >
                  Get started for free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Subtle Border */}
      <div className="h-px bg-gray-200/30 w-full"></div>
    </>
  );
};

export default Navbar; 