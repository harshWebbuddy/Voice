import React, { useState } from 'react';
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
  RiSettings4Line
} from 'react-icons/ri';
import ProviderBadge from './ProviderBadge';

interface Provider {
  name: string;
  color: string;
  isActive?: boolean;
}

const providers: Provider[] = [
  { name: 'Vapi Fixed Cost', color: 'emerald', isActive: true },
  { name: 'deepgram', color: 'purple', isActive: true },
  { name: 'vapi', color: 'cyan', isActive: true },
  { name: 'cartesia', color: 'pink', isActive: true },
  { name: 'web', color: 'blue', isActive: true }
];

const AssistantPage = () => {
  const [selectedTab, setSelectedTab] = useState('Model');
  const [showDropdown, setShowDropdown] = useState(false);
  const assistantId = '2e459257-27b8-4p3k';

  const tabs = [
    { id: 'Model', icon: '💭', label: 'Model' },
    { id: 'Transcriber', icon: '📝', label: 'Transcriber' },
    { id: 'Voice', icon: '🎤', label: 'Voice' },
    { id: 'Functions', icon: '⚡', label: 'Functions' },
    { id: 'Advanced', icon: '⚙️', label: 'Advanced' },
    { id: 'Analysis', icon: '📊', label: 'Analysis' }
  ];

  const handleCopyId = () => {
    navigator.clipboard.writeText(assistantId);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex">
      {/* Left Sidebar - List of Assistants */}
      <div className="w-[280px] border-r border-gray-200 flex flex-col bg-gray-50">
        <div className="p-4">
          <button className="w-full bg-teal-500/20 text-teal-600 px-4 py-2.5 rounded-lg flex items-center hover:bg-teal-500/30 transition-colors mb-4 font-medium">
            <RiAddLine className="mr-2" />
            Create Assistant
          </button>
          <div className="text-sm text-gray-500 px-1">Document...</div>
        </div>
        {/* Assistant List */}
        <div className="flex-1">
          <div className="px-4 py-3 bg-white border-y border-gray-200 cursor-pointer">
            <div className="text-gray-900 font-medium">New Assistant</div>
            <div className="text-sm text-gray-500 mt-0.5">Chat support</div>
          </div>
          <div className="px-4 py-3 hover:bg-white transition-colors">
            <div className="text-gray-900">New Assistant</div>
          </div>
          <div className="px-4 py-3 hover:bg-white transition-colors">
            <div className="text-gray-900">New Assistant</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white">
          <h1 className="text-xl font-semibold text-gray-900">New Assistant</h1>
          <div className="flex items-center space-x-3">
            <button className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-teal-600 transition-colors font-medium shadow-sm">
              <RiPhoneLine className="mr-2" />
              Talk with Assistant
            </button>
            <div className="relative">
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <RiMoreLine className="w-5 h-5 text-gray-500" />
              </button>
              
              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
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
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content with Shadow */}
        <div className="flex-1 p-6 bg-gray-50">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Assistant ID Section */}
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-gray-500">Assistant ID</span>
              <div className="bg-gray-50 px-3 py-1.5 rounded-lg flex items-center border border-gray-200">
                <span className="text-sm text-gray-600 mr-2 font-mono">{assistantId}</span>
                <button 
                  onClick={handleCopyId}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <RiFileCopyLine className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Providers with better spacing */}
            <div className="flex items-center space-x-6 mb-6">
              {providers.map((provider) => (
                <ProviderBadge
                  key={provider.name}
                  name={provider.name}
                  color={provider.color}
                  isActive={provider.isActive}
                />
              ))}
            </div>

            {/* Latency Bar with improved design */}
            <div className="mb-8">
              <div className="flex items-center mb-2">
                <RiTimeLine className="text-gray-400 mr-2" />
                <span className="text-gray-500 font-medium">Latency</span>
                <RiQuestionLine className="text-gray-400 ml-2 cursor-help" />
                <span className="ml-auto text-teal-500 font-medium">~450 ms</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[75%] bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 animate-pulse" />
              </div>
            </div>

            {/* Tabs with better styling */}
            <div className="border-b border-gray-200 -mx-6 px-6">
              <div className="flex items-center -mb-px">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`px-5 py-3 flex items-center space-x-2 border-b-2 transition-all font-medium ${
                      selectedTab === tab.id
                        ? 'border-teal-500 text-teal-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content with improved spacing */}
            <div className="pt-8">
              {selectedTab === 'Model' && (
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-900">Model</h2>
                  <p className="text-gray-500 mb-8">
                    This section allows you to configure the model for the assistant.
                  </p>

                  {/* Model Content with better styling */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-4">
                          <span className="mr-2 text-xl">🧱</span>
                          <h3 className="text-lg font-semibold text-gray-900">Blocks</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          We're excited to share that we're currently developing and trailing this new
                          feature. By selecting VAPI as your provider, you can start building your workflow.
                        </p>
                      </div>
                      <div className="w-72">
                        <label className="block text-gray-500 text-sm font-medium mb-2">Provider</label>
                        <div className="bg-white rounded-lg px-4 py-2.5 text-gray-700 flex items-center justify-between cursor-pointer border border-gray-200 hover:border-gray-300 transition-colors">
                          <span className="font-medium">vapi</span>
                          <RiSettings4Line className="text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Beta Notice with improved design */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-8">
                      <div className="font-semibold text-amber-800 mb-2">Note:</div>
                      <p className="text-amber-700 text-sm leading-relaxed">
                        We're in beta! Most features are in place, and we're seeking community feedback
                        to improve. Your input is valuable as we work towards release.
                      </p>
                      <p className="text-amber-700 text-sm mt-3 leading-relaxed">
                        Our goal is to gather feedback from the community to improve the experience.
                      </p>
                    </div>

                    {/* Action Buttons with better styling */}
                    <div className="flex items-center space-x-4">
                      <button className="bg-teal-500/10 text-teal-600 px-5 py-2.5 rounded-lg hover:bg-teal-500/20 transition-colors font-medium">
                        Get Started
                      </button>
                      <button className="text-teal-600 hover:text-teal-700 transition-colors flex items-center font-medium">
                        <RiDiscordFill className="mr-2 text-lg" />
                        Provide Feedback
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'Voice' && (
                <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                  <div className="flex flex-col items-center text-center mb-8">
                    {/* Phone Icon */}
                    <div className="w-12 h-12 mb-4 bg-teal-500/10 rounded-xl flex items-center justify-center">
                      <RiPhoneLine className="w-6 h-6 text-teal-600" />
                    </div>
                    
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Phone Numbers</h2>
                    <p className="text-gray-500 mb-4 max-w-2xl">
                      Assistants are able to be connected to phone numbers for calls.
                    </p>
                    <p className="text-gray-500 max-w-2xl">
                      You can import from Twilio, vonage, or by one directly from Vapi for use with your assistants.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap justify-center gap-4 mb-6">
                    <button className="px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors shadow-sm font-medium flex items-center">
                      <RiAddLine className="mr-2" />
                      Buy Number
                    </button>
                    <button className="px-6 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 font-medium flex items-center">
                      <RiFileCopyLine className="mr-2" />
                      Import
                    </button>
                    <button className="px-6 py-2.5 text-gray-600 hover:text-gray-900 transition-colors font-medium flex items-center">
                      Documentation
                    </button>
                  </div>

                  {/* Warning Message */}
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-lg flex items-center">
                      <RiQuestionLine className="w-5 h-5 text-amber-500 mr-2" />
                      Please add <span className="text-teal-600 mx-1 font-medium">Card Details</span> to Buy a Number
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantPage; 