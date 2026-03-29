import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import DropdownAdjust from '../DropdownAdjust/DropdownAdjust';
import { getCopy, resolveLocale } from '../../content/copy';

////////////////////////////////////////////////////////////////////////
// 1) Función para animación retro
////////////////////////////////////////////////////////////////////////
function createStepFunction(steps) {
  return (t) => {
    const stepSize = 1 / steps;
    return Math.floor(t / stepSize) * stepSize;
  };
}

////////////////////////////////////////////////////////////////////////
// 2) Variants con steps
////////////////////////////////////////////////////////////////////////
const linkVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: createStepFunction(4), // 4 pasos
    },
  },
  exit: {
    x: 50,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: createStepFunction(4),
    },
  },
};

const menuVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: createStepFunction(5), // 5 pasos
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.16,
      ease: createStepFunction(5),
    },
  },
};
////////////////////////////////////////////////////////////////////////
// 3) Componente Navbar
////////////////////////////////////////////////////////////////////////
const Navbar = ({
  name,
  locale,
  onChangeLocale,
  links,
  onClickLink,
  activeLink,
  folders,
  onOpenModal,
  onRefreshFolders,
  switchBackground,
  onToggleCrt,
  retroCrtEnabled,
  retroTheme,
  onChangeTheme,
  isMobile,
  mobileSwitcherOpen,
  onToggleMobileSwitcher,
  onLoad,
}) => {
  const t = getCopy(locale);
  const [currentTime, setCurrentTime] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(t.navbar.dropdown.menu.files);
  const dropdownRef = useRef(null);

  const openFolderByName = (folderName) => {
    const folder = folders.find((item) => item.name === folderName);
    if (folder) {
      onOpenModal(folder.id, 'navbar_quick_action');
    }
  };

  // Abre la carpeta "Contact" si existe
  const openContactModal = () => openFolderByName(t.app.folders.contact);

  const openCVModal = () => openFolderByName(t.app.folders.cv);

  // Llamar a onLoad en el montaje
  useEffect(() => {
    onLoad && onLoad();
  }, [onLoad]);

  // Reloj en la navbar
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateClock();
    const intervalId = setInterval(updateClock, 60000);
    return () => clearInterval(intervalId);
  }, []);

  // Cerrar dropdown si clicamos fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    setActiveMenu((prev) => prev || t.navbar.dropdown.menu.files);
  };

  const submenuItems = {
    [t.navbar.dropdown.menu.about]: [t.navbar.dropdown.aboutText],
    [t.navbar.dropdown.menu.version]: [t.navbar.dropdown.versionText],
  };

  const handleFolderClick = (e) => {
    e.preventDefault();
    const folderName = e.currentTarget.getAttribute('data-name');
    const folder = folders.find((f) => f.name === folderName);
    if (folder) {
      onOpenModal(folder.id, 'system_menu');
    }
    setDropdownOpen(false);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && dropdownOpen) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dropdownOpen]);

  const menuList = [
    t.navbar.dropdown.menu.files,
    t.navbar.dropdown.menu.about,
    t.navbar.dropdown.menu.version,
  ];

  const sideActions = [t.navbar.quickActions.about, t.navbar.quickActions.case, t.navbar.quickActions.cv];
  const isDesktop = !isMobile;

  return (
    <div className="relative">
      <nav
        className={`flex items-center justify-between gap-2 bg-tertiary text-accent font-mono border border-accent/70 shadow-[2px_2px_0_0_var(--retro-border)] ${
          isMobile ? 'mx-2 mt-2 flex-wrap rounded-lg p-2' : 'm-4 rounded-md p-1 px-2'
        }`}
      >
        <div className={`relative flex min-w-0 flex-1 items-center gap-2 ${isMobile ? 'w-full' : ''}`}>
          <button
            id="dropdownDefaultButton"
            onClick={toggleDropdown}
            className={`retro-hover-invert shrink-0 border border-accent/55 font-bold uppercase tracking-wide text-accent ${
              isMobile ? 'h-10 px-3 text-xs' : 'px-2 py-1 text-[11px]'
            }`}
            aria-expanded={dropdownOpen}
            aria-controls="navbar-system-menu"
          >
            {name}
          </button>

          {isDesktop && (
            <div className="window-strip flex min-w-0 flex-1 items-center gap-1 overflow-x-auto border border-accent/55 bg-quaternary/45 px-1 py-1">
            {links &&
              links.map((link) => (
              <motion.button
                key={link}
                type="button"
                className={`retro-window-chip ${
                  link === activeLink ? 'active' : 'retro-hover-invert'
                }`}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => {
                  onClickLink(link);
                }}
              >
                {link}
              </motion.button>
              ))}
            </div>
          )}

          {isMobile && (
            <div className="min-w-0 flex-1 rounded border border-accent/40 bg-quaternary/35 px-2 py-2 text-[11px] uppercase tracking-wide text-accent/80">
              {activeLink || t.app.mobileSwitcherTitle}
            </div>
          )}
        </div>

        <div
          className={`flex shrink-0 items-center gap-2 ${
            isMobile ? 'w-full justify-end border-t border-accent/40 pt-2' : ''
          }`}
        >
          <button
            type="button"
            className="retro-hover-invert hidden border border-transparent px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-accent md:inline-flex"
            onClick={() => openFolderByName(t.app.folders.about)}
            aria-label={t.navbar.aria.openAbout}
          >
            {t.navbar.quickActions.about}
          </button>

          <button
            type="button"
            className="retro-hover-invert hidden border border-transparent px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-accent md:inline-flex"
            onClick={() => openFolderByName(t.app.folders.dailyBloom)}
            aria-label={t.navbar.aria.openCase}
          >
            {t.navbar.quickActions.case}
          </button>

          <button
            type="button"
            className="retro-hover-invert hidden border border-transparent px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-accent md:inline-flex"
            onClick={openCVModal}
            aria-label={t.navbar.aria.openCv}
          >
            {t.navbar.quickActions.cv}
          </button>

          {isMobile && (
            <button
              type="button"
              className={`border border-accent/55 h-10 px-3 font-mono text-xs uppercase tracking-wide ${
                mobileSwitcherOpen
                  ? 'retro-active-invert border-accent'
                  : 'retro-hover-invert border-accent/70 text-accent'
              }`}
              onClick={onToggleMobileSwitcher}
              aria-label={t.navbar.aria.toggleAppSwitcher}
            >
              {t.navbar.quickActions.apps}
            </button>
          )}

          <DropdownAdjust
            buttonContent={
              <div
                className={`retro-hover-invert group flex items-center justify-center border border-accent/30 ${
                  isMobile ? 'h-10 w-10' : 'h-6 w-6'
                }`}
                id="adjust"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 49 42.09"
                  className={`${isMobile ? 'h-6 w-6' : 'h-5 w-5'} text-current`}
                >
                  <g data-name="Capa 1">
                    <path
                      d="M30 10.29H4.92M44.46 31.03H18"
                      fill="none"
                      stroke="currentColor"
                      strokeMiterlimit="10"
                      strokeWidth="6"
                    />
                    <circle
                      cx="37.94"
                      cy="11.06"
                      r="8.06"
                      fill="none"
                      stroke="currentColor"
                      strokeMiterlimit="10"
                      strokeWidth="6"
                    />
                    <circle
                      cx="10.96"
                      cy="31.13"
                      r="7.96"
                      fill="none"
                      stroke="currentColor"
                      strokeMiterlimit="10"
                      strokeWidth="6"
                    />
                  </g>
                </svg>
              </div>
            }
            onRefreshFolders={onRefreshFolders}
            switchBackground={switchBackground}
            onToggleCrt={onToggleCrt}
            retroCrtEnabled={retroCrtEnabled}
            retroTheme={retroTheme}
            onChangeTheme={onChangeTheme}
          />

          <button
            type="button"
            className={`retro-hover-invert group flex items-center justify-center border border-accent/30 ${
              isMobile ? 'h-10 w-10' : 'h-6 w-6'
            }`}
            onClick={openContactModal}
            aria-label={t.navbar.aria.openContact}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 45.43 34"
              className={`${isMobile ? 'h-6 w-6' : 'h-5 w-5'} text-current`}
            >
              <g data-name="Capa 1">
                <path
                  d="M3 3h39.43v28H3zM17.95 17.53 3.53 27.61M41.49 27.57l-13.54-9.71"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  d="m3.86 3.57 15.79 15.5a4.75 4.75 0 0 0 6.71 0l15.5-14.93"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </g>
            </svg>
          </button>
          <div
            className={`flex items-center gap-1 border border-accent/55 ${
              isMobile ? 'px-1 py-1' : 'px-1 py-1'
            }`}
          >
            {['en', 'de', 'es'].map((code) => {
              const active = resolveLocale(locale) === code;
              return (
                <button
                  key={code}
                  type="button"
                  className={`font-bold uppercase ${
                    isMobile ? 'px-1.5 py-1 text-[10px]' : 'px-1.5 py-0.5 text-[10px]'
                  } ${
                    active ? 'retro-active-invert' : 'retro-hover-invert'
                  }`}
                  onClick={() => onChangeLocale(code)}
                >
                  {code.toUpperCase()}
                </button>
              );
            })}
          </div>

          <span
            className={`ml-1 border border-accent/55 font-mono ${
              isMobile ? 'px-2 py-1 text-[11px]' : 'px-2 py-1 text-[10px]'
            }`}
          >
            {currentTime}
          </span>
        </div>
      </nav>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            id="navbar-system-menu"
            ref={dropdownRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className={`absolute z-20 mt-2 grid border border-accent/55 bg-tertiary text-accent shadow-[2px_2px_0_0_var(--retro-border)] ${
              isMobile
                ? 'left-2 right-2 grid-cols-[112px_1fr]'
                : 'left-6 w-[340px] grid-cols-[124px_1fr]'
            }`}
          >
            <div className="border-r border-accent/70 p-1">
              {menuList.map((menu) => (
                <button
                  key={menu}
                  type="button"
                  className={`mb-1 block w-full px-2 py-2 text-left font-mono text-[10px] uppercase tracking-wide ${
                    activeMenu === menu
                      ? 'retro-active-invert'
                      : 'retro-hover-invert'
                  }`}
                  onClick={() => setActiveMenu(menu)}
                >
                  {menu}
                </button>
              ))}
              <div className="mt-2 border-t-2 border-accent pt-1 md:hidden">
                {sideActions.map((action) => (
                  <button
                    key={action}
                    type="button"
                    className="retro-hover-invert mb-1 block w-full px-2 py-2 text-left font-mono text-[10px] uppercase tracking-wide"
                    onClick={() => {
                      if (action === t.navbar.quickActions.about) openFolderByName(t.app.folders.about);
                      if (action === t.navbar.quickActions.case) {
                        openFolderByName(t.app.folders.dailyBloom);
                      }
                      if (action === t.navbar.quickActions.cv) openCVModal();
                      setDropdownOpen(false);
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-1">
              {activeMenu === t.navbar.dropdown.menu.files && (
                <ul className="max-h-64 overflow-y-auto">
                  {folders.map((folder) => (
                    <li key={folder.id}>
                      <button
                        type="button"
                        data-name={folder.name}
                        className="retro-hover-invert block w-full px-3 py-2 text-left font-mono text-[11px]"
                        onClick={handleFolderClick}
                      >
                        {folder.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {activeMenu !== t.navbar.dropdown.menu.files && (
                <div className="p-2 font-mono text-xs leading-relaxed">
                  {(submenuItems[activeMenu] || []).map((submenuItem) => (
                    <p key={submenuItem}>{submenuItem}</p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Navbar.propTypes = {
  name: PropTypes.string.isRequired,
  locale: PropTypes.string,
  onChangeLocale: PropTypes.func,
  links: PropTypes.arrayOf(PropTypes.string),
  onClickLink: PropTypes.func,
  activeLink: PropTypes.string,
  folders: PropTypes.array,
  onOpenModal: PropTypes.func,
  onRefreshFolders: PropTypes.func,
  switchBackground: PropTypes.func,
  onToggleCrt: PropTypes.func,
  retroCrtEnabled: PropTypes.bool,
  retroTheme: PropTypes.string,
  onChangeTheme: PropTypes.func,
  isMobile: PropTypes.bool,
  mobileSwitcherOpen: PropTypes.bool,
  onToggleMobileSwitcher: PropTypes.func,
  onLoad: PropTypes.func,
};

export default Navbar;
