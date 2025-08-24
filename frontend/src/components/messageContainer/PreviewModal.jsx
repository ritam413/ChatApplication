// src/components/PreviewModal.jsx

import React, { useState, useEffect } from 'react';

const PreviewModal = ({ isOpen, files, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  // When the modal is opened or the starting index prop changes,
  // update the internal state to show the correct slide.
  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex]);

  // Add keyboard controls (left/right arrows, escape key)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowRight') {
        if (currentIndex < files.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, files.length, onClose]);

  // Don't render anything if the modal isn't open
  if (!isOpen || files.length === 0 || currentIndex === null) {
    return null;
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < files.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    // 1. Backdrop: Fills the screen and closes the modal on click
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/35"
      onClick={onClose}
    >
      {/* 2. Main Container: A "window" that hides the overflow */}
      <div
        className="relative  w-full max-w-4xl max-h-[90vh] overflow-hidden "
        onClick={(e) => e.stopPropagation()} // Prevents clicks inside from closing the modal
      >
        {/* 3. Sliding Track: A flex container that moves horizontally */}
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {/* 4. Individual Slides */}
          {files.map((file, index) => {
            const isImage = file.file.type.startsWith('image/');
            const isVideo = file.file.type.startsWith('video/');

            return (
              <div key={index} className="w-full flex-shrink-0 h-full bg-black/20 flex items-center justify-center">
                <div className="max-w-full max-h-[85vh]">
                  {isImage && (
                    <img src={file.preview} alt="Preview" className="w-auto h-auto max-w-full max-h-[85vh] object-contain" />
                  )}
                  {isVideo && (
                    <video src={file.preview} controls autoPlay className="max-w-full max-h-[85vh]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- CONTROLS --- */}

      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold z-20"
        aria-label="Close preview"
      >
        &times;
      </button>

      <button
        onClick={(e)=>{
          e.stopPropagation();
          goToPrevious(); }}
        disabled={currentIndex === 0}
        className="absolute left-5 top-1/2 hover:text-red-700 btn btn-circle disabled:opacity-30"
        aria-label="Previous"
      >
        ❮
      </button>

      <button
        onClick={(e)=>{
          e.stopPropagation();
          goToNext(); }}
        disabled={currentIndex === files.length - 1}
        className="absolute right-5 top-1/2 hover:text-red-700 btn btn-circle disabled:opacity-30"
        aria-label="Next"
      >
        ❯
      </button>
    </div>
  );
};

export default PreviewModal;