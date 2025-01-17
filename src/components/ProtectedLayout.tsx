import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import { RiPhoneLine } from "react-icons/ri";

const ProtectedLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    // Validate token expiration if it's a JWT
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isValid = payload.exp * 1000 > Date.now();
      setIsAuthenticated(isValid);
    } catch (error) {
      console.error("Error validating token:", error);
      setIsAuthenticated(false);
    }
  }, []);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#38b2ac]/0 via-[#38b2ac] to-[#319795]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-black/30 backdrop-blur-xl rounded-3xl w-[400px] p-8 border border-white/10 shadow-2xl"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  background: [
                    "radial-gradient(circle at 0% 0%, #38b2ac 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 100%, #319795 0%, transparent 50%)",
                    "radial-gradient(circle at 0% 100%, #38b2ac 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 0%, #319795 0%, transparent 50%)",
                    "radial-gradient(circle at 0% 0%, #38b2ac 0%, transparent 50%)",
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </div>
  
            {/* Loading Icon */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                  borderRadius: ["30%", "50%", "30%"],
                }}
                transition={{
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  borderRadius: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="absolute inset-0 bg-gradient-to-r from-[#38b2ac] to-[#319795] opacity-30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-2xl border-4 border-t-[#38b2ac] border-r-[#319795] border-b-transparent border-l-transparent"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 0.8, 1],
                    rotate: [0, 360, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <RiPhoneLine className="w-10 h-10 text-white" />
                </motion.div>
              </div>
            </div>
  
            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center relative z-10"
            >
              <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-[#38b2ac] to-[#319795] bg-clip-text text-transparent">
                Loading Your Settings
              </h3>
              <p className="text-gray-400 mb-6 text-sm">
                Getting everything ready for you...
              </p>
  
              {/* Loading Progress */}
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{
                    x: "100%",
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="h-full w-1/3 bg-gradient-to-r from-[#38b2ac] to-[#319795] rounded-full"
                />
              </div>
  
              {/* Animated Dots */}
              <div className="mt-6 flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-[#38b2ac] to-[#319795]"
                  />
                ))}
              </div>
            </motion.div>
  
            {/* Floating Elements */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-[#38b2ac] to-[#319795] opacity-20"
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.random() * 10, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </motion.div>
        </div>
      );
  
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
