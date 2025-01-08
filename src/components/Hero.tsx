import React from 'react';
import { motion } from 'framer-motion';
import VoiceDoodles from './VoiceDoodles';

const Hero = () => {
  return (
    <div className="relative px-4 sm:px-6 lg:px-8 pb-20 pt-10">
      {/* Background doodles */}
      <VoiceDoodles className="opacity-60" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left Column - Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h1 
              className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              Build Voice AI
              <br />
              <span className="bg-gradient-to-r from-violet-600 to-cyan-600 text-transparent bg-clip-text">
                That Sounds Human
              </span>
            </motion.h1>
            <motion.p 
              className="mt-6 text-xl text-gray-600 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              Create natural voice conversations with our powerful Voice AI API. Build voice bots that understand context and respond naturally.
            </motion.p>
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <motion.button 
                className="inline-flex items-center px-8 py-4 rounded-xl text-lg font-medium text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 transition-all shadow-lg shadow-violet-500/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Building Free
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Demo Visual */}
          <motion.div 
            className="flex-1 w-full max-w-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="relative bg-white rounded-2xl p-6 shadow-xl shadow-violet-500/5 border border-violet-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
              </div>
              <div className="space-y-4">
                <motion.div 
                  className="bg-gray-50 rounded-lg p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.3 }}
                >
                  <pre className="text-sm text-violet-600">
                    <code>
                      {`// Initialize Voice AI
const voiceAI = new VoiceAI({
  apiKey: 'your_api_key',
  voice: 'natural',
  language: 'en-US'
});`}
                    </code>
                  </pre>
                </motion.div>
                <motion.div 
                  className="bg-gray-50 rounded-lg p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.4 }}
                >
                  <pre className="text-sm text-cyan-600">
                    <code>
                      {`// Start conversation
await voiceAI.speak({
  text: 'Hello! How can I help you today?',
  emotion: 'friendly'
});`}
                    </code>
                  </pre>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          className="mt-20 pt-12 border-t border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "99.9%", label: "Uptime SLA" },
              { value: "100+", label: "Voice Options" },
              { value: "<50ms", label: "Response Time" },
              { value: "24/7", label: "Support" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 text-transparent bg-clip-text">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;