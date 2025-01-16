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
    <div className="w-[320px] z-10 border-r border-gray-200 flex flex-col bg-white">
      <div className="p-6">
        <button
          onClick={() => setShowCreateAssistant(true)}
          className="w-full bg-teal-500 text-white px-5 py-3 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-all mb-6 font-medium"
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
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
  }, []);

  return (
    <div className="px-4 h-screen overflow-y-auto box-border border-r border-gray-200 w-[300px] absolute lg:relative scrollbar-custom">
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
        <div className="text-center py-4 text-gray-500">No assistant found</div>
      )}
    </div>
  );
};

const AssistantCard = ({ assistant, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="p-4 mb-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
            <span className="text-teal-600 text-sm font-medium">
              {assistant?.name?.slice(0, 2).toUpperCase() || "AS"}
            </span>
          </div>
          <span className="text-gray-900 font-medium">
            {assistant.name || "Assistant"}
          </span>
        </div>
        {assistant.isFavorite && <RiStarFill className="text-yellow-400" />}
      </div>
    </motion.div>
  );
};
