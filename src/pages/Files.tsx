import React, { useState, useCallback } from 'react';
import { 
  RiUpload2Line,
  RiFileTextLine,
  RiQuestionLine,
  RiCloseLine,
  RiAddLine,
  RiDownloadLine
} from 'react-icons/ri';
import { useDropzone } from 'react-dropzone';

const Files = () => {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file upload logic here
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex flex-col items-center text-center mb-8">
            {/* File Icon */}
            <div className="w-16 h-16 mb-6 bg-teal-500/10 rounded-xl flex items-center justify-center">
              <RiFileTextLine className="w-8 h-8 text-teal-600" />
            </div>
            
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">Knowledge Base</h1>
            <p className="text-gray-600 text-base mb-4 max-w-2xl">
              Knowledge base is a bank of files that are accessible by your assistants.
            </p>
            <p className="text-gray-600 text-base max-w-2xl">
              You can upload a PDF, etc and attach it to your assistants, they pull from these for more context during conversations.
            </p>
          </div>

          {/* Upload Area */}
          <div 
            {...getRootProps()} 
            className={`
              border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer
              ${isDragActive 
                ? 'border-teal-500 bg-teal-50' 
                : 'border-gray-200 hover:border-teal-500 hover:bg-gray-50'
              }
            `}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 mb-4 bg-teal-500/10 rounded-lg flex items-center justify-center">
                <RiUpload2Line className="w-6 h-6 text-teal-600" />
              </div>
              <p className="text-gray-600 mb-2">
                Drag and drop a file here or click to select file locally.
              </p>
              <p className="text-sm text-gray-500">
                Supported formats: PDF, TXT, DOC, DOCX
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
            <button className="px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center font-medium shadow-sm">
              <RiAddLine className="mr-2" />
              Choose File
            </button>
            <button className="px-6 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center font-medium border border-gray-200">
              <RiDownloadLine className="mr-2" />
              Documentation
            </button>
          </div>
        </div>

        {/* Recent Files Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Files</h2>
            <div className="text-sm text-gray-500">0 files</div>
          </div>

          {/* Empty State */}
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
            <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
              <RiFileTextLine className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-2">No files uploaded yet</p>
            <p className="text-sm text-gray-400">
              Your uploaded files will appear here
            </p>
          </div>

          {/* Info Message */}
          <div className="mt-6 flex items-center gap-2 text-sm">
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg flex items-center">
              <RiQuestionLine className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
              <span>Files uploaded here will be accessible by your assistants for additional context during conversations.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Files; 