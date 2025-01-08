import React from 'react';
import { motion } from 'framer-motion';

const ProductSection = () => {
  const features = [
    {
      title: "Ready-made Templates",
      description: "Tailor to your needs and start handling calls right away with our industry-specific AI voice templates.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 10h8M8 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      gradient: "from-purple-500 to-indigo-500",
      preview: (
        <div className="bg-purple-50/50 rounded-xl p-4 h-[140px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              <span className="text-lg">👨‍💼</span>
            </div>
            <div>
              <div className="font-medium text-purple-900">SDR Agent</div>
              <div className="text-sm text-purple-600">Solar Industry</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-white rounded-full w-full"></div>
            <div className="h-2 bg-white rounded-full w-2/3"></div>
            <div className="h-2 bg-white rounded-full w-1/2"></div>
          </div>
        </div>
      )
    },
    {
      title: "Native Integrations",
      description: "Seamlessly connect with over 200+ platforms including CRM, telephony, calendars, and more.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M3 9v6m0 0v4a2 2 0 002 2h4m-6-6h18M21 9v6m0 0v4a2 2 0 01-2 2h-4m6-6H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-500",
      preview: (
        <div className="bg-blue-50/50 rounded-xl p-4 h-[140px]">
          <div className="grid grid-cols-3 gap-2 h-full">
            {[
              { name: 'Salesforce', icon: '💼' },
              { name: 'HubSpot', icon: '🎯' },
              { name: 'Zoom', icon: '🎥' },
              { name: 'Slack', icon: '💬' },
              { name: 'Google', icon: '📅' },
              { name: 'Teams', icon: '👥' },
            ].map((app, i) => (
              <div key={i} className="bg-white rounded-lg p-2 flex flex-col items-center justify-center gap-1 shadow-sm">
                <span className="text-base">{app.icon}</span>
                <span className="text-[10px] font-medium text-gray-700 truncate w-full text-center">{app.name}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Multilingual Support",
      description: "Engage customers globally with AI voice agents supporting 20+ languages and regional accents.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 3h7M12 19l-2 2m2-2l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      gradient: "from-rose-500 to-orange-500",
      preview: (
        <div className="bg-rose-50/50 rounded-xl p-4 h-[140px]">
          <div className="grid grid-cols-2 gap-2 h-full">
            {[
              { flag: '🇺🇸', lang: 'English', accent: 'US, UK, AU' },
              { flag: '🇪🇸', lang: 'Spanish', accent: 'ES, MX, AR' },
              { flag: '🇫🇷', lang: 'French', accent: 'FR, CA' },
              { flag: '🇩🇪', lang: 'German', accent: 'DE, AT' }
            ].map((lang, i) => (
              <div key={i} className="bg-white rounded-lg p-2 flex flex-col items-center justify-center gap-0.5 shadow-sm">
                <span className="text-xl">{lang.flag}</span>
                <span className="text-xs font-medium text-gray-900">{lang.lang}</span>
                <span className="text-[10px] text-gray-500">{lang.accent}</span>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/2 left-0 w-[800px] h-[800px] bg-gradient-to-br from-violet-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/20 to-cyan-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-violet-500/10 to-cyan-500/10 text-violet-700 border border-violet-200">
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
            <span className="bg-gradient-to-r from-violet-600 to-cyan-600 text-transparent bg-clip-text">
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
            Transform your business communication with powerful AI voice technology that understands, responds, and delivers results.
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
              className="group relative h-[280px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r rounded-3xl transition-all duration-300 group-hover:opacity-100 opacity-0 p-[1px]">
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl opacity-10`} />
              </div>

              <div className="relative bg-white rounded-3xl p-6 shadow-lg border border-gray-100 transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-0.5 shrink-0`}>
                    <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-gray-900">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div className="mt-auto">
                  {feature.preview}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection; 