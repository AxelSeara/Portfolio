import React from 'react';
import Card from './DailyBloomImages/card.mp4';
import Dashboard from './DailyBloomImages/dashboard.mp4';
import Scroll from './DailyBloomImages/scroll.mp4';
import Mainmenu from './DailyBloomImages/mainmenu.mp4';
import { getCopy } from './copy';

const videos = [Card, Dashboard, Scroll, Mainmenu];

const DailyBloomContent = () => {
  const t = getCopy();

  return (
    <div className="retro-app-shell mx-auto max-w-5xl">
      <div className="retro-app-header">
        <h1 className="retro-app-title">{t.content.dailyBloom.title}</h1>
        <span className="font-mono text-[11px] uppercase tracking-wide text-accent/80">
          {t.content.dailyBloom.badge}
        </span>
      </div>

      <div className="retro-app-body space-y-3">
        <div className="retro-app-panel font-mono text-sm leading-relaxed text-accent">
          {t.content.dailyBloom.intro}
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {t.content.dailyBloom.items.map((item, index) => (
            <article key={item.title} className="retro-app-panel">
              <h2 className="font-mono text-base font-bold text-accent">{item.title}</h2>
              <p className="mt-2 font-mono text-xs leading-relaxed text-accent/90">
                {item.description}
              </p>
              <video
                className="mt-3 h-56 w-full border-2 border-accent object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={videos[index]} type="video/mp4" />
                {t.content.dailyBloom.videoFallback}
              </video>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyBloomContent;
