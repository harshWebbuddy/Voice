import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiAddLine, 
  RiPhoneLine, 
  RiMoreLine,
  RiTimeLine,
  RiFileCopyLine,
  RiDeleteBinLine,
  RiQuestionLine,
  RiCheckLine,
  RiDiscordFill,
  RiSettings4Line,
  RiSearchLine,
  RiArrowRightLine,
  RiStarLine,
  RiStarFill,
  RiArrowDownSLine,
  RiFolderLine,
  RiFileTextLine,
  RiVideoLine,
  RiCustomerService2Line,
  RiGamepadLine
} from 'react-icons/ri';

interface Assistant {
  id: string;
  name: string;
  description: string;
  type: string;
  isFavorite: boolean;
  lastUsed: string;
}

const assistants: Assistant[] = [
  {
    id: '1',
    name: 'Customer Support',
    description: 'Handles customer inquiries and support tickets',
    type: 'Support',
    isFavorite: true,
    lastUsed: '2 hours ago'
  },
  {
    id: '2',
    name: 'Sales Assistant',
    description: 'Qualifies leads and handles sales inquiries',
    type: 'Sales',
    isFavorite: false,
    lastUsed: '1 day ago'
  },
  {
    id: '3',
    name: 'Appointment Scheduler',
    description: 'Manages calendar and schedules appointments',
    type: 'Scheduling',
    isFavorite: true,
    lastUsed: '3 days ago'
  }
];

