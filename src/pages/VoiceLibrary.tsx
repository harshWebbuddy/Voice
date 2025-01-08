import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiVoiceprintLine,
  RiAddLine,
  RiSearchLine,
  RiFilter3Line,
  RiPlayCircleLine,
  RiPauseCircleLine,
  RiDeleteBinLine,
  RiEditLine,
  RiUploadCloud2Line,
  RiRefreshLine,
  RiStarLine,
  RiStarFill,
  RiVolumeMuteLine,
  RiVolumeUpLine,
  RiPulseLine,
  RiTimeLine,
  RiCheckLine,
  RiCloseLine,
  RiInformationLine,
  RiArrowDownSLine,
  RiSettings4Line,
  RiDownload2Line
} from 'react-icons/ri';

interface Voice {
  id: string;
  name: string;
  description: string;
  language: string;
  gender: 'Male' | 'Female';
  duration: string;
  status: 'Ready' | 'Processing' | 'Failed';
  favorite: boolean;
  lastUsed: string;
  previewUrl: string;
  isPlaying?: boolean;
  tags: string[];
  model: string;
}

const VoiceLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [sortBy, setSortBy] = useState('lastUsed');

  const mockVoices: Voice[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      description: 'Professional female voice with a warm and friendly tone',
      language: 'English (US)',
      gender: 'Female',
      duration: '2m 30s',
      status: 'Ready',
      favorite: true,
      lastUsed: '2 hours ago',
      previewUrl: '/audio/preview1.mp3',
      tags: ['Professional', 'Warm', 'Friendly'],
      model: 'Sonic English'
    },
    {
      id: '2',
      name: 'David Chen',
      description: 'Clear and articulate male voice for business presentations',
      language: 'English (UK)',
      gender: 'Male',
      duration: '1m 45s',
      status: 'Ready',
      favorite: false,
      lastUsed: '1 day ago',
      previewUrl: '/audio/preview2.mp3',
      tags: ['Business', 'Formal', 'Clear'],
      model: 'Sonic English'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      description: 'Energetic and youthful voice for casual content',
      language: 'English (AU)',
      gender: 'Female',
      duration: '3m 15s',
      status: 'Processing',
      favorite: false,
      lastUsed: 'Never',
      previewUrl: '/audio/preview3.mp3',
      tags: ['Casual', 'Young', 'Energetic'],
      model: 'Sonic English'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready':
        return 'bg-green-100 text-green-700';
      case 'Processing':
        return 'bg-amber-100 text-amber-700';
      case 'Failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Ready':
        return <RiCheckLine className="w-4 h-4" />;
      case 'Processing':
        return <RiPulseLine className="w-4 h-4" />;
      case 'Failed':
        return <RiCloseLine className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Voice Library</h1>
            <p className="text-gray-500 mt-1">Manage and organize your voice clones</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <RiUploadCloud2Line className="w-5 h-5" />
              <span>Import Voice</span>
            </button>
            <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors flex items-center space-x-2">
              <RiAddLine className="w-5 h-5" />
              <span>Create Voice</span>
            </button>
            <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              <RiRefreshLine className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="flex-1 relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search voices by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>

            {/* Sort By */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              >
                <option value="lastUsed">Last Used</option>
                <option value="name">Name</option>
                <option value="duration">Duration</option>
                <option value="status">Status</option>
              </select>
              <RiArrowDownSLine className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 border rounded-lg flex items-center space-x-2 ${
                showFilters || selectedFilters.length > 0
                  ? 'bg-violet-50 border-violet-200 text-violet-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              } transition-colors`}
            >
              <RiFilter3Line className="w-5 h-5" />
              <span>Filters</span>
              {selectedFilters.length > 0 && (
                <span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full text-sm">
                  {selectedFilters.length}
                </span>
              )}
            </button>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="grid grid-cols-4 gap-4">
                  {/* Language */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                      <option>All Languages</option>
                      <option>English (US)</option>
                      <option>English (UK)</option>
                      <option>English (AU)</option>
                    </select>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                      <option>All Genders</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                      <option>All Statuses</option>
                      <option>Ready</option>
                      <option>Processing</option>
                      <option>Failed</option>
                    </select>
                  </div>

                  {/* Model */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                    <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                      <option>All Models</option>
                      <option>Sonic English</option>
                      <option>Sonic Pro</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Voice Grid */}
        <div className="grid grid-cols-3 gap-6">
          {mockVoices.map((voice) => (
            <motion.div
              key={voice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-xl border border-gray-200 p-6 ${
                selectedVoice === voice.id ? 'ring-2 ring-violet-500' : ''
              }`}
              onClick={() => setSelectedVoice(voice.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-900">{voice.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(voice.status)}`}>
                      {getStatusIcon(voice.status)}
                      <span className="ml-1">{voice.status}</span>
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{voice.description}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Toggle favorite
                  }}
                  className="text-gray-400 hover:text-violet-600 transition-colors"
                >
                  {voice.favorite ? (
                    <RiStarFill className="w-5 h-5 text-amber-400" />
                  ) : (
                    <RiStarLine className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Voice Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Language</span>
                  <span className="text-gray-900">{voice.language}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Gender</span>
                  <span className="text-gray-900">{voice.gender}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Duration</span>
                  <span className="text-gray-900">{voice.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Model</span>
                  <span className="text-gray-900">{voice.model}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {voice.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-50 text-violet-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Toggle play/pause
                    }}
                    className="p-2 text-gray-400 hover:text-violet-600 transition-colors"
                  >
                    {voice.isPlaying ? (
                      <RiPauseCircleLine className="w-6 h-6" />
                    ) : (
                      <RiPlayCircleLine className="w-6 h-6" />
                    )}
                  </button>
                  <div className="w-24 h-1 bg-gray-200 rounded-full">
                    <div className="w-1/3 h-full bg-violet-500 rounded-full"></div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Toggle mute
                    }}
                    className="p-2 text-gray-400 hover:text-violet-600 transition-colors"
                  >
                    <RiVolumeUpLine className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle edit
                    }}
                    className="p-2 text-gray-400 hover:text-violet-600 transition-colors"
                    title="Edit"
                  >
                    <RiEditLine className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle download
                    }}
                    className="p-2 text-gray-400 hover:text-violet-600 transition-colors"
                    title="Download"
                  >
                    <RiDownload2Line className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle delete
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <RiDeleteBinLine className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-400">
                Last used {voice.lastUsed}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoiceLibrary;