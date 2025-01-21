import React from "react";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaRegSmile,
  FaRegStar,
  FaCode,
  FaHeadset,
  FaBriefcase,
} from "react-icons/fa";

const TestimonialsSection = () => {
  const testimonials = [
    {
      image: "/1.jpg",
      quote:
        "VoiceAI takes the pain out of building powerful conversational experiences in a group setting. VoiceAI makes it pleasant (even fun) to build systems that add value to external-facing customer use-cases.",
      author: {
        icon: <FaCode />,
        name: "Victor Algaze",
        role: "Software Engineer",
      },
    },
    {
      image: "/2.jpg",
      quote:
        "VoiceAI is a very versatile tool, combining natural conversations with strong API capabilities. The voice quality and emotional intelligence of the AI makes every interaction feel genuinely human.",
      author: {
        icon: <FaHeadset />,
        name: "Ciprian Nastase",
        role: "L3 Support AI Engineer",
      },
    },
    {
      image: "/3.jpg",
      quote:
        "VoiceAI provides us with massive acceleration, enabling us to experiment without fear. It allowed us to focus on value-adding activities like orchestration and building a robust, generative conversational architecture.",
      author: {
        icon: <FaBriefcase />,
        name: "Andre Fredericks",
        role: "Chief Operating Officer",
      },
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/2 left-0 w-[800px] h-[800px] bg-gradient-to-br from-teal-100/20 to-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 right-0 w-[800px] h-[800px] bg-gradient-to-br from-teal-200/20 to-teal-300/20 rounded-full blur-3xl"></div>
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
              Testimonials
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
            What Our{" "}
            <span className="bg-gradient-to-r from-teal-600 to-teal-700 text-transparent bg-clip-text">
              Customers Say
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover how businesses are transforming their customer interactions
            with our Voice AI
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-white rounded-3xl transition-all duration-300 opacity-0 group-hover:opacity-100 -inset-x-4 -inset-y-4 bg-gradient-to-br from-teal-50 to-teal-100"></div>

              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-xl shadow-gray-100/10">
                {/* Company Logo */}
               

                {/* Quote */}
                <div className="mb-8">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-lg"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.author.name}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {testimonial.author.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
