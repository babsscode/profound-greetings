// Modal.tsx
import React, { useState } from 'react';

interface ModalProps {
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(message);  // Copy the message to clipboard
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);  // Reset success state after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-sm w-5/6 md:w-full">
        <h2 className="text-xl font-semibold text-center mb-4">Share this Link:</h2>
        
        <div className='mx-4'> 
        <a className="text-center text-lg break-words block" href={message} target="_blank">
          {message}
        </a>
        </div>

        {/* Copy Link Button */}
      <div className="flex flex-col items-center mt-2 mb-4 space-y-2">
        <button
          onClick={handleCopyClick}
          className="px-4 text-sm py-2 bg-[#335F55] text-white rounded-lg hover:bg-[#335F55] focus:outline-none focus:ring-2 focus:ring-[#335F55]"
        >
          {copySuccess ? 'Copied!' : 'Copy Link'}
        </button>

        {/* Success message */}
        {copySuccess && (
          <span className="text-green-500 text-sm">Link copied to clipboard!</span>
        )}
      </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white text-[#335F55] rounded-lg hover:bg-[#335F55] hover:text-white border border-[#335F55] focus:outline-none focus:ring-2 focus:ring-[#335F55]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;