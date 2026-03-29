import React from 'react';
import dog3d from './FolderImages/ilustration/dog_3d.jpeg';
import rabbit3d from './FolderImages/ilustration/rabbit_3d.jpeg';
import robot3d from './FolderImages/ilustration/robot_3d.png';
import wizard from './FolderImages/ilustration/wizard_3d.png';
import skull from './FolderImages/ilustration/skull.jpeg';
import dog from './FolderImages/ilustration/dog.jpeg';
import eyes from './FolderImages/ilustration/eyes.jpeg';
import { getCopy } from './copy';

const assets = [dog3d, rabbit3d, robot3d, wizard, skull, dog, eyes];

const IlusContent = () => {
  const t = getCopy();

  return (
    <div className="retro-app-shell mx-auto max-w-6xl">
      <div className="retro-app-header">
        <h1 className="retro-app-title">{t.content.illustration.title}</h1>
        <span className="font-mono text-[11px] uppercase tracking-wide text-accent/80">
          {t.content.illustration.badge}
        </span>
      </div>

      <div className="retro-app-body space-y-3">
        <div className="retro-app-panel font-mono text-sm leading-relaxed text-accent">
          {t.content.illustration.intro}
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {t.content.illustration.items.map((item, index) => (
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

export default IlusContent;
