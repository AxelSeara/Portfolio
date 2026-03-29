import React from 'react';
import cardsFlames from './FolderImages/animation/cardflramdes.gif';
import dreamy from './FolderImages/animation/dreamy.webp';
import keytrip from './FolderImages/animation/keytrip.webp';
import landscape3d from './FolderImages/animation/landscape3d.webp';
import { getCopy } from './copy';

const assets = [cardsFlames, dreamy, keytrip, landscape3d];

const AnimationContent = () => {
  const t = getCopy();

  return (
    <div className="retro-app-shell mx-auto max-w-5xl">
      <div className="retro-app-header">
        <h1 className="retro-app-title">{t.content.animation.title}</h1>
        <span className="font-mono text-[11px] uppercase tracking-wide text-accent/80">
          {t.content.animation.badge}
        </span>
      </div>

      <div className="retro-app-body space-y-3">
        <div className="retro-app-panel font-mono text-sm leading-relaxed text-accent">
          {t.content.animation.intro}
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {t.content.animation.items.map((item, index) => (
            <article key={item.title} className="retro-app-panel">
              <img
                src={assets[index]}
                alt={item.alt}
                className="h-52 w-full border-2 border-accent object-cover"
              />
              <h2 className="mt-3 font-mono text-base font-bold text-accent">{item.title}</h2>
              <p className="mt-2 font-mono text-xs leading-relaxed text-accent/90">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimationContent;
