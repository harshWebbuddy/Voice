import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";

interface Feature {
  text: string;
  value: string;
}

interface UseCase {
  icon: string;
  title: string;
  description: string;
  features: Feature[];
  gradient: string;
  pattern: string;
}

const UseCases = () => {
  const [activeTab, setActiveTab] = useState<"inbound" | "outbound">("inbound");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll();

  // Smooth scroll progress for parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax values for background elements
  const bgY1 = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const bgY2 = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);
  const bgScale = useTransform(smoothProgress, [0, 0.5], [1, 1.2]);

  const inboundCases: UseCase[] = [
    {
      icon: "/icons/retail.svg",
      title: "Retail & Services",
      description: "Transform customer interactions with AI-powered assistance",
      features: [
        { text: "Smart appointment scheduling", value: "2x faster bookings" },
        { text: "Real-time product inquiries", value: "90% accuracy" },
        { text: "Automated support system", value: "24/7 support" },
      ],
      gradient: "from-teal-400 to-teal-500",
      pattern: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 10%)",
    },
    {
      icon: "/icons/enterprise.svg",
      title: "Enterprise Solutions",
      description: "Scale your business operations with intelligent automation",
      features: [
        { text: "24/7 customer service", value: "100% coverage" },
        { text: "Technical support automation", value: "85% resolution" },
        { text: "Multilingual capabilities", value: "120+ languages" },
      ],
      gradient: "from-cyan-500 via-blue-500 to-purple-500",
      pattern: "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
    },
    {
      icon: "/icons/healthcare.svg",
      title: "Healthcare",
      description: "Streamline patient care with intelligent voice assistance",
      features: [
        { text: "Automated appointment management", value: "3x efficiency" },
        { text: "Patient follow-up system", value: "95% reach" },
        { text: "Medical inquiry handling", value: "HIPAA compliant" },
      ],
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      pattern: "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)",
    },
  ];

  const outboundCases: UseCase[] = [
    {
      icon: "/icons/sales.svg",
      title: "Sales & Marketing",
      description: "Accelerate growth with intelligent outreach",
      features: [
        { text: "Automated lead qualification", value: "4x conversion" },
        { text: "Smart appointment setting", value: "70% success" },
        { text: "Follow-up automation", value: "Zero drop-offs" },
      ],
      gradient: "from-teal-500 to-teal-600",
      pattern: "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)",
    },
    {
      icon: "/icons/research.svg",
      title: "Market Research",
      description: "Gather insights with AI-powered conversations",
      features: [
        { text: "Automated surveys", value: "5x responses" },
        { text: "Real-time data collection", value: "Live insights" },
        { text: "Sentiment analysis", value: "98% accuracy" },
      ],
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      pattern: "linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
    },
    {
      icon: "/icons/success.svg",
      title: "Customer Success",
      description: "Enhance customer experience with proactive support",
      features: [
        { text: "Onboarding automation", value: "2x adoption" },
        { text: "Satisfaction monitoring", value: "Real-time NPS" },
        { text: "Retention campaigns", value: "+40% retention" },
      ],
      gradient: "from-blue-500 via-indigo-500 to-violet-500",
      pattern: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 30%)",
    },
  ];

  const CardWrapper = ({ children, index }: { children: React.ReactNode; index: number }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, {
      once: true,
      margin: "-100px",
    });

    const variants = {
      hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          duration: 0.8,
          delay: index * 0.2,
          bounce: 0.3,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-50">
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ scale: bgScale }}
      >
        <motion.div
          className="absolute w-[800px] h-[800px] -top-[400px] -right-[400px] rounded-full bg-gradient-to-br from-teal-100/20 to-teal-200/20 blur-3xl"
          style={{ y: bgY1 }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] top-[20%] -left-[300px] rounded-full bg-gradient-to-br from-teal-200/20 to-teal-300/20 blur-3xl"
          style={{ y: bgY2 }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <motion.span
              className="h-px w-8 bg-gradient-to-r from-teal-500 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />
            <span className="text-sm font-medium bg-gradient-to-r from-teal-600 to-teal-700 text-transparent bg-clip-text">
              Use Cases
            </span>
            <motion.span
              className="h-px w-8 bg-gradient-to-l from-teal-500 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            One Platform,{" "}
            <span className="bg-gradient-to-r from-teal-600 to-teal-700 text-transparent bg-clip-text">
              Endless Possibilities
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our Voice AI adapts to various industries and use cases
          </p>
        </motion.div>

        {/* Tabs Section */}
        {/* <div className="flex justify-center mb-16">
          <motion.div
            className="p-1 bg-white rounded-2xl shadow-lg shadow-gray-200/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-2">
              {["inbound", "outbound"].map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab as "inbound" | "outbound")}
                  className={`relative px-8 py-4 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl"
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Solutions
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div> */}

        {/* Cards Grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
            {(activeTab === "inbound" ? inboundCases : outboundCases).map(
              (useCase, index) => (
                <CardWrapper key={useCase.title} index={index}>
                  <motion.div
                    className="group relative h-full"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative bg-white rounded-2xl p-8 shadow-lg shadow-gray-100/20 h-full border border-gray-100 backdrop-blur-sm">
                      {/* Icon */}
                      <motion.div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-r ${useCase.gradient} p-0.5 mb-8`}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                      >
                        <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                          <img
                            src={useCase.icon}
                            alt={useCase.title}
                            className="w-8 h-8"
                          />
                        </div>
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                        {useCase.title}
                      </h3>
                      <p className="text-gray-600 mb-8">{useCase.description}</p>

                      {/* Features */}
                      <div className="space-y-4">
                        {useCase.features.map((feature, i) => (
                          <motion.div
                            key={i}
                            className="flex justify-between items-center"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <span className="text-gray-600">{feature.text}</span>
                            <span className="text-teal-600 font-medium">
                              {feature.value}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </CardWrapper>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    </div>
  );
};

export default UseCases;