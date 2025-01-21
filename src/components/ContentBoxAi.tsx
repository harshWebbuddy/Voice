"use client";
import React, { useState } from "react";
const ContentBoxAi = () => {
  const [selectedSection, setSelectedSection] = useState<string>("intro");

  const handleClick = (id: string) => {
    setSelectedSection(id);
  };

  return (
    <div className="p-4 sm:p-6 md:p-0 flex md:flex-row flex-col max-w-[1240px] gap-4 sm:gap-6 md:gap-10 items-start justify-center mx-auto">
      <div className="flex flex-col gap-y-6 sm:gap-y-8 md:sticky md:top-10">
        <div className="hidden md:flex flex-col gap-y-4">
          <h2 className="text-[16px] sm:text-[18px] font-semibold">Contents</h2>
          <div className="flex flex-col text-black font-light gap-y-4 w-full">
            {[
              "intro",
              "hype",
              "complexity-overload",
              "black-box-effect",
              "lack-of-customization",
              "co-pilot",
            ].map(section => (
              <div
                key={section}
                className={`cursor-pointer ${
                  selectedSection === section
                    ? "border-[#034737] border-l-[4.8px] p-4"
                    : ""
                }`}
                onClick={() => handleClick(section)}
              >
                <a href={`#${section}`}>
                  <h2
                    className={`${
                      window.location.hash === `#${section}`
                        ? "text-[#034737] font-extrabold"
                        : "font-medium"
                    }`}
                  >
                    {section === "intro" && "Introduction"}
                    {section === "hype" && " Hype Train Has No Brakes"}
                    {section === "complexity-overload" && "Complexity Overload"}
                    {section === "black-box-effect" && "'Black Box' Effect"}
                    {section === "lack-of-customization" &&
                      "Lack of Customization"}
                    {section === "co-pilot" && "Gen AI as a Co-Pilot"}
                  </h2>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <div id="intro">
          {/* <h1 className="text-[32px] font-bold text-[#034737]">
            Cutting Through the Hype: Demystifying the Noise of Gen AI in Market
            Expansion
          </h1>
          <blockquote className="text-gray-600 italic">
            “The greatest enemy of knowledge is not ignorance, but the illusion
            of knowledge.” – Stephen Hawking.
          </blockquote> */}
          <p className="text-gray-700 mt-2 leading-relaxed">
            In the IT world, especially with AI-based SaaS provider companies,
            it sometimes looks as if we were playing charades. You know the one:
            a great deal of shifting, much vociferation, and—at times—an
            inspired conjecture. However, when you penetrate this veil, chances
            are high that the technological prospect of the advanced solutions
            that particular firm is selling does not meet the expectation. So
            why do so many of these providers fail? Hold on tight because we’re
            going to ride the uncontrolled rollercoaster of AI and SaaS while
            learning why the shiny gold isn’t always good. 🎢
          </p>
          {/* <p className="text-gray-700 mt-2 leading-relaxed">
            Picture it like this: If traditional marketing is a map, then Gen AI
            is your GPS system, guiding marketers to their destination. It is a
            tool for prospering in intricate environments, for finding blind
            spots that extend opportunities, and for bringing you to paths
            otherwise inaccessible. However, if incompetent, it can have you
            speeding in circles you do not even know exist. Here is how to fully
            harness it and grow your business frontiers without being consumed
            by the bubble.
          </p> */}
        </div>
        <div className="flex justify-center mt-6 mb-2">
          <img
            src="/landingpage.png"
            alt="Gen AI in Action"
            className="w-2/3 h-auto rounded"
          />
        </div>

        <div id="hype" className="flex flex-col gap-y-6">
          <h2 className="text-[24px] font-bold text-[#034737]">
            1. The Hype Train Has No Brakes: When the Bubble Was About to Burst
          </h2>
          <blockquote className="text-gray-600 italic bg-[#F1F8FF] py-4 text-center rounded-2xl">
            “The mind is everything. What you think you will become.” –
            <span className="font-bold not-italic">Buddha.</span>
          </blockquote>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Imagine this: you’re at a carnival and a mysterious man with dark
            shades introduces you to the newest attraction—the fantastic
            rollercoaster ride of the new generation. It rises, and then you
            think, “Uh oh, it’s time to ride this rusty wheel of fortune.” That
            is the hype train for AI if I have ever seen one. People come to the
            event with their AI solutions dressed up in beautiful brochures and
            shiny pitches, and then the reality is much different.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Stats alert! A new survey shows that up to 58% of firms suffer from
            AI unsatisfactory performance, and the main reason for this is the
            disappointment of expectations. Imagine going out to eat steak and
            eggs and being given a plate of watered-down soup.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            We at GrowStack know for a fact just how important expectation
            management is. Here, I state that we have no illusions—our strategy
            is straightforward: what you see is what you get. We don’t give out
            the moon; we offer a sound plan of how to get to the moon and back
            if you wish to. 🌙
          </p>
        </div>

        <div id="complexity-overload" className="flex flex-col gap-y-6">
          <h2 className="text-[24px] font-bold text-[#034737]">
            2. Complexity Overload: Now I Ain’t Saying They’re Just Too Smart
            for Their Own Good When It Comes to Solutions
          </h2>
          <blockquote className="text-gray-600 italic bg-[#F1F8FF] py-4 text-center rounded-2xl">
            “It is worse to be blind than to have the gift of seeing without
            being able to perceive.” –{" "}
            <span className="font-bold not-italic">Helen Keller.</span>
          </blockquote>
          <p className="text-gray-700 mt-2 leading-relaxed">
            AI is best described as something you can hardly comprehend while at
            the same time doing flaming sword dances. It’s surprising that many
            SaaS providers release their solutions with way too many features
            wrapped in industry terminology that even to begin using the
            application, one feels like he or she needs a degree. It is the
            worst form of overdosing with a positive thing in life that one
            could ever imagine.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            It is not very useful to have all sorts of fancy gizmos in your car
            if you don’t have the steering wheel to control it. That is the
            problem with complex AI; the UI becomes overly complicated for the
            user to master. According to McKinsey, such projects have a{" "}
            <strong>70% failure rate</strong> since the users do not adequately
            comprehend and implement this technology.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            As a company, usability is always high on our agenda here at
            GrowStack. This is why all our AI tools are crafted with your
            convenience in mind: it shouldn’t be rocket science; it shouldn’t be
            something that only a computer scientist can handle; it could be
            something your grandma uses—and she’s quite the smart one, isn’t
            she? 👵✨
          </p>
        </div>

        <div id="black-box-effect" className="flex flex-col gap-y-6">
          <h2 className="text-[24px] font-bold text-[#034737]">
            3. The “Black Box” Effect: Decisions Without Explanation
          </h2>
          <blockquote className="text-gray-600 italic bg-[#F1F8FF] py-4 text-center rounded-2xl">
            “If one cannot explain the matter of discussion to a six-year-old,
            he cannot explain it at all.” –{" "}
            <span className="font-bold not-italic">Albert Einstein.</span>
          </blockquote>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Picture this: you’re watching a play, and all of a sudden a rabbit
            appears out of a hat. In some cases, you are just dazzled but never
            really sure how it all transpired. This is the folly of many AI
            systems; you get an answer but have no idea how it was reached. This
            is the “Black Box” effect.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            <strong>70% of consumers</strong> desire a clear understanding of
            how their information will be utilized, but most AI suppliers tend
            to be very secretive about their algorithms. It’s like a restaurant
            owner who prepares a tasty dish but fails to disclose what went into
            preparing that dish. 🍽️
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            GrowStack does not believe in withholding information from clients,
            and that is why we will keep you informed. These AI tools do more
            than describe their actions to the user; they also justify the
            manner and reason for their actions.
          </p>
        </div>

        <div id="lack-of-customization" className="flex flex-col gap-y-6">
          <h2 className="text-[24px] font-bold text-[#034737]">
            4. Lack of Customization: One Size Fits No One
          </h2>
          <blockquote className="text-gray-600 italic bg-[#F1F8FF] py-4 text-center rounded-2xl">
            “People don’t buy what you do; they buy why you do it.” –{" "}
            <span className="font-bold not-italic">Simon Sinek.</span>
          </blockquote>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Think of phoning a butchery and the owner stating, “We provide only
            one kind of meat—It’s halal or nothing!” Frustrating, right? This is
            the state many businesses find themselves in whenever they come
            across one-size-fits-all kind of AI solutions. Every business is
            different; it’s just impossible to fit each of them into some sort
            of mold or clone them.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            A research study revealed that <strong>84% of executives</strong>{" "}
            believe that features like customization and scale are very
            important for AI applications. If your provider can’t accommodate
            you, it’s like putting on an oversized suit—it just doesn’t feel
            right.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            We appreciate that every business is unique at GrowStack, which is
            why you’ll benefit from a personalized, detailed analysis rather
            than one-size-fits-all recommendations any marketing agency can
            offer. Technology at our fingertips is customized to suit your
            business operations just as much as that well-fitted suit. 👔
          </p>
        </div>

        <div id="co-pilot" className="flex flex-col gap-y-6">
          <h2 className="text-[24px] font-bold text-[#034737]">
            5. Ignoring the Human Element: AI Is Not the Enemy
          </h2>
          <blockquote className="text-gray-600 italic bg-[#F1F8FF] py-4 text-center rounded-2xl">
            “That’s what really counts – technology is best when people can come
            together.” –{" "}
            <span className="font-bold not-italic">Matt Mullenweg.</span>
          </blockquote>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Let’s clear the air: AI is not here to destroy everything or to get
            your job done by someone else. That is at least what it is supposed
            to be—an extension of human abilities rather than a replacement for
            them. Unfortunately, a significant number of SaaS suppliers have
            fallen for the tendency to oversell AI, which in turn causes fear
            and skepticism among users.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Marketing experts surveyed for a report by Harvard Business Review
            disclosed that <strong>78% of respondents</strong> argued that using
            AI with inputs from people boosted success. Many people think that
            AI is going to replace them, but that’s not exactly true—AI is your
            partner, your assistant, your co-pilot. 🛩️
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            When it comes to AI, we must remember how important a role human
            beings play at GrowStack. It means that our tools are intended to
            complement your skills and creativity while you reach new heights—AI
            does all the grunt work.
          </p>
        </div>

        <div id="co-pilot" className="flex flex-col gap-y-6">
          <h2 className="text-[24px] font-bold text-[#034737]">
            Final Thoughts: In Its Use, Therefore, There Are Several Twists That
            One Should Avoid
          </h2>
          <p className="text-gray-700 mt-2 leading-relaxed">
            In a world where AI will be the magic wand to all our problems, it
            is easy to lose oneself in it. However, it is important to note that
            many AI-based SaaS providers can fail to deliver their potential due
            to several factors: primarily, when implementing complex solutions,
            there is usually little clarity on exactly how they are going to be
            solved; second, there can be a lot of customization; third, there is
            almost always a lack of the human factor.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            So, what’s the solution? Choose wisely. Seek providers that
            subscribe to a high level of openness, and which can deliver secure
            solutions that are tailored to your specific needs—like GrowStack.
            We are not just any random addition to your strategy; we are your
            guide in the shifting tides of digital marketing. 🌊
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Therefore, if you are planning to plunge yourself into the world of
            AI, then make sure to catch the real deals. This may well be true
            since at the end of the day this is not a game of the number of
            words said (rhetoric) but the amount achieved. Yes, let’s not just
            go along for the ride; let’s make our own tide, can we not? 🌊✨
          </p>
        </div>

        <h2 className="text-[24px] font-bold text-[#034737] mt-5">
          References
        </h2>
        <ul className="list-disc ml-5 mt-2">
          <li>
            <a
              href="https://www.symphonyai.com/glossary/ai/ai-saas-software-as-a-service/"
              className="text-blue-600 hover:underline"
            >
              Symphony AI: AI SaaS Software as a Service
            </a>
          </li>
          <li>
            <a
              href="https://www.polymerhq.io/blog/saas-ai-tools/"
              className="text-blue-600 hover:underline"
            >
              Polymer HQ: SaaS AI Tools
            </a>
          </li>
          <li>
            <a
              href="https://www.saasacademy.com/blog/artificial-intelligence-saas-industry"
              className="text-blue-600 hover:underline"
            >
              SaaS Academy: AI in the SaaS Industry
            </a>
          </li>
          <li>
            <a
              href="https://nextgeninvent.com/blogs/ai-saas-landscape/"
              className="text-blue-600 hover:underline"
            >
              Nextgen Invent: AI SaaS Landscape
            </a>
          </li>
          <li>
            <a
              href="https://www.onlysaasfounders.com/post/saas-ai-tools"
              className="text-blue-600 hover:underline"
            >
              Only SaaS Founders: SaaS AI Tools
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContentBoxAi;
