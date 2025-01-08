import React, { useState } from 'react';
import { 
  RiAddLine, 
  RiPhoneLine,
  RiQuestionLine,
  RiFileCopyLine,
  RiCloseLine
} from 'react-icons/ri';

const PhoneNumbers = () => {
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<'Twilio' | 'Vonage'>('Twilio');

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      {/* Main Content */}
      <div className="w-[400px] bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex flex-col items-center text-center mb-12">
          {/* Phone Icon */}
          <div className="w-16 h-16 mb-6 bg-teal-500/10 rounded-xl flex items-center justify-center">
            <RiPhoneLine className="w-8 h-8 text-teal-600" />
          </div>
          
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">Phone Numbers</h1>
          <p className="text-gray-600 text-base mb-4">
            Assistants are able to be connected to phone numbers for calls.
          </p>
          <p className="text-gray-600 text-base">
            You can import from Twilio, vonage, or by one directly from Vapi for use with your assistants.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mb-8">
          <button className="w-full py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center font-medium shadow-sm">
            <RiAddLine className="mr-2" />
            Buy Number
          </button>
          <button 
            onClick={() => setShowImportModal(true)}
            className="w-full py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center font-medium border border-gray-200"
          >
            <RiFileCopyLine className="mr-2" />
            Import
          </button>
        </div>

        {/* Warning Message */}
        <div className="flex items-center justify-center gap-2 text-sm">
          <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-lg flex items-center">
            <RiQuestionLine className="w-5 h-5 text-amber-500 mr-2" />
            Please add <button className="text-teal-600 mx-1 hover:text-teal-700 font-medium">Card Details</button> to Buy a Number
          </div>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[400px] p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <RiPhoneLine className="mr-2 text-teal-600" />
                Import Phone Number
              </h2>
              <button 
                onClick={() => setShowImportModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <RiCloseLine className="w-6 h-6" />
              </button>
            </div>

            {/* Provider Selection */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setSelectedProvider('Twilio')}
                className={`flex-1 py-2 rounded-lg transition-colors ${
                  selectedProvider === 'Twilio' 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Twilio
              </button>
              <button
                onClick={() => setSelectedProvider('Vonage')}
                className={`flex-1 py-2 rounded-lg transition-colors ${
                  selectedProvider === 'Vonage' 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Vonage
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Twilio Phone Number</label>
                <div className="flex gap-2">
                  <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg flex items-center hover:bg-gray-200 transition-colors">
                    🇺🇸 <RiCloseLine className="ml-1" />
                  </button>
                  <input 
                    type="text" 
                    placeholder="+14156021922"
                    className="flex-1 bg-gray-100 text-gray-900 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder-gray-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Twilio Account SID</label>
                <input 
                  type="text" 
                  placeholder="Twilio Account SID"
                  className="w-full bg-gray-100 text-gray-900 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Twilio Auth Token</label>
                <input 
                  type="password" 
                  placeholder="Twilio Auth Token"
                  className="w-full bg-gray-100 text-gray-900 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Label</label>
                <input 
                  type="text" 
                  placeholder="Label for Phone Number"
                  className="w-full bg-gray-100 text-gray-900 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowImportModal(false)}
                className="flex-1 py-2.5 text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Cancel
              </button>
              <button className="flex-1 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium shadow-sm">
                Import from Twilio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneNumbers; 