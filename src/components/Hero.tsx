import React from "react";
import { motion } from "framer-motion";
import VoiceDoodles from "./VoiceDoodles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
const Hero = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  const handleStartBuilding = () => {
    console.log("Button clicked");
    console.log("isSignedIn:", isSignedIn);

    if (isSignedIn) {
      navigate("/assistants");
    } else {
      navigate("/sign-up");
    }
  };

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 pb-20 pt-10">
      <VoiceDoodles className="opacity-60" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
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
              <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-transparent bg-clip-text">
                That Sounds Human
              </span>
            </motion.h1>
            <motion.p
              className="mt-6 text-xl text-gray-600 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              Create natural voice conversations with our powerful Voice AI API.
              Build voice bots that understand context and respond naturally.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div
                onClick={handleStartBuilding}
                className="inline-flex items-center px-8 py-4 rounded-xl text-lg font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg shadow-teal-500/25"
              >
                Start Building Free
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Demo Visual */}
          <motion.div
            className="flex-1 w-full max-w-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="relative bg-white rounded-2xl p-6 shadow-xl shadow-teal-500/5 border border-teal-100">
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
                  <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                    {`// Initialize Voice AI
const voiceAI = new VoiceAI({
  apiKey: 'your_api_key',
  voice: 'natural',
  language: 'en-US'
});`}
                  </SyntaxHighlighter>
                </motion.div>
                <motion.div
                  className="bg-gray-50 rounded-lg p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.4 }}
                >
                  <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                    {`// Start conversation
await voiceAI.speak({
  text: 'Hello! How can I help you today?',
  emotion: 'friendly'
});`}
                  </SyntaxHighlighter>
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
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-teal-500 to-teal-600 text-transparent bg-clip-text">
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
