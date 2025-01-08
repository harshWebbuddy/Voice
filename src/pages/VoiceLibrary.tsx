import React, { useState } from 'react';
import { 
  RiPlayCircleLine,
  RiSearchLine,
  RiAddLine,
  RiRefreshLine,
  RiClipboardLine,
  RiVoiceprintLine
} from 'react-icons/ri';

const voices = [
  {
    id: '1',
    name: 'Theron - Authentic, Friendly, Sharp',
    costPerMin: 0.036,
    latency: 400
  },
  {
    id: '2',
    name: 'Francotest',
    costPerMin: 0.036,
    latency: 400
  },
  {
    id: '3',
    name: 'Test3',
    costPerMin: 0.036,
    latency: 400
  }
];

const VoiceLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 text-white">
        <RiVoiceprintLine className="w-5 h-5" />
        <h1 className="text-xl font-medium">Voice Library</h1>
      </div>

      {/* Featured Voices */}
      <div className="mb-12">
        <h2 className="text-lg font-medium text-white mb-4">Featured Voices</h2>
        <div className="grid grid-cols-4 gap-6">
          {/* Road Dawg */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="relative aspect-[4/3] bg-gradient-to-br from-purple-500/20 to-transparent">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                  <RiPlayCircleLine className="w-6 h-6" />
                </button>
              </div>
              <div className="absolute top-3 left-3 px-2 py-1 bg-gray-900/50 rounded text-xs text-gray-300">
                11LABS
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-medium mb-2">Road Dawg</h3>
              <div className="text-sm text-gray-400">
                Best for:
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className="px-2 py-0.5 bg-gray-700 rounded-full text-gray-300 text-xs">
                    Conversational
                  </span>
                  <span className="px-2 py-0.5 bg-gray-700 rounded-full text-gray-300 text-xs">
                    Healthcare
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Other featured voices with similar structure */}
        </div>
      </div>

      {/* Explore Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-white">Explore all voices</h2>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700 flex items-center gap-1">
              <RiClipboardLine className="w-4 h-4" />
              Clone
            </button>
            <button className="px-3 py-1.5 bg-teal-500/20 text-teal-300 rounded-lg text-sm hover:bg-teal-500/30 flex items-center gap-1">
              <RiAddLine className="w-4 h-4" />
              Add
            </button>
            <button className="px-3 py-1.5 text-gray-400 rounded-lg text-sm hover:text-gray-300 flex items-center gap-1">
              <RiRefreshLine className="w-4 h-4" />
              Sync
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by keyword, id, use..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 focus:outline-none focus:border-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 focus:outline-none focus:border-gray-600">
            <option value="11labs">11labs</option>
            <option value="all">all</option>
          </select>
          <select className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 focus:outline-none focus:border-gray-600">
            <option value="all">Select Accent</option>
          </select>
        </div>

        {/* Voice List */}
        <div className="space-y-3">
          {voices.map(voice => (
            <div key={voice.id} className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
              <button className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                <RiPlayCircleLine className="w-6 h-6" />
              </button>
              <div className="flex-1">
                <h3 className="text-white font-medium">{voice.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>${voice.costPerMin.toFixed(3)} /min</span>
                  <span>~{voice.latency} ms</span>
                </div>
              </div>
              <button className="w-8 h-8 text-gray-400 hover:text-gray-300">
                <RiClipboardLine className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoiceLibrary;