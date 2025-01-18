import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How natural does the AI voice sound?",
      answer:
        "Our AI voices are highly sophisticated and natural-sounding, leveraging advanced deep learning models to capture human-like intonation, emotion, and speech patterns. Most users find it difficult to distinguish from human voices.",
    },
    {
      question: "What languages are supported?",
      answer:
        "We currently support multiple languages including English, Spanish, French, German, and Mandarin, with more languages being added regularly. Each language features native-speaking AI voices with proper accent and cultural nuances.",
    },
    {
      question: "How can I integrate the Voice AI into my business?",
      answer:
        "Integration is straightforward through our RESTful API or SDK. We provide comprehensive documentation, code samples, and dedicated support to ensure smooth implementation. Our team can also assist with custom integration solutions.",
    },
    {
      question: "What about data privacy and security?",
      answer:
        "We prioritize data security and comply with major privacy regulations including GDPR and CCPA. All data is encrypted in transit and at rest, and we maintain strict access controls and regular security audits.",
    },
    {
      question: "Can I customize the AI voice for my brand?",
      answer:
        "Yes! We offer voice customization services where we can create a unique AI voice that matches your brand identity. This includes adjusting tone, pace, accent, and other characteristics to align with your requirements.",
    },
  ];

  return (
    <div className="py-24 relative overflow-hidden bg-white">
      {/* Background Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gradient-to-r from-teal-100/30 to-teal-200/30 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-r from-teal-200/30 to-teal-300/30 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-teal-500/10 to-teal-600/10 text-teal-700 border border-teal-200">
              FAQ
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-teal-600 to-teal-700 text-transparent bg-clip-text">
              Questions
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Everything you need to know about our Voice AI technology
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                className="w-full text-left p-6 rounded-2xl bg-white border border-gray-100 shadow-lg shadow-gray-100/10 hover:shadow-gray-100/20 transition-all duration-200"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <span
                    className={`transform transition-transform duration-200 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
