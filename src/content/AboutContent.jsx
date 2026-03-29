import React from 'react';
import { motion } from 'framer-motion';
import Avatar from './Avatar/avatar.png';
import { getCopy } from './copy';

const AboutContent = () => {
  const t = getCopy();

  return (
    <div className="retro-app-shell mx-auto max-w-3xl">
      <div className="retro-app-header">
        <h1 className="retro-app-title">{t.content.about.title}</h1>
        <span className="font-mono text-[11px] uppercase tracking-wide text-accent/80">
          {t.content.about.badge}
        </span>
      </div>

      <div className="retro-app-body p-4 md:p-6">
        <div className="retro-app-panel flex flex-col items-center text-center">
          <motion.img
            src={Avatar}
            alt={t.content.about.avatarAlt}
            className="mb-4 h-36 w-36 border-2 border-accent object-contain p-1 md:h-44 md:w-44"
            initial={{ scale: 0.8, rotate: -8, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <h2 className="font-mono text-2xl font-bold text-accent md:text-3xl">
            {t.content.about.name}
          </h2>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-accent/80">
            {t.content.about.role}
          </p>
          <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-accent">
            {t.content.about.paragraph1}
          </p>
          <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-accent">
            {t.content.about.paragraph2}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
