import {
  RiAddLine,
  RiArrowRightLine,
  RiSearchLine,
  RiStarFill,
} from "react-icons/ri";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/scrollbar.css";

const SidebarAssistant = ({
  showCreateAssistant,
  setShowCreateAssistant,
  searchQuery,
  setSearchQuery,
  assistants,
  handleAssistantClick,
}) => {
  const filteredAssistants = assistants?.filter((assistant) =>
    assistant?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );
  return (
    <div className="w-[320px] z-10 border-r border-gray-200 flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 shadow-lg">
      <div className="p-6">
        <button
          onClick={() => setShowCreateAssistant(true)}
          className="w-full  bg-teal-500   text-white px-5 py-3 rounded-lg flex items-center justify-center hover:from-teal-600 hover:to-blue-600 transition-all mb-6 font-medium shadow-md hover:shadow-xl"
        >
          <RiAddLine className="mr-3" />
          <span className="font-semibold">Create Assistant</span>
        </button>

        <div className="relative mb-6">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search assistants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
          />
        </div>
      </div>

      <AssistantList
        assistants={filteredAssistants}
        onAssistantClick={handleAssistantClick}
      />
    </div>
  );
};

export default SidebarAssistant;

const AssistantList = ({ assistants, onAssistantClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);  
    return () => clearTimeout(timer);
  }, [ ]);

  return (
    <div className="px-4 h-screen overflow-y-auto box-border  border-right-gradient overscroll-y-auto transition-all ease-in-out duration-500 w-[300px] absolute lg:relative z-[9999999999999999] scrollbar-custom">
      {isLoading ? (
        <div className="text-center py-4 text-gray-500">
          Fetching assistants...
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5 }}
            className="h-1 bg-teal-500 mt-2"
          />
        </div>
      ) : Array.isArray(assistants) && assistants?.length > 0 ? (
        assistants.map((assistant) => (
          <AssistantCard
            key={assistant.id}
            assistant={assistant}
            onClick={() => onAssistantClick(assistant.id)}
          />
        ))
      ) : (
        <div className="text-center grid place-items-center py-4 text-gray-500">
          No assistant found
        </div>
      )}
    </div>
  );
};

const AssistantCard = ({ assistant, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className="px-6   mb-5   border  rounded-2xl     hover:shadow-2xl transition-all cursor-pointer group transform"
      onClick={onClick}
    >
      <div className="flex flex-row w-full   items-center">
        {/* <div className="mr-5 w-8 h-8  bg-white  ounded-full flex justify-center items-center  ">
          <span className="text-teal-600 text-xl font-semibold">
            {assistant?.name?.slice(0, 2).toUpperCase() || "AS"}
          </span>
        </div> */}

        <div className="flex mx-auto ">
          <div className="flex items-center justify-between">
            <span className="text-black font-semibold text-lg">
              {assistant.name || "Assistant"}
            </span>
            {assistant.isFavorite && <RiStarFill className="text-yellow-400" />}
          </div>
        </div>

        <RiArrowRightLine className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
};
