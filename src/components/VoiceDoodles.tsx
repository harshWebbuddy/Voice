import React from 'react';
import { motion } from 'framer-motion';

const VoiceDoodles = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Animated sound waves */}
      <div className="absolute left-10 top-1/4">
        <motion.div
          className="flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-0.5 h-4 bg-violet-400/30 rounded-full"
              animate={{
                height: ["16px", "32px", "16px"],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Microphone doodle */}
      <motion.div
        className="absolute right-20 top-1/3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M20 4C17.2386 4 15 6.23858 15 9V20C15 22.7614 17.2386 25 20 25C22.7614 25 25 22.7614 25 20V9C25 6.23858 22.7614 4 20 4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-violet-400/30"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.path
            d="M30 18V20C30 25.5228 25.5228 30 20 30C14.4772 30 10 25.5228 10 20V18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-violet-400/30"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M20 30V36"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-violet-400/30"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Chat bubbles */}
      <motion.div
        className="absolute left-1/4 bottom-1/4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 27.7286 5.0085 31.2286 6.78571 34.2857L4 44L13.7143 41.2143C16.7714 42.9915 20.2714 44 24 44Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-cyan-400/30"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Voice commands */}
      <motion.div
        className="absolute right-1/4 top-1/4 flex flex-col gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="h-1 bg-gradient-to-r from-violet-400/30 to-cyan-400/30 rounded-full"
            style={{ width: `${60 + i * 20}px` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default VoiceDoodles; 