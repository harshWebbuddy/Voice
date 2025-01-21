import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

interface Demo {
  id: string;
  title: string;
  category: string;
  icon: string;
  audioUrl: string;
  gradient: string;
  description: string;
}

const DemoSection = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const demos: Demo[] = [
    {
      id: "lead-qualification",
      title: "Lead Qualification",
      category: "Finance & Mortgage Loans",
      icon: "💼",
      description:
        "Experience how our AI handles mortgage inquiries with precision and empathy",
      audioUrl: "/voices/1.mp3",
      gradient: "from-teal-400 to-teal-500",
    },
    {
      id: "customer-support",
      title: "Customer Support",
      category: "Insurance",
      icon: "🛡️",
      description:
        "Listen to seamless insurance claim processing and policy assistance",
        audioUrl: "/voices/2.mp3",
      gradient: "from-teal-500 to-teal-600",
    },
    {
      id: "appointment-booking",
      title: "Appointment Booking",
      category: "Healthcare",
      icon: "🏥",
      description:
        "See how our AI schedules medical appointments efficiently and professionally",
        audioUrl: "/voices/3.mp3",
      gradient: "from-teal-600 to-teal-700",
    },
  ];

  const handlePlayPause = (demoId: string, audioUrl: string) => {
    if (activeDemo === demoId && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      }
      setActiveDemo(demoId);
      setIsPlaying(true);
    }
  };

  return (
    <div className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-teal-100/30 to-teal-200/30 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-r from-teal-200/30 to-teal-300/30 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <motion.span
              className="h-px w-8 bg-gradient-to-r from-teal-500 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <span className="text-sm font-medium bg-gradient-to-r from-teal-600 to-teal-700 text-transparent bg-clip-text">
              Live Demos
            </span>
            <motion.span
              className="h-px w-8 bg-gradient-to-l from-teal-500 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Experience{" "}
            <span className="bg-gradient-to-r from-teal-600 to-teal-700 text-transparent bg-clip-text">
              Voice AI in Action
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Listen to real conversations powered by our human-like, empathetic
            AI
          </motion.p>
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r rounded-3xl transition-all duration-300 group-hover:opacity-100 opacity-0 p-[1px]">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${demo.gradient} rounded-3xl opacity-10`}
                />
              </div>

              <div className="relative bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 transition-all duration-300 group-hover:-translate-y-1">
                {/* Icon and Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${demo.gradient} p-0.5 shrink-0`}
                  >
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-2xl">
                      {demo.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {demo.title}
                    </h3>
                    <p
                      className={`text-sm bg-gradient-to-r ${demo.gradient} text-transparent bg-clip-text font-medium`}
                    >
                      {demo.category}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-8">{demo.description}</p>

                {/* Audio Waveform */}
                <div className="h-16 mb-6 flex items-center justify-between gap-0.5">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-1 bg-gradient-to-t ${demo.gradient} rounded-full opacity-30 group-hover:opacity-50 transition-all duration-300`}
                      style={{ height: `${Math.random() * 100}%` }}
                      animate={
                        activeDemo === demo.id && isPlaying
                          ? {
                              height: ["20%", "100%", "20%"],
                              transition: {
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.02,
                              },
                            }
                          : {}
                      }
                    />
                  ))}
                </div>

                {/* Play Button */}
                <motion.button
                  onClick={() => handlePlayPause(demo.id, demo.audioUrl)}
                  className={`w-full py-3.5 px-4 rounded-xl text-sm font-medium transition-all relative overflow-hidden
                    ${
                      activeDemo === demo.id && isPlaying
                        ? `bg-gradient-to-r ${demo.gradient} text-white shadow-lg`
                        : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {activeDemo === demo.id && isPlaying ? (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 5v14M16 5v14"
                          />
                        </svg>
                        Pause Demo
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M8 5.14v13.72a1 1 0 001.55.83l11-6.86a1 1 0 000-1.66l-11-6.86a1 1 0 00-1.55.83z"
                          />
                        </svg>
                        Play Demo
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default DemoSection;
