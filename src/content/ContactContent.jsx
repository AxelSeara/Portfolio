import React, { useState } from 'react';
import { getCopy } from './copy';
import { trackEvent } from '../lib/metrics';

const CONTACT_EMAIL = 'axelsearagomez@gmail.com';

const ContactContent = () => {
  const t = getCopy();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      trackEvent('contact_copy_email');
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      setCopied(false);
      trackEvent('contact_copy_email_failed');
    }
  };

  return (
    <div className="retro-app-shell mx-auto max-w-3xl">
      <div className="retro-app-header">
        <h1 className="retro-app-title">{t.content.contact.title}</h1>
        <span className="font-mono text-[11px] uppercase tracking-wide text-accent/80">
          {t.content.contact.badge}
        </span>
      </div>

      <div className="retro-app-toolbar">
        <div className="flex flex-wrap gap-2">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="retro-btn inline-flex items-center justify-center no-underline"
            onClick={() => trackEvent('contact_mailto_click')}
          >
            {t.content.contact.actions.newMessage}
          </a>
          <button type="button" className="retro-btn" onClick={copyEmail}>
            {t.content.contact.actions.copyEmail}
          </button>
        </div>
      </div>

      <div className="retro-app-body grid gap-3 md:grid-cols-[220px_1fr]">
        <aside className="retro-app-panel">
          <div className="font-mono text-[11px] font-bold uppercase tracking-wide text-accent">
            {t.content.contact.foldersTitle}
          </div>
          <ul className="mt-3 space-y-1 font-mono text-xs text-accent">
            <li className="border border-accent bg-secondary/50 px-2 py-1">
              {t.content.contact.folders.inbox}
            </li>
            <li className="border border-accent/60 px-2 py-1">{t.content.contact.folders.sent}</li>
            <li className="border border-accent/60 px-2 py-1">
              {t.content.contact.folders.drafts}
            </li>
            <li className="border border-accent/60 px-2 py-1">
              {t.content.contact.folders.archive}
            </li>
          </ul>
        </aside>

        <section className="retro-app-panel space-y-3">
          <div className="border-2 border-accent bg-white/60 p-3">
            <div className="font-mono text-[11px] uppercase tracking-wide text-accent/80">
              {t.content.contact.contactLabel}
            </div>
            <p className="mt-1 font-mono text-lg font-bold text-accent">{CONTACT_EMAIL}</p>
            <p className="mt-2 font-mono text-xs text-accent/90">{t.content.contact.contactNote}</p>
          </div>

          <div className="border-2 border-accent bg-white/60 p-3 font-mono text-xs text-accent">
            {t.content.contact.status.label}:{' '}
            {copied ? t.content.contact.status.copied : t.content.contact.status.ready}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactContent;
