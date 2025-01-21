"use client";
import { useState } from "react";
import { Link } from "react-router-dom";

const ContentBox = () => {
  const [selectedSection, setSelectedSection] = useState<string>("intro");

  const handleClick = (id: string) => {
    setSelectedSection(id);
  };
  // <div className="flex flex-col text-black font-light gap-y-4 w-full">
  //           {["intro", "understanding", "choosing", "black-box", "personalization", "co-pilot"].map((section) => (
  //             <div
  //               key={section}
  //               className={`cursor-pointer ${selectedSection === section ? "border-[#034737] border-l-[4.8px] p-4" : ""}`}
  //               onClick={() => handleClick(section)}
  //             >
  //               <h2
  //                 className={selectedSection === section ? "text-[#034737] font-extrabold" : "font-medium"}
  //               >
  //                 {section === "intro" && "Introduction"}
  //                 {section === "understanding" && "Understanding Gen AI"}
  //                 {section === "choosing" && "Choosing the Right Gen AI Partner"}
  //                 {section === "black-box" && "Say No to 'Black Box' AI"}
  //                 {section === "personalization" && "Personalization is Key"}
  //                 {section === "co-pilot" && "Gen AI as a Co-Pilot"}
  //               </h2>
  //             </div>
  //           ))}
  //         </div>
  return (
    <div className="p-4 sm:p-6 md:p-0 flex md:flex-row flex-col max-w-[1240px] gap-4 sm:gap-6 md:gap-10 items-start justify-center mx-auto">
      <div className="flex flex-col gap-y-6 sm:gap-y-8 md:sticky md:top-10">
        <div className="hidden md:flex flex-col gap-y-4">
          <h2 className="text-[16px] sm:text-[18px] font-semibold">Contents</h2>
          <div className="flex flex-col text-black font-light gap-y-4 w-full">
            {[
              "intro",
              "understanding",
              "choosing",
              "black-box",
              "personalization",
              "co-pilot",
            ].map((section) => (
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
                    {section === "understanding" && "Understanding Gen AI"}
                    {section === "choosing" &&
                      "Choosing the Right Gen AI Partner"}
                    {section === "black-box" && "Say No to 'Black Box' AI"}
                    {section === "personalization" && "Personalization is Key"}
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
            This is the world of Gen AI, and the noise is getting louder, where
            adjectives are becoming ad nauseam and the hyperbole is all hyped
            up. But do not despair – today we are going to take the noise apart
            and explain how Gen AI can lead to market growth in practice.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Picture it like this: If traditional marketing is a map, then Gen AI
            is your GPS system, guiding marketers to their destination. It is a
            tool for prospering in intricate environments, for finding blind
            spots that extend opportunities, and for bringing you to paths
            otherwise inaccessible. However, if incompetent, it can have you
            speeding in circles you do not even know exist. Here is how to fully
            harness it and grow your business frontiers without being consumed
            by the bubble.
          </p>
        </div>
        <div className="flex justify-center mt-6 mb-2">
          <img
            src="/l1.svg"
            alt="Gen AI in Action"
            className="w-2/3 h-auto rounded"
          />
        </div>

        <div id="understanding" className="flex flex-col gap-y-6">
          <h2 className="text-[24px] font-bold text-[#034737]">
            1. Understanding Gen AI: More Than Just Hype
          </h2>
          <blockquote className="text-gray-600 italic bg-[#F1F8FF] py-4 text-center rounded-2xl  ">
            “The future is already here — it’s just not very evenly
            distributed.” –
            <span className="font-bold  not-italic">William Gibson.</span>
          </blockquote>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Gen AI, short for{" "}
            <strong>Generative Artificial Intelligence</strong>, has been touted
            as the next big thing for almost everything: writing content, data
            processing, product suggestions, and so on. But what does it really
            do?
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Let’s now compare Gen AI to being the{" "}
            <strong>“n”th generation of knives</strong>, where it is in fact a{" "}
            <strong>Swiss Army Knife of data intelligence</strong>. That doesn’t
            mean it spits out facts; it is capable of learning and coming up
            with decisions based on patterns in large sets of data. Take, for
            example, an intern who sorts out the documents and tells you which
            client is most likely to close next, writes the email for the offer,
            and tells you where the client is likely to be reached. But here’s
            the kicker: With the current reported hit rates at approximately
            70%, that means up to 30% of any corresponding investment into Gen
            AI does not generate a positive ROI. Why? Because they overemphasize
            the capacity of the weapon or underutilize the weapon system's
            potential. It’s similar to purchasing a great-looking high-end
            sports car and then using it solely for getting milk.
          </p>
        </div>
        <div id="choosing" className="flex flex-col gap-y-6">
          <h2 className="text-[24px] font-bold text-[#034737]">
            2. Choosing the Right Gen AI Partner: One Size Doesn’t Fit All
          </h2>
          <blockquote className="text-gray-600 italic bg-[#F1F8FF] py-4 text-center rounded-2xl  ">
            “It is all therefore never afterward, for quality we know is not
            designed by happenstance, but it comes as the end segment of a whole
            multi-faceted planned sequence.” –
            <span className="font-bold  not-italic"> John Ruskin.</span>
          </blockquote>
          <p className="text-gray-700 mt-2 leading-relaxed text-sm">
            According to a <strong>Forbes</strong> article, <strong>84%</strong>{" "}
            of executives stated that scalability and customization are vital
            for the future success of AI. Gen AI solutions from{" "}
                <Link
                  to="https://growstack.ai/"
              className="underline text-blue-600 font-bold"
            >
              GrowStack
            </Link>{" "}
            are built to be unique for your business, like a tailor-made suit.
            Whether you're launching a startup, developing content automation,
            or working as an enterprise aiming to get closer to consumers, our
            tools adapt to your needs. We don’t just want to be a presence; we
            aim to lead that presence.
          </p>

          <p className="text-gray-700 mt-2 leading-relaxed">
            According to a<strong> Forbes</strong> article, <strong>84%</strong>{" "}
            of executives stated that scalability and customization are vital
            for the future success of AI. Gen AI solutions from GrowStack are
            built to be unique for your business, like a tailor-made suit.
            Regardless of whether you use our tools to launch a new startup, to
            develop an idea of content automation, or as an enterprise of any
            kind trying to get closer to the consumer, our tools adjust to your
            requirements. We don’t just want to be a presence; we want to be
            leading that presence.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            As cited by Gartner the other day, <strong>65% of customers</strong>{" "}
            would like to understand how their data is utilized. We welcome Open
            AI as the novelty. If you wish to make your marketing strategy more
            specific to the actions of consumers, then? Not only do we explain
            why these particular strategies are the best ones to employ, but we
            also deconstruct how we came up with such strategies, providing you
            with the confidence you need to gain an edge.
          </p>
        </div>

        <div id="black-box" className="flex flex-col gap-y-6">
          <h2 className="text-[24px] font-bold text-[#034737]">
            3. Say No to “Black Box” AI: Transparency is King
          </h2>
          <blockquote className="text-gray-600 italic bg-[#F1F8FF] py-4 text-center rounded-2xl  ">
            “If you can’t explain it to a six-year-old, you really don’t
            understand it.” –{" "}
            <span className="font-bold  not-italic">Albert Einstein.</span>
          </blockquote>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Some Gen AI platforms are like mystery boxes: they give you nice
            results but don’t tell you how they are making those decisions. It’s
            like ending up with a pile of charts and graphs that say, “Well,
            here we are, but how did we get here?” They call this the{" "}
            <strong>“Black Box” effect</strong>, and it’s not good news for
            anyone.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            I believe no one wakes up in the morning and decides they want to go
            have dinner at a restaurant, order a nice juicy steak only to have
            the chef not explain what all is in the dish. Sketchy, right? The
            same goes for AI: if you do not know why your AI is providing advice
            on a particular strategy, you should not implement it.{" "}
            <strong>Transparency is a key value at GrowStack.</strong>
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            As cited by Gartner the other day, <strong>65% of customers</strong>{" "}
            would like to understand how their data is utilized. We welcome Open
            AI as the novelty. If you wish to make your marketing strategy more
            specific to the actions of consumers, then? Not only do we explain
            why these particular strategies are the best ones to employ, but we
            also deconstruct how we came up with such strategies, providing you
            with the confidence you need to gain an edge.
          </p>
        </div>

        <div id="personalization" className="flex flex-col gap-y-6">
          <h2 className="text-[24px] font-bold text-[#034737]">
            4. Personalization is Key: No More Fishing with a Net
          </h2>
          <blockquote className="text-gray-600 italic bg-[#F1F8FF] py-4 text-center rounded-2xl  ">
            “People don’t buy what you do; they buy why you do it.” –{" "}
            <span className="font-bold  not-italic"> Simon Sinek.</span>
          </blockquote>
          <p className="text-gray-700 mt-2 leading-relaxed">
            If your marketing is unfocused, you are fishing with a seine;
            although you will harvest something, it is unlikely to be the supply
            chain that is required. Gen AI enables replacing that net with a
            more focused spear. It’s about <strong>precision marketing</strong>:
            effective, specific, and powerful.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            For instance, Salesforce has reported that businesses that have
            adopted Artificial Intelligence for their campaigns reap a{" "}
            <strong>30% boost in customer engagement</strong>. Gen AI provides
            you with the ability to target your audiences with sixth sense
            precision, write copy that truly speaks to the individual, and
            anticipate their needs before they know them themselves. All the
            tools at GrowStack are designed to address your audience in a way
            that makes the engagement unique and valuable to the recipient.
            We’re not about attaining quantity marketing; we’re about attaining
            value marketing.
          </p>
        </div>

        <div id="co-pilot" className="flex flex-col gap-y-6">
          <h2 className="text-[24px] font-bold text-[#034737]">
            5. Gen AI is a Co-Pilot and Not an Auto-Pilot
          </h2>
          <blockquote className="text-gray-600 italic bg-[#F1F8FF] py-4 text-center rounded-2xl  ">
            “This steam technology is the best because it enables people to come
            closer.” –{" "}
            <span className="font-bold  not-italic">Matt Mullenweg.</span>
          </blockquote>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Let’s be clear: Finally, let me chat for a while about what AI is
            not, because there are some misconceptions that need to be laid to
            rest here. AI is not a panacea; it does not have a secret database
            that can solve all of your business needs. It is like a high-powered
            BHP car — it can enhance your processes, increase your throughput,
            and enhance productivity. Though it demands a skilled operator. The
            best use of AI is not about computing versus human; it is actually
            about empowering the human.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            According to the Harvard Business Review,{" "}
            <strong>78% of marketers</strong> claimed that the use of human and
            AI together improved the success rates. Why? Because humans can
            contextualize, create, and negotiate, whereas AI can compute,
            quantify, and evaluate. That’s why, with GrowStack, we don’t just
            sit in the cockpit and give you orders; we are co-pilots. Your human
            team is supported by our Gen AI tools, allowing your team to make
            strategic decisions and foster relationships with the data provided
            by the tool, along with helping in banal workflow. Let’s consider
            ourselves as your means of going online, a companion who is always
            around yet never intrusive.
          </p>
        </div>

        <div id="co-pilot" className="flex flex-col gap-y-6">
          <h2 className="text-[24px] font-bold text-[#034737]">
            Final Thoughts: Infuse Gen AI Properly for Market Growth
          </h2>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Selecting the appropriate Gen AI for market expansion can be
            compared with the selection of a coach for a championship team. The
            wrong one creates confusion, mistakes, and most importantly,
            failure. But the right one? It’s true that they will unleash the
            latent, rich, and enhance the best part and guide you to win. So,
            never mind the hype—if you are a small business, a startup, or even
            a Fortune 500 company – look for an AI partner who is transparent
            and willing to work on your terms and goals.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            And remember:{" "}
            <strong>
              GrowStack is not just another tool in your tech stack
            </strong>{" "}
            – we are your growth partner who guides you in a sea of digital
            marketing opportunities and challenges. Therefore, are you ready to
            leave the hype behind and have an idea of how to tap the true
            potential of Gen AI?
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Choose wisely. Choose <strong>GrowStack</strong>. 📈💪
          </p>
        </div>

        <h2 className="text-[24px] font-bold text-[#034737] mt-5">
          References
        </h2>
        <ul className="list-disc ml-5 mt-2">
          <li>
            <a
              href="https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-generative-ai"
              className="text-blue-600 hover:underline"
            >
              McKinsey: What is Generative AI
            </a>
          </li>
          <li>
            <a
              href="https://masterofcode.com/blog/benefits-of-generative-ai"
              className="text-blue-600 hover:underline"
            >
              Master of Code: Benefits of Generative AI
            </a>
          </li>
          <li>
            <a
              href="https://www.statista.com/outlook/tmo/artificial-intelligence/generative-ai/worldwide"
              className="text-blue-600 hover:underline"
            >
              Statista: Generative AI Worldwide
            </a>
          </li>
          <li>
            <a
              href="https://www.bcg.com/capabilities/artificial-intelligence/generative-ai"
              className="text-blue-600 hover:underline"
            >
              BCG: Generative AI
            </a>
          </li>
          <li>
            <a
              href="https://www.delve.ai/blog/generative-ai-marketing"
              className="text-blue-600 hover:underline"
            >
              Delve: Generative AI Marketing
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContentBox;
