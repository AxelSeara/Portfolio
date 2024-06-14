import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CVContent = ({ onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const startDownload = () => {
    setIsDownloading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const increment = prevProgress < 70 ? 25 : 10; // Adjusted increments for faster download
        const newProgress = prevProgress + increment;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloading(false);
            onClose();
            // Trigger the download
            const link = document.createElement('a');
            link.href = '/AxelSeara_HB.pdf'; // Ensure the path is correct
            link.download = 'AxelSeara_HB.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, 500);
          return 100; // Ensure progress does not exceed 100
        }
        return newProgress;
      });
    }, 150); // Adjusted interval for faster download
  };

  return (
    <div className="text-center">
      <p className="mb-4">Download my CV by clicking the button below.</p>
      <button
        onClick={startDownload}
        className="bg-tertiary hover:bg-accent text-accent hover:text-tertiary font-bold py-2 px-4 border-2 border-accent rounded transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 mb-4"
      >
        Download CV
      </button>
      {isDownloading && (
        <div className="w-full h-6 rounded flex items-center justify-center">
          <div className="flex space-x-1">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className={`w-6 h-6 border-2 border-accent ${progress > index * 10 ? 'bg-accent' : 'bg-tertiary'}`}
              ></div>
            ))}
          </div>
          <div className="ml-2 text-accent font-bold">{progress}%</div>
        </div>
      )}
    </div>
  );
};

CVContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CVContent;