import React from 'react';

const PathToSuccess = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <h2 className="text-4xl font-bold text-white mb-4">Your Path to Success</h2>
          <p className="text-xl text-gray-400">
            Easily tailor and deploy AI voice agents for your business
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500 group-hover:scale-105"></div>
            <div className="relative bg-[#1A1528] p-8 rounded-2xl border border-purple-900/20 hover:-translate-y-2 transition-all duration-500 group-hover:border-purple-500/50">
              <div className="flex items-center mb-6">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-900/30 text-purple-300 font-semibold">
                  1
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Create an AI Agent</h3>
              <p className="text-gray-400 mb-6">
                Consult with us, create one from scratch, or pick a template and adapt with a prompt.
              </p>
              <div className="bg-[#13111C] p-4 rounded-xl">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 bg-[#1A1528] p-3 rounded-lg border border-purple-900/20 group-hover:border-purple-500/30 transition-all duration-300">
                    <div className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-300">Sales Development Manager</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-[#1A1528] p-3 rounded-lg border border-purple-900/20 group-hover:border-purple-500/30 transition-all duration-300">
                    <div className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-300">Recruiter</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500 group-hover:scale-105"></div>
            <div className="relative bg-[#1A1528] p-8 rounded-2xl border border-purple-900/20 hover:-translate-y-2 transition-all duration-500 group-hover:border-purple-500/50">
              <div className="flex items-center mb-6">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-900/30 text-purple-300 font-semibold">
                  2
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Tailor to Your Needs</h3>
              <p className="text-gray-400 mb-6">
                Choose a language, pick or clone your voice, and connect to your knowledge base.
              </p>
              <div className="bg-[#13111C] p-4 rounded-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-[#1A1528] p-3 rounded-lg border border-purple-900/20 group-hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-300">Emotion Level</span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse delay-75"></div>
                      <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse delay-150"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-[#1A1528] p-3 rounded-lg border border-purple-900/20 group-hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-300">English</span>
                      <span className="text-xs">🇺🇸</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500 group-hover:scale-105"></div>
            <div className="relative bg-[#1A1528] p-8 rounded-2xl border border-purple-900/20 hover:-translate-y-2 transition-all duration-500 group-hover:border-purple-500/50">
              <div className="flex items-center mb-6">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-900/30 text-purple-300 font-semibold">
                  3
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Connect and Go Live</h3>
              <p className="text-gray-400 mb-6">
                Integrate Voice AI with your tech stack through 200+ integrations and APIs.
              </p>
              <div className="bg-[#13111C] p-4 rounded-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-[#1A1528] p-3 rounded-lg border border-purple-900/20 group-hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-300">Support Agent</span>
                    </div>
                    <div className="w-12 h-6 bg-green-900/30 rounded-full flex items-center p-1">
                      <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-[#1A1528] p-3 rounded-lg border border-purple-900/20 group-hover:border-purple-500/30 transition-all duration-300">
                    <svg className="w-5 h-5 text-[#7C3AED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-300">Customer Issue Resolved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathToSuccess; 