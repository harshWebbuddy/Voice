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
    <div className="w-[320px] z-10 border-r border flex flex-col bg-gray-50">
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
    <div className="px-4 h-screen overflow-y-auto box-border w-[300px] absolute lg:relative scrollbar-custom">
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
      whileHover={{
        scale: 1.02,
        backgroundColor: "#f8fafc", // Very light gray on hover
      }}
      className="p-4 mb-2 bg-white rounded-lg border border-gray-100 transition-all cursor-pointer flex items-center justify-between group"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center shadow-sm">
          <span className="text-teal-600 text-sm font-semibold">
            {assistant?.name?.slice(0, 2).toUpperCase() || "AS"}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-800 font-medium text-sm group-hover:text-teal-600 transition-colors">
            {assistant.name || "Assistant"}
          </span>
          <span className="text-gray-400 text-xs">
            {assistant.type || "AI Assistant"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {assistant.isFavorite && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-yellow-400"
          >
            <RiStarFill className="w-4 h-4" />
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <RiArrowRightLine className="w-4 h-4" />
        </motion.div>
      </div>
    </motion.div>
  );
};
