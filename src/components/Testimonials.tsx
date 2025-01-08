import React from "react";
import { modernCardClass, cardInnerClass, glowClass } from "./ui/card-styles";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "VoiceAI has revolutionized how we handle customer support. The accuracy and natural flow of conversations is remarkable.",
      author: "Sarah Chen",
      role: "Head of Customer Success",
      company: "TechCorp"
    },
    {
      quote: "The multi-language support is a game-changer. We've expanded our global reach without expanding our team.",
      author: "Michael Rodriguez",
      role: "VP of Operations",
      company: "GlobalTech"
    },
    {
      quote: "Integration was seamless, and the AI's ability to understand context is impressive. It's like having a human assistant.",
      author: "Emily Watson",
      role: "Product Manager",
      company: "InnovateAI"
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Loved by Teams Worldwide
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See how VoiceAI is transforming the way teams work and communicate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={modernCardClass}>
              <div className={glowClass} />
              <div className={cardInnerClass + " p-8"}>
                <div className="mb-6">
                  <svg className="w-8 h-8 text-purple-400/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <blockquote className="text-gray-300 mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-white/10 pt-6">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="font-semibold text-white">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-gray-400">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;