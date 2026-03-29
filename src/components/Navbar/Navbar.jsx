import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import DropdownAdjust from '../DropdownAdjust/DropdownAdjust';
import { getCopy } from '../../content/copy';

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

const submenuVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: createStepFunction(5), // 5 pasos
    },
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.2,
      ease: createStepFunction(5),
    },
  },
};
const t = getCopy();

////////////////////////////////////////////////////////////////////////
// 3) Componente Navbar
////////////////////////////////////////////////////////////////////////
const Navbar = ({
  name,
  links,
  onClickLink,
  activeLink,
  folders,
  onOpenModal,
  onRefreshFolders,
  switchBackground,
  onToggleCrt,
  retroCrtEnabled,
  isMobile,
  mobileSwitcherOpen,
  onToggleMobileSwitcher,
  onLoad,
}) => {
  const [currentTime, setCurrentTime] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const dropdownRef = useRef(null);

  const openFolderByName = (folderName) => {
    const folder = folders.find((item) => item.name === folderName);
    if (folder) {
      onOpenModal(folder.id);
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
        setActiveSubmenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMouseEnter = (menu) => {
    setActiveSubmenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveSubmenu(null);
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
      onOpenModal(folder.id);
    }
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      {/* Nav container */}
      <nav
        className="
        flex justify-between items-center
        p-1 px-2 bg-tertiary text-accent font-mono
        m-4 border-2 border-accent shadow-no-blur
        rounded-md
      "
      >
        {/* Left side: nombre + links */}
        <div className="relative flex items-center space-x-4">
          <button
            id="dropdownDefaultButton"
            onClick={toggleDropdown}
            className="font-bold text-accent hover:bg-accent hover:text-white px-2 py-1 focus:outline-none"
          >
            {name}
          </button>

          {/* Animación retro en links */}
          {links &&
            links.map((link) => (
              <motion.button
                key={link}
                type="button"
                className={`px-2 py-1 ${link === activeLink ? 'bg-accent text-white' : ''}`}
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

        {/* Right side: Ajustes, Contact, Reloj */}
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="border-2 border-accent px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-accent hover:bg-accent hover:text-white"
            onClick={() => openFolderByName(t.app.folders.about)}
            aria-label={t.navbar.aria.openAbout}
          >
            {t.navbar.quickActions.about}
          </button>

          <button
            type="button"
            className="border-2 border-accent px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-accent hover:bg-accent hover:text-white"
            onClick={() => openFolderByName(t.app.folders.dailyBloom)}
            aria-label={t.navbar.aria.openCase}
          >
            {t.navbar.quickActions.case}
          </button>

          <button
            type="button"
            className="border-2 border-accent px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-accent hover:bg-accent hover:text-white"
            onClick={openCVModal}
            aria-label={t.navbar.aria.openCv}
          >
            {t.navbar.quickActions.cv}
          </button>

          {isMobile && (
            <button
              type="button"
              className={`border-2 border-accent px-2 py-1 font-mono text-[10px] uppercase tracking-wide ${
                mobileSwitcherOpen
                  ? 'bg-accent text-white'
                  : 'text-accent hover:bg-accent hover:text-white'
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
                className="group w-6 h-6 flex items-center justify-center hover:bg-accent hover:text-white"
                id="adjust"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 49 42.09"
                  className="w-5 h-5 stroke-current text-accent group-hover:text-white fill-accent"
                >
                  <g data-name="Capa 1">
                    <path
                      d="M30 10.29H4.92M44.46 31.03H18"
                      fill="none"
                      stroke="#243b40"
                      strokeMiterlimit="10"
                      strokeWidth="6"
                    />
                    <circle
                      cx="37.94"
                      cy="11.06"
                      r="8.06"
                      fill="none"
                      stroke="#243b40"
                      strokeMiterlimit="10"
                      strokeWidth="6"
                    />
                    <circle
                      cx="10.96"
                      cy="31.13"
                      r="7.96"
                      fill="none"
                      stroke="#243b40"
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
          />

          <button
            type="button"
            className="group w-6 h-6 flex items-center justify-center hover:bg-accent hover:text-white"
            onClick={openContactModal}
            aria-label={t.navbar.aria.openContact}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 45.43 34"
              className="w-5 h-5 stroke-current stroke-4 text-accent group-hover:text-white fill-none"
            >
              <g data-name="Capa 1">
                <path
                  d="M3 3h39.43v28H3zM17.95 17.53 3.53 27.61M41.49 27.57l-13.54-9.71"
                  strokeWidth="4"
                />
                <path d="m3.86 3.57 15.79 15.5a4.75 4.75 0 0 0 6.71 0l15.5-14.93" strokeWidth="4" />
              </g>
            </svg>
          </button>
          <span className="border-2 border-accent px-2 py-1 font-mono text-[10px]">
            {currentTime}
          </span>
        </div>
      </nav>

      {/* Dropdown principal */}
      {dropdownOpen && (
        <div
          id="dropdown"
          className="
            absolute left-6 mt-2 z-10
            bg-tertiary text-accent divide-y
            w-44
            border-2 border-gray-700
            shadow-md
          "
          ref={dropdownRef}
        >
          <ul className="py-2 text-sm" aria-labelledby="dropdownDefaultButton">
            {[
              t.navbar.dropdown.menu.about,
              t.navbar.dropdown.menu.version,
              t.navbar.dropdown.menu.files,
            ].map((menu) => (
              <li
                key={menu}
                onMouseEnter={() => handleMouseEnter(menu)}
                onMouseLeave={handleMouseLeave}
                className="relative"
              >
                <button
                  type="button"
                  className="block w-full text-left px-4 py-2 hover:bg-accent hover:text-white"
                  onClick={(e) => e.preventDefault()}
                >
                  {menu}
                </button>

                {/* Submenú con AnimatePresence y estilo retro + sombra */}
                <AnimatePresence>
                  {activeSubmenu === menu && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={submenuVariants}
                      className="
                        absolute top-0 left-full mt-0
                        bg-tertiary text-accent
                        w-44 py-2
                        border-2 border-gray-700
                        shadow-md
                      "
                    >
                      <ul>
                        {menu === t.navbar.dropdown.menu.files
                          ? folders.map((folder) => (
                              <li key={folder.id}>
                                <button
                                  type="button"
                                  data-name={folder.name}
                                  className="block w-full text-left px-4 py-2 hover:bg-accent hover:text-white"
                                  onClick={handleFolderClick}
                                >
                                  {folder.name}
                                </button>
                              </li>
                            ))
                          : submenuItems[menu]?.map((submenuItem) => (
                              <li key={submenuItem}>
                                <button
                                  type="button"
                                  className="block w-full text-left px-4 py-2 hover:bg-accent hover:text-white"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  {submenuItem}
                                </button>
                              </li>
                            ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Navbar.propTypes = {
  name: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.string),
  onClickLink: PropTypes.func,
  activeLink: PropTypes.string,
  folders: PropTypes.array,
  onOpenModal: PropTypes.func,
  onRefreshFolders: PropTypes.func,
  switchBackground: PropTypes.func,
  onToggleCrt: PropTypes.func,
  retroCrtEnabled: PropTypes.bool,
  isMobile: PropTypes.bool,
  mobileSwitcherOpen: PropTypes.bool,
  onToggleMobileSwitcher: PropTypes.func,
  onLoad: PropTypes.func,
};

export default Navbar;
