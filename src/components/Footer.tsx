import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const navigation = {
    company: [
      { name: "About", href: "#" },
      // { name: "Team", href: "#" },
      // { name: "Careers", href: "#" },
      { name: "Blog", href: "/blogs" },
    ],
    product: [
      // { name: "Use Cases", href: "#" },
      // { name: "Documentation", href: "#" },
      { name: "Pricing", href: "#" },
      // { name: "Affiliates", href: "#" },
      { name: "FAQ", href: "#faq" },
    ],
    socials: [
      { name: "LinkedIn", href: "#" },
      { name: "Instagram", href: "#" },
      { name: "X", href: "#" },
      { name: "Discord", href: "#" },
      { name: "TikTok", href: "#" },
      { name: "Youtube", href: "#" },
    ],
  };

  return (
    <footer className="relative bg-black text-white/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 pt-20">
        {/* Navigation Grid */}
        <div
          className="grid grid-cols-3 gap-12 md:gap-24 justify-end md:ml-auto"
          style={{ maxWidth: "800px", marginLeft: "auto" }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-sm font-medium text-white mb-4">Company</h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-sm font-medium text-white mb-4">Product</h3>
              <ul className="space-y-3">
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-sm font-medium text-white mb-4">Socials</h3>
              <ul className="space-y-3">
                {navigation.socials.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Large Logo Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="absolute bottom-0 left-6 pb-24"
        >
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-light tracking-wide text-white/50"
            >
              Your Mind, Immortalized
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-[160px] font-bold tracking-tight text-white leading-none -mt-4"
            >
              Voice<span className="text-white/20">AI</span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-40"
        >
          <div className="py-6 flex flex-col md:flex-row md:items-center md:justify-end gap-4 text-sm">
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Terms of Use
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <span className="md:ml-6">
              © {new Date().getFullYear()} VoiceAI AI Inc.
            </span>
          </div>
        </motion.div>

        {/* Gradient Effects */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[128px] pointer-events-none" />
      </div>
    </footer>
  );
};

export default Footer;
