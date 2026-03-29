import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import bg2Icon from './icons/bg2_icon.png';
import bg3Icon from './icons/bg3_icon.png';
import { getCopy } from '../../content/copy';

const DropdownAdjust = ({
  buttonContent,
  onRefreshFolders,
  switchBackground,
  onToggleCrt,
  retroCrtEnabled,
  retroTheme,
  onChangeTheme,
}) => {
  const t = getCopy();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleBgClick = (bgName) => {
    switchBackground(bgName);
  };

  const themeOptions = [
    {
      id: 'neon-dos',
      label: t.settings.themes.neonDos,
      colors: ['#0f172a', '#00f5d4', '#9b5de5'],
    },
    {
      id: 'sunset-crt',
      label: t.settings.themes.sunsetCrt,
      colors: ['#75bebe', '#ffba6b', '#ff8e78'],
    },
    {
      id: 'acid-terminal',
      label: t.settings.themes.acidTerminal,
      colors: ['#111827', '#a3e635', '#22d3ee'],
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="cursor-pointer"
        aria-label={t.navbar.aria.openSettings}
      >
        {buttonContent}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 z-20 mt-3 w-52 border-2 border-accent bg-tertiary py-2 text-accent shadow-no-blur"
          >
            <ul>
              <li>
                <button
                  type="button"
                  className="retro-hover-invert flex w-full items-center px-3 py-2 text-left"
                  onClick={onRefreshFolders}
                >
                  <span className="mr-2 text-xs">⟳</span>
                  <span className="font-mono text-xs uppercase tracking-wide">
                    {t.settings.refreshFolders}
                  </span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="retro-hover-invert mt-1 flex w-full items-center justify-between px-3 py-2 text-left"
                  onClick={onToggleCrt}
                >
                  <span className="font-mono text-xs uppercase tracking-wide">
                    {t.settings.crt}
                  </span>
                  <span className="border border-accent px-2 py-[1px] font-mono text-[10px] uppercase">
                    {retroCrtEnabled ? t.settings.on : t.settings.off}
                  </span>
                </button>
              </li>

              <li className="mt-2 border-t-2 border-accent px-3 pt-2">
                <h3 className="mb-2 font-mono text-[11px] font-bold uppercase tracking-wide">
                  {t.settings.backgrounds}
                </h3>
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    className="text-center"
                    onClick={() => handleBgClick('Classic')}
                  >
                    <motion.img
                      src={bg3Icon}
                      alt={t.settings.aria.classicBackground}
                      className="h-12 w-12 border-2 border-accent"
                      whileTap={{ scale: 0.96 }}
                    />
                    <p className="mt-1 font-mono text-[10px] uppercase">{t.settings.classic}</p>
                  </button>
                  <button
                    type="button"
                    className="text-center"
                    onClick={() => handleBgClick('Nighty')}
                  >
                    <motion.img
                      src={bg2Icon}
                      alt={t.settings.aria.nightyBackground}
                      className="h-12 w-12 border-2 border-accent"
                      whileTap={{ scale: 0.96 }}
                    />
                    <p className="mt-1 font-mono text-[10px] uppercase">{t.settings.nighty}</p>
                  </button>
                </div>
              </li>

              <li className="mt-2 border-t-2 border-accent px-3 pt-2">
                <h3 className="mb-2 font-mono text-[11px] font-bold uppercase tracking-wide">
                  {t.settings.themeLab}
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {themeOptions.map((themeOption) => {
                    const isActive = retroTheme === themeOption.id;
                    return (
                      <button
                        key={themeOption.id}
                        type="button"
                        onClick={() => onChangeTheme(themeOption.id)}
                        className={`w-full border-2 px-2 py-2 text-left ${
                          isActive
                            ? 'retro-active-invert border-accent'
                            : 'border-accent/70 bg-tertiary text-accent hover:border-accent'
                        }`}
                        aria-pressed={isActive}
                      >
                        <div className="mb-1 font-mono text-[10px] uppercase tracking-wide">
                          {themeOption.label}
                        </div>
                        <div className="flex gap-1">
                          {themeOption.colors.map((color) => (
                            <span
                              key={color}
                              className="h-3 w-3 border border-black/40"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

DropdownAdjust.propTypes = {
  buttonContent: PropTypes.node.isRequired,
  onRefreshFolders: PropTypes.func.isRequired,
  switchBackground: PropTypes.func.isRequired,
  onToggleCrt: PropTypes.func.isRequired,
  retroCrtEnabled: PropTypes.bool.isRequired,
  retroTheme: PropTypes.string.isRequired,
  onChangeTheme: PropTypes.func.isRequired,
};

export default DropdownAdjust;
