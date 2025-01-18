import React from "react";
import { motion } from "framer-motion";
import { RiLayoutGridLine, RiPlugLine, RiGlobalLine } from "react-icons/ri";

const ProductSection = () => {
  const features = [
    {
      title: "Ready-made Templates",
      description:
        "Tailor to your needs and start handling calls right away with our industry-specific AI voice templates.",
      icon: <RiLayoutGridLine className="w-6 h-6" />,
      gradient: "from-teal-400 to-teal-500",
      preview: (
        <div className="bg-gradient-to-br from-teal-50/50 to-teal-100/30 backdrop-blur-sm rounded-xl p-4 h-[140px] border border-teal-100/50">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md"
            >
              <span className="text-lg">👨‍💼</span>
            </motion.div>
            <div>
              <div className="font-medium bg-gradient-to-r from-teal-700 to-teal-900 bg-clip-text text-transparent">
                SDR Agent
              </div>
              <div className="text-sm text-teal-600">Solar Industry</div>
            </div>
          </div>
          <div className="space-y-2">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-2 bg-gradient-to-r from-teal-200 to-white rounded-full"
            />
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "75%" }}
              transition={{ duration: 1, delay: 0.4 }}
              className="h-2 bg-gradient-to-r from-teal-200 to-white rounded-full"
            />
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "50%" }}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-2 bg-gradient-to-r from-teal-200 to-white rounded-full"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Native Integrations",
      description:
        "Seamlessly connect with over 200+ platforms including CRM, telephony, calendars, and more.",
      icon: <RiPlugLine className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-500",
      preview: (
        <div className="bg-gradient-to-br from-blue-50/50 to-blue-100/30 backdrop-blur-sm rounded-xl p-4 h-[140px] border border-blue-100/50">
          <div className="grid grid-cols-3 gap-2 h-full">
            {[
              { name: "Salesforce", icon: "💼", delay: 0.2 },
              { name: "HubSpot", icon: "🎯", delay: 0.3 },
              { name: "Zoom", icon: "🎥", delay: 0.4 },
              { name: "Slack", icon: "💬", delay: 0.5 },
              { name: "Google", icon: "📅", delay: 0.6 },
              { name: "Teams", icon: "👥", delay: 0.7 },
            ].map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: app.delay }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-2 flex flex-col items-center justify-center gap-1 shadow-md hover:shadow-lg transition-shadow"
              >
                <span className="text-base">{app.icon}</span>
                <span className="text-[10px] font-medium bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent truncate w-full text-center">
                  {app.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Multilingual Support",
      description:
        "Engage customers globally with AI voice agents supporting 20+ languages and regional accents.",
      icon: <RiGlobalLine className="w-6 h-6" />,
      gradient: "from-rose-500 to-orange-500",
      preview: (
        <div className="bg-gradient-to-br from-rose-50/50 to-rose-100/30 backdrop-blur-sm rounded-xl p-4 h-[140px] border border-rose-100/50">
          <div className="grid grid-cols-2 gap-2 h-full">
            {[
              { flag: "🇺🇸", lang: "English", accent: "US, UK, AU", delay: 0.2 },
              { flag: "🇪🇸", lang: "Spanish", accent: "ES, MX, AR", delay: 0.3 },
              { flag: "🇫🇷", lang: "French", accent: "FR, CA", delay: 0.4 },
              { flag: "🇩🇪", lang: "German", accent: "DE, AT", delay: 0.5 },
            ].map((lang, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: lang.delay }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-2 flex flex-col items-center justify-center gap-0.5 shadow-md hover:shadow-lg transition-shadow"
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="text-xs font-medium bg-gradient-to-r from-rose-700 to-rose-900 bg-clip-text text-transparent">
                  {lang.lang}
                </span>
                <span className="text-[10px] text-rose-500">{lang.accent}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 left-0 w-[800px] h-[800px] bg-gradient-to-br from-teal-100/20 to-teal-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -45, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 right-0 w-[800px] h-[800px] bg-gradient-to-br from-teal-200/20 to-teal-300/20 rounded-full blur-3xl"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-teal-500/10 to-teal-600/10 text-teal-700 border border-teal-200">
              FEATURES
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Enterprise-Grade{" "}
            <span className="bg-gradient-to-r from-teal-600 to-teal-700 text-transparent bg-clip-text">
              Voice AI
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Transform your business communication with powerful AI voice
            technology that understands, responds, and delivers results.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-full"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r rounded-3xl transition-all duration-300 group-hover:opacity-100 opacity-0 p-[1px]">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl opacity-10`}
                />
              </div>

              {/* Card content */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-100/50 transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-0.5 shrink-0`}
                  >
                    <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-gray-900">
                      {feature.icon}
                    </div>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div className="mt-auto">{feature.preview}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
