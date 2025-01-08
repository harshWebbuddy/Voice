import React from "react";
import { motion } from 'framer-motion';

const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/2 left-0 w-[800px] h-[800px] bg-gradient-to-br from-violet-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/20 to-cyan-100/20 rounded-full blur-3xl"></div>
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
              className="h-px w-8 bg-gradient-to-r from-violet-500 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <span className="text-sm font-medium bg-gradient-to-r from-violet-600 to-cyan-600 text-transparent bg-clip-text">
              Features
            </span>
            <motion.span 
              className="h-px w-8 bg-gradient-to-l from-cyan-500 to-transparent"
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
            Enterprise-Grade{" "}
            <span className="bg-gradient-to-r from-violet-600 to-cyan-600 text-transparent bg-clip-text">
              Voice AI Platform
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Transform your business communication with powerful AI voice technology that understands, responds, and delivers results.
          </motion.p>
        </div>

        {/* Feature Cards would go here */}
      </div>
    </section>
  );
};

export default Features;