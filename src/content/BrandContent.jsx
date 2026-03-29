import React from 'react';
import brand2 from './FolderImages/brand/brand 2.jpeg';
import brand3 from './FolderImages/brand/brand 3.jpeg';
import brand4 from './FolderImages/brand/brand 4.jpeg';
import brand5 from './FolderImages/brand/brand 5.jpeg';
import logo1 from './FolderImages/brand/logo1.jpeg';
import { getCopy } from './copy';

const assets = [brand2, brand3, brand4, brand5, logo1];

const BrandContent = () => {
  const t = getCopy();

  return (
    <div className="retro-app-shell mx-auto max-w-5xl">
      <div className="retro-app-header">
        <h1 className="retro-app-title">{t.content.brand.title}</h1>
        <span className="font-mono text-[11px] uppercase tracking-wide text-accent/80">
          {t.content.brand.badge}
        </span>
      </div>

      <div className="retro-app-body space-y-3">
        <div className="retro-app-panel font-mono text-sm leading-relaxed text-accent">
          {t.content.brand.intro}
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {t.content.brand.items.map((item, index) => (
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

export default BrandContent;