const AssistantPage = () => {
  const [selectedTab, setSelectedTab] = useState('Model');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(false);
  const [showCreateAssistant, setShowCreateAssistant] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [assistantName, setAssistantName] = useState('');
  const [assistantsList, setAssistantsList] = useState(assistants);
  const assistantId = '2e459257-27b8-4p3k';
  const [providerOpen, setProviderOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [addVoiceManually, setAddVoiceManually] = useState(false);

  const tabs = [
    { id: 'Model', icon: '💭', label: 'Model' },
    { id: 'Voice', icon: '🎤', label: 'Voice' },
    { id: 'Functions', icon: '⚡', label: 'Functions' },
    { id: 'Advanced', icon: '⚙️', label: 'Advanced' },
    { id: 'Analysis', icon: '📊', label: 'Analysis' }
  ];

  const handleCopyId = () => {
    navigator.clipboard.writeText(assistantId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const filteredAssistants = assistants.filter(assistant => 
    assistant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assistant.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle template selection
  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
  };

  // Function to create new assistant
  const handleCreateAssistant = () => {
    if (!assistantName.trim()) {
      // You might want to show an error message here
      return;
    }

    const newAssistant: Assistant = {
      id: Math.random().toString(36).substr(2, 9), // Simple random ID generation
      name: assistantName,
      description: 'This blank slate assistant with minimal configurations.',
      type: 'Custom',
      isFavorite: false,
      lastUsed: 'Just now'
    };

    setAssistantsList(prev => [newAssistant, ...prev]);
    setShowCreateAssistant(false);
    setAssistantName('');
    setSelectedTemplate('');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex">
      {/* Create Assistant Slide Panel */}
      <AnimatePresence>
        {showCreateAssistant && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setShowCreateAssistant(false)}
            />
            
            {/* Slide Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 h-full w-1/3 bg-white z-50 overflow-y-auto"
            >
              <div className="p-6 pb-24">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                    <RiAddLine className="w-5 h-5 text-teal-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Create Assistant</h2>
                </div>

                <div className="space-y-6">
                  {/* Choose Template Section */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Choose a template</h3>
                    <p className="text-gray-500 text-sm mb-6">
                      Here's a few templates to get you started, or you can create your own template and use it to create a new assistant.
                    </p>

                    {/* Assistant Name */}
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Assistant Name <span className="text-amber-500 ml-1">(This can be adjusted at any time after creation.)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="test b1"
                        value={assistantName}
                        onChange={(e) => setAssistantName(e.target.value)}
                        className="w-full bg-white text-gray-900 rounded-lg px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400"
                      />
                    </div>

                    {/* Blank Template */}
                    <div 
                      className={`bg-white rounded-lg border ${selectedTemplate === 'blank' ? 'border-teal-500' : 'border-gray-200'} p-4 cursor-pointer hover:bg-gray-50 transition-colors mb-6`}
                      onClick={() => handleTemplateSelect('blank')}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <RiAddLine className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <h4 className="text-gray-900 font-medium mb-1">Blank Template</h4>
                          <p className="text-gray-500 text-sm">This blank slate template with minimal configurations. It's a starting point for creating your custom assistant.</p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Start Templates */}
                    <div>
                      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">QUICKSTART</div>
                      <div className="grid grid-cols-2 gap-4">
                        {/* Appointment Setter */}
                        <div className="bg-white rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors border border-gray-200">
                          <div className="flex flex-col h-full">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                              <RiTimeLine className="w-5 h-5 text-blue-600" />
                            </div>
                            <h4 className="text-gray-900 font-medium mb-2">Appointment Setter</h4>
                            <p className="text-gray-500 text-sm flex-grow">Designed for dental practices to demonstrate setting appointments. It streamlines scheduling, answers common questions, and provides service information.</p>
                          </div>
                        </div>

                        {/* Customer Support */}
                        <div className="bg-white rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors border border-gray-200">
                          <div className="flex flex-col h-full">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                              <RiCustomerService2Line className="w-5 h-5 text-green-600" />
                            </div>
                            <h4 className="text-gray-900 font-medium mb-2">Customer Support</h4>
                            <p className="text-gray-500 text-sm flex-grow">A versatile template designed with a perfect mix of emotional intelligence and technical knowledge. Ideal for empathetic, efficient customer support.</p>
                          </div>
                        </div>

                        {/* Inbound Q/A */}
                        <div className="bg-white rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors border border-gray-200">
                          <div className="flex flex-col h-full">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                              <RiQuestionLine className="w-5 h-5 text-purple-600" />
                            </div>
                            <h4 className="text-gray-900 font-medium mb-2">Inbound Q/A</h4>
                            <p className="text-gray-500 text-sm flex-grow">An inbound call agent example designed to provide comprehensive support for SmartHome Innovations. With a deep understanding of product details and troubleshooting.</p>
                          </div>
                        </div>

                        {/* Game NPC */}
                        <div className="bg-white rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors border border-gray-200">
                          <div className="flex flex-col h-full">
                            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                              <RiGamepadLine className="w-5 h-5 text-amber-600" />
                            </div>
                            <h4 className="text-gray-900 font-medium mb-2">Game NPC</h4>
                            <p className="text-gray-500 text-sm flex-grow">An assistant for demonstrating an in-game NPC. Elenya is designed to offer guidance, lore, and insights into the mysteries of the natural world.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Buttons */}
                <div className="fixed bottom-0 left-0 w-1/3 p-6 bg-white border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => {
                        setShowCreateAssistant(false);
                        setAssistantName('');
                        setSelectedTemplate('');
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Close
                    </button>
                    <button 
                      onClick={handleCreateAssistant}
                      disabled={!selectedTemplate || !assistantName.trim()}
                      className={`px-6 py-2 bg-teal-500 text-white rounded-lg transition-colors font-medium ${
                        !selectedTemplate || !assistantName.trim() 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-teal-600'
                      }`}
                    >
                      Create Assistant
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Left Sidebar - List of Assistants */}
      <div className="w-[320px] border-r border-gray-200 flex flex-col bg-gray-50">
        <div className="p-4">
          <button 
            onClick={() => setShowCreateAssistant(true)}
            className="w-full bg-teal-500 text-white px-4 py-2.5 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors mb-4 font-medium shadow-sm"
          >
            <RiAddLine className="mr-2" />
            Create Assistant
          </button>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search assistants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Assistant List */}
        <div className="flex-1 overflow-auto">
          <div className="space-y-1">
            {assistantsList.filter(assistant => 
              assistant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              assistant.description.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((assistant) => (
              <motion.div
                key={assistant.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 hover:bg-white transition-all cursor-pointer group"
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="text-gray-900 font-medium">{assistant.name}</span>
                      {assistant.isFavorite && (
                        <RiStarFill className="ml-2 text-amber-400" />
                      )}
                    </div>
                    <div className="text-sm text-gray-500 mt-0.5">{assistant.description}</div>
                    <div className="flex items-center mt-2 text-xs text-gray-400">
                      <span className="px-2 py-1 bg-gray-100 rounded-full">{assistant.type}</span>
                      <span className="ml-2">Last used {assistant.lastUsed}</span>
                    </div>
                  </div>
                  <RiArrowRightLine className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">New Assistant</h1>
            <button className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors">
              <RiStarLine className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-teal-600 transition-colors font-medium shadow-sm"
            >
              <RiPhoneLine className="mr-2" />
              Talk with Assistant
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-teal-600 transition-colors font-medium shadow-sm"
            >
              <RiCheckLine className="mr-2" />
              Publish
            </motion.button>
            <div className="relative">
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <RiMoreLine className="w-5 h-5 text-gray-500" />
              </button>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                  >
                    <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center">
                      <RiTimeLine className="mr-2 text-gray-400" />
                      Call Logs
                    </button>
                    <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center">
                      <RiFileCopyLine className="mr-2 text-gray-400" />
                      Duplicate
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center">
                      <RiDeleteBinLine className="mr-2" />
                      Delete
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Main Content with Shadow */}
        <div className="flex-1 p-6 bg-gray-50 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            {/* Assistant ID Section */}
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-gray-500">Assistant ID</span>
              <div className="bg-gray-50 px-3 py-1.5 rounded-lg flex items-center border border-gray-200">
                <span className="text-sm text-gray-600 mr-2 font-mono">{assistantId}</span>
                <motion.button 
                  onClick={handleCopyId}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-gray-600 transition-colors relative"
                >
                  {copiedId ? (
                    <RiCheckLine className="w-4 h-4 text-teal-500" />
                  ) : (
                    <RiFileCopyLine className="w-4 h-4" />
                  )}
                  {copiedId && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: -30 }}
                      exit={{ opacity: 0 }}
                      className="absolute left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded"
                    >
                      Copied!
                    </motion.div>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Tabs with animations */}
            <div className="border-b border-gray-200 -mx-6 px-6">
              <div className="flex items-center -mb-px overflow-x-auto">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`px-5 py-3 flex items-center space-x-2 border-b-2 transition-all font-medium whitespace-nowrap ${
                      selectedTab === tab.id
                        ? 'border-teal-500 text-teal-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tab Content with animations */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="pt-8"
              >
                {selectedTab === 'Model' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-900">Model</h2>
                    <p className="text-gray-500 mb-6">
                      This section allows you to configure the model for the assistant.
                    </p>

                    <div className="grid grid-cols-12 gap-8">
                      {/* Left Column - Text Areas */}
                      <div className="col-span-8 space-y-6">
                        {/* First Message */}
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <label className="text-gray-700 font-medium">First Message</label>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="relative ml-2 cursor-help"
                            >
                              <RiQuestionLine className="text-gray-400 w-4 h-4" />
                            </motion.div>
                          </div>
                          <textarea
                            className="w-full h-32 bg-white text-gray-900 rounded-lg p-4 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none hover:border-gray-300 transition-colors"
                            placeholder="Enter your first message..."
                          />
                        </div>

                        {/* System Prompt */}
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <label className="text-gray-700 font-medium">System Prompt</label>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="relative ml-2 cursor-help"
                            >
                              <RiQuestionLine className="text-gray-400 w-4 h-4" />
                            </motion.div>
                          </div>
                          <textarea
                            className="w-full h-32 bg-white text-gray-900 rounded-lg p-4 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none hover:border-gray-300 transition-colors"
                            defaultValue="This is a blank template with minimal defaults, you can change the model, temperature, and messages."
                          />
                        </div>
                      </div>

                      {/* Right Column - Settings */}
                      <div className="col-span-4 space-y-6">
                        {/* Provider */}
                        <div className="space-y-2">
                          <label className="block text-gray-700 font-medium">Provider</label>
                          <div className="relative">
                            <button
                              onClick={() => setProviderOpen(!providerOpen)}
                              className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-3 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none hover:border-gray-300 transition-colors flex items-center justify-between"
                            >
                              <span className="flex items-center">
                                <img src="/openai-logo.png" alt="OpenAI" className="w-5 h-5 mr-2" />
                                <span>OpenAI</span>
                              </span>
                              <RiArrowDownSLine className={`transform transition-transform ${providerOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            <AnimatePresence>
                              {providerOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="absolute w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-10 py-1"
                                >
                                  <button className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center">
                                    <img src="/openai-logo.png" alt="OpenAI" className="w-5 h-5 mr-2" />
                                    <span>OpenAI</span>
                                  </button>
                                  <button className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center">
                                    <img src="/google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
                                    <span>Google</span>
                                  </button>
                                  <button className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center">
                                    <img src="/anthropic-logo.png" alt="Anthropic" className="w-5 h-5 mr-2" />
                                    <span>Anthropic</span>
                                  </button>
                                  <button className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center">
                                    <img src="/perplexity-logo.png" alt="Perplexity" className="w-5 h-5 mr-2" />
                                    <span>Perplexity AI</span>
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* Model */}
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <label className="text-gray-700 font-medium">Model</label>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="relative ml-2 cursor-help"
                            >
                              <RiQuestionLine className="text-gray-400 w-4 h-4" />
                            </motion.div>
                          </div>
                          <div className="relative">
                            <button
                              onClick={() => setModelOpen(!modelOpen)}
                              className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-3 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none hover:border-gray-300 transition-colors flex items-center justify-between"
                            >
                              <span className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                <span>GPT 4o</span>
                              </span>
                              <RiArrowDownSLine className={`transform transition-transform ${modelOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            <AnimatePresence>
                              {modelOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="absolute w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-10 py-1"
                                >
                                  <button className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    <span>GPT 4o</span>
                                  </button>
                                  <button className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    <span>GPT 4o Mini</span>
                                  </button>
                                  <button className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                    <span>GPT 4o Turbo</span>
                                  </button>
                                  <button className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center">
                                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                                    <span>GPT 4o Cluster</span>
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* Knowledge Base */}
                        <div className="space-y-2">
                          <label className="block text-gray-700 font-medium">Knowledge Base</label>
                          <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                            {/* Header */}
                            <div className="p-4 border-b border-gray-200 bg-white">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <RiFolderLine className="text-gray-400" />
                                  <span className="text-sm text-gray-700 font-medium">Selected Files</span>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => window.location.href = '/files'}
                                  className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center bg-teal-50 px-3 py-1.5 rounded-md"
                                >
                                  <RiAddLine className="mr-1" />
                                  Add a new file
                                </motion.button>
                              </div>
                            </div>
                            
                            {/* Empty State */}
                            <div className="p-8 flex flex-col items-center justify-center text-center bg-gray-50">
                              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
                                <RiFileTextLine className="w-6 h-6 text-gray-400" />
                              </div>
                              <p className="text-gray-600 font-medium mb-2">No files selected</p>
                              <p className="text-gray-500 text-sm mb-4">Select files to enhance your assistant's knowledge</p>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => window.location.href = '/files'}
                                className="text-teal-600 hover:text-teal-700 text-sm font-medium bg-white px-4 py-2 rounded-md border border-gray-200 shadow-sm flex items-center"
                              >
                                <RiSearchLine className="mr-2" />
                                Browse files
                              </motion.button>
                            </div>
                          </div>
                        </div>

                        {/* Max Tokens */}
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <label className="text-gray-700 font-medium">Max Tokens</label>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="relative ml-2 cursor-help"
                            >
                              <RiQuestionLine className="text-gray-400 w-4 h-4" />
                            </motion.div>
                          </div>
                          <input
                            type="number"
                            defaultValue="250"
                            className="w-full bg-white text-gray-900 rounded-lg px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent hover:border-gray-300 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'Voice' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-900">Voice Configuration</h2>
                    <p className="text-gray-500 mb-6">
                      Choose from the list of voices, or sync your voice library if you aren't able to find your voice in the dropdown. If you are still facing any error, you can enable custom voice and add a voice ID manually.
                    </p>

                    <div className="space-y-6">
                      {/* Provider and Voice Selection */}
                      <div className="grid grid-cols-2 gap-6">
                        {/* Provider */}
                        <div className="space-y-2">
                          <label className="block text-gray-700 font-medium">Provider</label>
                          <div className="relative">
                            <select className="w-full bg-white text-gray-900 rounded-lg px-4 py-2.5 border border-gray-200 appearance-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer hover:border-gray-300 transition-colors">
                              <option value="cartesia">cartesia</option>
                            </select>
                            <RiArrowDownSLine className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                        </div>

                        {/* Voice */}
                        <div className="space-y-2">
                          <label className="block text-gray-700 font-medium">Voice</label>
                          <div className="relative">
                            <select className="w-full bg-white text-gray-900 rounded-lg px-4 py-2.5 border border-gray-200 appearance-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer hover:border-gray-300 transition-colors">
                              <option value="voice-id">248be419-c632-4f23-adf1-5324ed7dbf1d</option>
                            </select>
                            <RiArrowDownSLine className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Add Voice ID Manually */}
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="addVoiceManually"
                          checked={addVoiceManually}
                          onChange={(e) => setAddVoiceManually(e.target.checked)}
                          className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <label htmlFor="addVoiceManually" className="text-gray-700">Add Voice ID Manually</label>
                      </div>
                      
                      {/* Model */}
                      <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Model</label>
                        <div className="relative">
                          <select className="w-full bg-white text-gray-900 rounded-lg px-4 py-2.5 border border-gray-200 appearance-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer hover:border-gray-300 transition-colors">
                            <option value="sonic-english">Sonic English</option>
                          </select>
                          <RiArrowDownSLine className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        <p className="text-gray-500 text-sm mt-1">This is the model that will be used.</p>
                    </div>

                      {/* Additional Configuration */}
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Configuration</h3>
                          <div className="space-y-6">
                            {/* Background Sound */}
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <label className="text-gray-700 font-medium">Background Sound</label>
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  className="relative ml-2 cursor-help"
                                >
                                  <RiQuestionLine className="text-gray-400 w-4 h-4" />
                                </motion.div>
                              </div>
                              <div className="relative">
                                <select className="w-full bg-white text-gray-900 rounded-lg px-4 py-2.5 border border-gray-200 appearance-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer hover:border-gray-300 transition-colors">
                                  <option value="default">Default</option>
                                </select>
                                <RiArrowDownSLine className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                              </div>
                            </div>

                            {/* Input Min Characters */}
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <label className="text-gray-700 font-medium">Input Min Characters</label>
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  className="relative ml-2 cursor-help"
                                >
                                  <RiQuestionLine className="text-gray-400 w-4 h-4" />
                                </motion.div>
                              </div>
                              <input
                                type="number"
                                defaultValue="10"
                                className="w-full bg-white text-gray-900 rounded-lg px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent hover:border-gray-300 transition-colors"
                              />
                            </div>

                            {/* Punctuation Boundaries */}
                            <div className="space-y-2">
                              <label className="block text-gray-700 font-medium">Punctuation Boundaries</label>
                              <div className="relative">
                                <select className="w-full bg-white text-gray-900 rounded-lg px-4 py-2.5 border border-gray-200 appearance-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer hover:border-gray-300 transition-colors">
                                  <option value="none">No Punctuation Boundaries Added</option>
                                </select>
                                <RiArrowDownSLine className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                              </div>
                              <p className="text-gray-500 text-sm mt-1">These are the punctuations that are considered valid boundaries or delimiters. This helps decides the chunks that are sent to the voice provider for the voice generation as the LLM tokens are streaming in.</p>
                            </div>

                            {/* Toggle Switches */}
                            <div className="space-y-4">
                              {/* Filler Injection */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <label className="text-gray-700 font-medium">Filler Injection Enabled</label>
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="relative cursor-help"
                                  >
                                    <RiQuestionLine className="text-gray-400 w-4 h-4" />
                                  </motion.div>
                                </div>
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    defaultChecked={true}
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                                </div>
                    </div>

                              {/* Backchanneling */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <label className="text-gray-700 font-medium">Backchanneling Enabled</label>
                      <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="relative cursor-help"
                      >
                                    <RiQuestionLine className="text-gray-400 w-4 h-4" />
                      </motion.div>
                                </div>
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    defaultChecked={true}
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                                </div>
                              </div>
                              <p className="text-gray-500 text-sm">Make the bot say words like 'mhmm', 'ya' etc. while listening to make the conversation sounds natural. Default disabled</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'Functions' && (
                  <div>
                    {/* Tools Section */}
                    <div className="mb-10">
                      <h2 className="text-xl font-semibold mb-2 text-gray-900">Tools</h2>
                      <p className="text-gray-500 mb-6">
                        Tools are a way you can enable your voicebots to perform certain actions and tasks during the call. Add your tools from the Tools Library page to your voicebots to connect with Make.com or GHL workflows. You can also have custom tools with your own backend.
                      </p>

                      {/* Info Note */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <RiQuestionLine className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-blue-700">
                            Note: Tools have different Request and Response format as compared to Functions. Check our{' '}
                            <button className="text-blue-600 hover:text-blue-700 font-medium underline">
                              tools guide
                            </button>{' '}
                            for more details
                          </p>
                        </div>
                      </div>

                      {/* Tools Dropdown */}
                      <div className="relative">
                        <button
                          className="w-full bg-white text-gray-900 rounded-lg px-4 py-3 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none hover:border-gray-300 transition-colors flex items-center justify-between"
                        >
                          <span className="text-gray-500">Select Tools</span>
                          <RiArrowDownSLine className="text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Predefined Functions Section */}
                    <div className="mb-10">
                      <h2 className="text-xl font-semibold mb-2 text-gray-900">Predefined Functions</h2>
                      <p className="text-gray-500 mb-6">
                        We've pre-built functions for common use cases. You can enable them and configure them below.
                      </p>

                      {/* Function Cards */}
                      <div className="space-y-4">
                        {/* End Call Function */}
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <div className="p-5">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <div className="mt-1">
                                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                    <RiPhoneLine className="w-5 h-5 text-red-600" />
                                  </div>
                                </div>
                                <div>
                                  <h3 className="text-gray-900 font-medium">Enable End Call Function</h3>
                                  <p className="text-gray-500 text-sm mt-1">
                                    This will allow the assistant to end the call from its side. (Best for gpt-4 and bigger models)
                                    <button className="text-teal-600 hover:text-teal-700 font-medium ml-1">Read More</button>
                                  </p>
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    defaultChecked={true}
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Dial Keypad */}
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <div className="p-5">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <div className="mt-1">
                                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <RiSettings4Line className="w-5 h-5 text-indigo-600" />
                                  </div>
                                </div>
                                <div>
                                  <h3 className="text-gray-900 font-medium">Dial Keypad</h3>
                                  <p className="text-gray-500 text-sm mt-1">
                                    This sets whether the assistant can dial digits on the keypad.
                                    <button className="text-teal-600 hover:text-teal-700 font-medium ml-1">Read More</button>
                                  </p>
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    defaultChecked={true}
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Forwarding Phone Number */}
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <div className="p-5">
                            <div className="space-y-4">
                              <div className="flex items-start space-x-3">
                                <div className="mt-1">
                                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <RiPhoneLine className="w-5 h-5 text-yellow-600" />
                                  </div>
                                </div>
                                <div>
                                  <h3 className="text-gray-900 font-medium">Forwarding Phone Number</h3>
                                  <div className="flex items-center mt-1">
                                    <div className="flex-1">
                                      <input
                                        type="tel"
                                        defaultValue="4257623355"
                                        className="w-full bg-white text-gray-900 rounded-lg px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent hover:border-gray-300 transition-colors"
                                      />
                                    </div>
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      className="ml-2 cursor-help"
                                    >
                                      <RiQuestionLine className="w-5 h-5 text-gray-400" />
                                    </motion.div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* End Call Phrases */}
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <div className="p-5">
                            <div className="space-y-4">
                              <div className="flex items-start space-x-3">
                                <div className="mt-1">
                                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <RiPhoneLine className="w-5 h-5 text-purple-600" />
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-gray-900 font-medium">End Call Phrases</h3>
                                  <textarea
                                    className="mt-2 w-full h-24 bg-white text-gray-900 rounded-lg p-4 border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none hover:border-gray-300 transition-colors"
                                    placeholder="Phrases that if spoken by the bot will end the call. Eg: goodbye"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Custom Functions Section */}
                    <div>
                      <h2 className="text-xl font-semibold mb-2 text-gray-900">Custom Functions</h2>
                      <p className="text-gray-500 mb-6">
                        Define your custom functions here to enhance your assistant's capabilities. You can use your own code or tools like Pipedream or Make for the setup.
                      </p>

                      {/* Info Note */}
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <RiQuestionLine className="w-5 h-5 text-amber-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-amber-700">
                            Note: Functions are the same as tools, except they follow older syntax as per the OpenAI Spec. Check our{' '}
                            <button className="text-amber-600 hover:text-amber-700 font-medium underline">
                              functions guide
                            </button>{' '}
                            for more details
                          </p>
                        </div>
                      </div>

                      {/* Create Function Button */}
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full bg-gray-100 text-gray-600 rounded-lg p-4 border border-gray-200 border-dashed hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 font-medium"
                      >
                        <RiAddLine className="w-5 h-5" />
                        <span>Create a new function</span>
                      </motion.button>
                    </div>
                  </div>
                )}

                {selectedTab === 'Advanced' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-900">Advanced Configuration</h2>
                    <p className="text-gray-500 mb-6">
                      Configure advanced settings to fine-tune your assistant's behavior and performance.
                    </p>

                    <div className="space-y-8">
                      {/* Privacy Section */}
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">Privacy</h3>
                              <p className="text-gray-500 text-sm mt-1">Configure the privacy settings for the assistant.</p>
                            </div>
                            <RiSettings4Line className="w-6 h-6 text-gray-400" />
                          </div>

                          <div className="space-y-4">
                            {/* HIPAA Compliance */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="flex-shrink-0">
                                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <RiQuestionLine className="w-5 h-5 text-purple-600" />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-gray-700 font-medium">HIPAA Compliance</label>
                                  <p className="text-gray-500 text-sm">When enabled, no logs, recordings, or transcriptions will be stored.</p>
                                </div>
                              </div>
                              <div className="relative">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                              </div>
                            </div>

                            {/* Audio Recording */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="flex-shrink-0">
                                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <RiTimeLine className="w-5 h-5 text-blue-600" />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-gray-700 font-medium">Audio Recording</label>
                                  <p className="text-gray-500 text-sm">Record the conversation with the assistant.</p>
                                </div>
                              </div>
                              <div className="relative">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                              </div>
                            </div>

                            {/* Video Recording */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="flex-shrink-0">
                                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                                    <RiVideoLine className="w-5 h-5 text-amber-600" />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-gray-700 font-medium">Video Recording</label>
                                  <p className="text-gray-500 text-sm">Enable or disable video recording during a web call.</p>
                                </div>
                              </div>
                              <div className="relative">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Start Speaking Plan */}
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">Start Speaking Plan</h3>
                              <p className="text-gray-500 text-sm mt-1">Configure when the assistant should start talking.</p>
                            </div>
                            <RiTimeLine className="w-6 h-6 text-gray-400" />
                          </div>

                          <div className="space-y-6">
                            {/* Wait Seconds */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <label className="text-gray-700 font-medium">Wait Seconds</label>
                                <span className="text-sm text-gray-500">0.4 sec</span>
                              </div>
                              <div className="relative">
                                <input
                                  type="range"
                                  min="0"
                                  max="2"
                                  step="0.1"
                                  defaultValue="0.4"
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                  <span>0 sec</span>
                                  <span>2 sec</span>
                                </div>
                              </div>
                            </div>

                            {/* Smart Endpointing */}
                            <div className="flex items-center justify-between">
                              <div>
                                <label className="text-gray-700 font-medium">Smart Endpointing</label>
                                <p className="text-gray-500 text-sm">Enable for more accurate speech endpoint detection.</p>
                              </div>
                              <div className="relative">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                              </div>
                            </div>

                            {/* Punctuation Seconds */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <label className="text-gray-700 font-medium">On Punctuation Seconds</label>
                                <span className="text-sm text-gray-500">0.1 sec</span>
                              </div>
                              <div className="relative">
                                <input
                                  type="range"
                                  min="0"
                                  max="3"
                                  step="0.1"
                                  defaultValue="0.1"
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                  <span>0 sec</span>
                                  <span>3 sec</span>
                                </div>
                              </div>
                            </div>

                            {/* No Punctuation Seconds */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <label className="text-gray-700 font-medium">On No Punctuation Seconds</label>
                                <span className="text-sm text-gray-500">1.5 sec</span>
                              </div>
                              <div className="relative">
                                <input
                                  type="range"
                                  min="0"
                                  max="3"
                                  step="0.1"
                                  defaultValue="1.5"
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                  <span>0 sec</span>
                                  <span>3 sec</span>
                                </div>
                              </div>
                            </div>

                            {/* Number Seconds */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <label className="text-gray-700 font-medium">On Number Seconds</label>
                                <span className="text-sm text-gray-500">0.5 sec</span>
                              </div>
                              <div className="relative">
                                <input
                                  type="range"
                                  min="0"
                                  max="3"
                                  step="0.1"
                                  defaultValue="0.5"
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                  <span>0 sec</span>
                                  <span>3 sec</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stop Speaking Plan */}
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">Stop Speaking Plan</h3>
                              <p className="text-gray-500 text-sm mt-1">Configure when the assistant should stop talking.</p>
                            </div>
                            <RiTimeLine className="w-6 h-6 text-gray-400" />
                          </div>

                          <div className="space-y-6">
                            {/* Number of Words */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex-1">
                                  <label className="text-gray-700 font-medium flex items-center">
                                    Number of Words
                                    <div className="ml-2 group relative">
                                      <RiQuestionLine className="w-4 h-4 text-gray-400" />
                                      <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
                                        Words required before stopping
                                    </div>
                                  </div>
                                  </label>
                                  <p className="text-gray-500 text-sm mt-1">Customer words before assistant stops</p>
                                  </div>
                                <div className="flex items-center space-x-2">
                                  <input 
                                    type="number"
                                    min="0"
                                    max="10"
                                    value="0"
                                    className="w-16 px-2 py-1 text-right border border-gray-200 rounded-md"
                                  />
                                  <span className="text-gray-500 text-sm">words</span>
                                </div>
                              </div>
                              <div className="relative mt-2">
                                <div className="absolute -top-2 left-0 w-full">
                              <div className="relative">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full flex justify-between px-1">
                                      {[0, 2, 4, 6, 8, 10].map((value) => (
                                        <div key={value} className="h-3 w-px bg-gray-300"></div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <input
                                  type="range"
                                  min="0"
                                  max="10"
                                  step="1"
                                  defaultValue="0"
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                  {[0, 2, 4, 6, 8, 10].map((value) => (
                                    <span key={value}>{value}</span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Voice Seconds */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex-1">
                                  <label className="text-gray-700 font-medium flex items-center">
                                    Voice Seconds
                                    <div className="ml-2 group relative">
                                      <RiQuestionLine className="w-4 h-4 text-gray-400" />
                                      <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
                                        Speaking duration before stopping
                                      </div>
                                    </div>
                                  </label>
                                  <p className="text-gray-500 text-sm mt-1">Duration before assistant stops</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input 
                                    type="number"
                                    min="0"
                                    max="0.5"
                                    step="0.1"
                                    value="0.2"
                                    className="w-16 px-2 py-1 text-right border border-gray-200 rounded-md"
                                  />
                                  <span className="text-gray-500 text-sm">sec</span>
                                </div>
                              </div>
                              <div className="relative mt-2">
                                <div className="absolute -top-2 left-0 w-full">
                                  <div className="relative">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full flex justify-between px-1">
                                      {[0, 0.1, 0.2, 0.3, 0.4, 0.5].map((value) => (
                                        <div key={value} className="h-3 w-px bg-gray-300"></div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <input
                                  type="range"
                                  min="0"
                                  max="0.5"
                                  step="0.1"
                                  defaultValue="0.2"
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                  {[0, 0.1, 0.2, 0.3, 0.4, 0.5].map((value) => (
                                    <span key={value}>{value}</span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Back Off Seconds */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex-1">
                                  <label className="text-gray-700 font-medium flex items-center">
                                    Back Off Seconds
                                    <div className="ml-2 group relative">
                                      <RiQuestionLine className="w-4 h-4 text-gray-400" />
                                      <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
                                        Wait time after interruption
                                      </div>
                                    </div>
                                  </label>
                                  <p className="text-gray-500 text-sm mt-1">Delay before resuming after interruption</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input 
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    value="1"
                                    className="w-16 px-2 py-1 text-right border border-gray-200 rounded-md"
                                  />
                                  <span className="text-gray-500 text-sm">sec</span>
                                </div>
                              </div>
                              <div className="relative mt-2">
                                <div className="absolute -top-2 left-0 w-full">
                                  <div className="relative">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full flex justify-between px-1">
                                      {[0, 2, 4, 6, 8, 10].map((value) => (
                                        <div key={value} className="h-3 w-px bg-gray-300"></div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <input
                                  type="range"
                                  min="0"
                                  max="10"
                                  step="0.1"
                                  defaultValue="1"
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                  {[0, 2, 4, 6, 8, 10].map((value) => (
                                    <span key={value}>{value}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Call Timeout Settings */}
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">Call Timeout Settings</h3>
                              <p className="text-gray-500 text-sm mt-1">Configure call duration and timeout parameters.</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                                <RiPhoneLine className="w-5 h-5 text-rose-600" />
                                    </div>
                                  </div>
                          </div>

                          <div className="space-y-6">
                            {/* Silence Timeout */}
                                  <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex-1">
                                  <label className="text-gray-700 font-medium flex items-center">
                                    Silence Timeout
                                    <div className="ml-2 group relative">
                                      <RiQuestionLine className="w-4 h-4 text-gray-400" />
                                      <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
                                        Auto-end call after inactivity
                                  </div>
                                </div>
                                  </label>
                                  <p className="text-gray-500 text-sm mt-1">End call after silence duration</p>
                              </div>
                                <div className="flex items-center space-x-2">
                                  <input 
                                    type="number"
                                    min="10"
                                    max="3600"
                                    step="10"
                                    value="30"
                                    className="w-16 px-2 py-1 text-right border border-gray-200 rounded-md"
                                  />
                                  <span className="text-gray-500 text-sm">sec</span>
                                </div>
                              </div>
                              <div className="relative mt-2">
                                <div className="absolute -top-2 left-0 w-full">
                              <div className="relative">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full flex justify-between px-1">
                                      {[10, 900, 1800, 2700, 3600].map((value) => (
                                        <div key={value} className="h-3 w-px bg-gray-300"></div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <input
                                  type="range"
                                  min="10"
                                  max="3600"
                                  step="10"
                                  defaultValue="30"
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                  {[10, 900, 1800, 2700, 3600].map((value) => (
                                    <span key={value}>{value}s</span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Maximum Duration */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex-1">
                                  <label className="text-gray-700 font-medium flex items-center">
                                    Maximum Duration
                                    <div className="ml-2 group relative">
                                      <RiQuestionLine className="w-4 h-4 text-gray-400" />
                                      <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
                                        Maximum call duration limit
                                      </div>
                                    </div>
                                  </label>
                                  <p className="text-gray-500 text-sm mt-1">Maximum allowed call duration</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input 
                                    type="number"
                                    min="10"
                                    max="43200"
                                    step="10"
                                    value="1800"
                                    className="w-16 px-2 py-1 text-right border border-gray-200 rounded-md"
                                  />
                                  <span className="text-gray-500 text-sm">sec</span>
                                </div>
                              </div>
                              <div className="relative mt-2">
                                <div className="absolute -top-2 left-0 w-full">
                                  <div className="relative">
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full flex justify-between px-1">
                                      {[10, 10800, 21600, 32400, 43200].map((value) => (
                                        <div key={value} className="h-3 w-px bg-gray-300"></div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <input
                                  type="range"
                                  min="10"
                                  max="43200"
                                  step="10"
                                  defaultValue="1800"
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                  {[10, 10800, 21600, 32400, 43200].map((value) => (
                                    <span key={value}>{Math.floor(value/3600)}h</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'Analysis' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-900">Conversation Analysis</h2>
                    <p className="text-gray-500 mb-6">
                      Configure how your assistant analyzes and processes conversations in real-time.
                    </p>

                    <div className="space-y-8">
                      {/* Summary Section */}
                      <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
                        <div className="p-6">
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold text-white">Summary</h3>
                            <p className="text-gray-400 text-sm mt-1">
                              This is the prompt that's used to summarize the call. The output is stored in call_analysis_summary. You can also find the summary in the Call Logs Page.
                            </p>
                          </div>

                          <div className="space-y-4">
                            {/* Prompt */}
                            <div>
                              <label className="block text-gray-300 font-medium mb-2">Prompt</label>
                              <textarea
                                className="w-full h-32 bg-[#2a2a2a] text-gray-300 rounded-lg p-4 border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                                defaultValue="You are an expert note-taker. You will be given a transcript of a call. Summarize the call in 2-3 sentences, if applicable."
                              />
                            </div>

                            {/* Summary Request Timeout */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <label className="text-gray-300 font-medium">Summary request timeout in seconds.</label>
                                <span className="text-sm text-gray-400">30</span>
                              </div>
                              <div className="relative">
                                <div className="w-full bg-[#2a2a2a] h-1.5 rounded-full">
                                  <div className="absolute h-1.5 bg-teal-500 rounded-full" style={{ width: '60%' }}></div>
                                </div>
                                <input
                                  type="range"
                                  min="1"
                                  max="20"
                                  defaultValue="30"
                                  className="absolute w-full h-1.5 opacity-0 cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                  <span>1 (sec)</span>
                                  <span>20 (sec)</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Success Evaluation Section */}
                      <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
                        <div className="p-6">
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold text-white">Success Evaluation</h3>
                            <p className="text-gray-400 text-sm mt-1">
                              Evaluate if your call was successful. You can use Rubric standalone or in combination with Success Evaluation Prompt. If both are provided, they are concatenated into appropriate instructions.
                            </p>
                          </div>

                          <div className="space-y-6">
                            {/* Prompt */}
                            <div>
                              <label className="block text-gray-300 font-medium mb-2">Prompt</label>
                              <p className="text-gray-400 text-sm mb-2">This is the prompt that's used to evaluate if the call was successful.</p>
                              <textarea
                                className="w-full h-32 bg-[#2a2a2a] text-gray-300 rounded-lg p-4 border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                                defaultValue="You are an expert call evaluator. You will be given a transcript of a call and the system prompt of the AI participant. Determine if the call was successful based on the objectives inferred from the system prompt."
                              />
                            </div>

                            {/* Success Evaluation Rubric */}
                            <div>
                              <label className="block text-gray-300 font-medium mb-2">Success Evaluation Rubric</label>
                              <p className="text-gray-400 text-sm mb-2">This enforces the rubric of the evaluation upon the Success Evaluation.</p>
                              <div className="relative">
                                <select className="w-full bg-[#2a2a2a] text-gray-300 rounded-lg px-4 py-2.5 border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none appearance-none">
                                  <option>Select Evaluation Rubric</option>
                                </select>
                                <RiArrowDownSLine className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                              </div>
                            </div>

                            {/* Success Evaluation Request Timeout */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <label className="text-gray-300 font-medium">Success evaluation request timeout in seconds.</label>
                                <span className="text-sm text-gray-400">30</span>
                              </div>
                              <div className="relative">
                                <div className="w-full bg-[#2a2a2a] h-1.5 rounded-full">
                                  <div className="absolute h-1.5 bg-teal-500 rounded-full" style={{ width: '60%' }}></div>
                                </div>
                                <input
                                  type="range"
                                  min="1"
                                  max="20"
                                  defaultValue="30"
                                  className="absolute w-full h-1.5 opacity-0 cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                  <span>1 (sec)</span>
                                  <span>20 (sec)</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AssistantPage; 