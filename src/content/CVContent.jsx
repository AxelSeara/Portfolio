import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getCopy } from './copy';

const CVContent = ({ onClose }) => {
  const t = getCopy();
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const startDownload = () => {
    setIsDownloading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const increment = prevProgress < 70 ? 25 : 10;
        const newProgress = prevProgress + increment;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloading(false);
            onClose();
            const link = document.createElement('a');
            link.href = '/AxelSeara_cv.pdf';
            link.download = 'AxelSeara_cv.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 150);
  };

  return (
    <div className="retro-app-shell mx-auto max-w-xl">
      <div className="retro-app-header">
        <h1 className="retro-app-title">{t.content.cv.title}</h1>
      </div>
      <div className="retro-app-body space-y-3 text-center">
        <div className="retro-app-panel font-mono text-sm text-accent">{t.content.cv.intro}</div>

        <button type="button" onClick={startDownload} className="retro-btn">
          {t.content.cv.button}
        </button>

        {isDownloading && (
          <div className="retro-app-panel mx-auto w-full max-w-md">
            <div className="flex items-center justify-center gap-1">
              {[...Array(10)].map((_, index) => (
                <div
                  key={`progress-${index + 1}`}
                  className={`h-5 w-5 border-2 border-accent ${progress > index * 10 ? 'bg-accent' : 'bg-transparent'}`}
                />
              ))}
              <div className="ml-2 font-mono text-sm font-bold text-accent">{progress}%</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

CVContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CVContent;
