import React, {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import Navbar from './components/Navbar/Navbar';
import MainLayout from './components/MainLayout/MainLayout';
import Folder from './components/Folder/Folder';
import Notification from './components/Notification/Notification';
import { getCopy } from './content/copy';

const IlusContent = lazy(() => import('./content/IlusContent'));
const ProjectsContent = lazy(() => import('./content/AnimationContent'));
const DesignContent = lazy(() => import('./content/BrandContent'));
const CVContent = lazy(() => import('./content/CVContent'));
const DailyBloomContent = lazy(() => import('./content/DailyBloomContent'));
const WeatherContent = lazy(() => import('./content/WeatherContent'));
const ContactContent = lazy(() => import('./content/ContactContent'));
const MondrianContent = lazy(() => import('./content/MondrianContent'));
const AboutContent = lazy(() => import('./content/AboutContent'));
const PaintContent = lazy(() => import('./content/PaintContent'));

const BASE_Z_INDEX = 1000;
const MOBILE_BREAKPOINT = 900;
const t = getCopy();

const FOLDER_DEFINITIONS = [
  { id: 1, name: t.app.folders.about, component: AboutContent },
  { id: 2, name: t.app.folders.dailyBloom, component: DailyBloomContent },
  { id: 3, name: t.app.folders.brand, component: DesignContent },
  { id: 4, name: t.app.folders.animation, component: ProjectsContent },
  { id: 5, name: t.app.folders.illustration, component: IlusContent },
  { id: 6, name: t.app.folders.cv, component: CVContent },
  { id: 7, name: t.app.folders.contact, component: ContactContent },
  { id: 8, name: t.app.folders.paint, component: PaintContent },
  { id: 9, name: t.app.folders.mondrian, component: MondrianContent },
  { id: 10, name: t.app.folders.weather, component: WeatherContent },
];

const preloadImages = (imageArray) => {
  imageArray.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
};

const windowReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_WINDOWS': {
      const next = { ...state };
      action.names.forEach((name) => {
        if (!next[name]) {
          next[name] = {
            isOpen: false,
            isMinimized: false,
            isMaximized: false,
            zIndex: BASE_Z_INDEX,
          };
        }
      });
      return next;
    }
    case 'OPEN_WINDOW': {
      const current = state[action.name] || {};
      return {
        ...state,
        [action.name]: {
          ...current,
          isOpen: true,
          isMinimized: false,
          zIndex: action.zIndex,
        },
      };
    }
    case 'ACTIVATE_MOBILE_WINDOW': {
      const next = { ...state };
      Object.keys(next).forEach((name) => {
        if (!next[name]) return;
        if (name === action.name) {
          next[name] = {
            ...next[name],
            isOpen: true,
            isMinimized: false,
            isMaximized: true,
            zIndex: action.zIndex,
          };
        } else if (next[name].isOpen) {
          next[name] = {
            ...next[name],
            isMinimized: true,
            isMaximized: false,
          };
        }
      });
      return next;
    }
    case 'FOCUS_WINDOW': {
      const current = state[action.name];
      if (!current || !current.isOpen) return state;
      return {
        ...state,
        [action.name]: {
          ...current,
          isMinimized: false,
          zIndex: action.zIndex,
        },
      };
    }
    case 'MINIMIZE_WINDOW': {
      const current = state[action.name];
      if (!current || !current.isOpen) return state;
      return {
        ...state,
        [action.name]: {
          ...current,
          isMinimized: true,
        },
      };
    }
    case 'TOGGLE_MAXIMIZE_WINDOW': {
      const current = state[action.name];
      if (!current || !current.isOpen) return state;
      return {
        ...state,
        [action.name]: {
          ...current,
          isMaximized: !current.isMaximized,
          isMinimized: false,
          zIndex: action.zIndex,
        },
      };
    }
    case 'CLOSE_WINDOW': {
      const current = state[action.name] || {};
      return {
        ...state,
        [action.name]: {
          ...current,
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
        },
      };
    }
    case 'CLOSE_ALL_WINDOWS': {
      const next = { ...state };
      Object.keys(next).forEach((name) => {
        next[name] = {
          ...next[name],
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
        };
      });
      return next;
    }
    default:
      return state;
  }
};

const App = () => {
  const [windows, dispatchWindows] = useReducer(windowReducer, {});
  const [activeLink, setActiveLink] = useState('');
  const [showNotification, setShowNotification] = useState(true);
  const [resetCounter, setResetCounter] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState('/bg3.jpg');
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    targetType: 'desktop',
    targetName: '',
  });
  const [propertiesWindow, setPropertiesWindow] = useState({
    visible: false,
    targetName: '',
  });
  const [retroCrtEnabled, setRetroCrtEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSwitcherOpen, setMobileSwitcherOpen] = useState(false);

  const containerRef = useRef(null);
  const gridContainerRef = useRef(null);
  const [isNavbarLoaded, setIsNavbarLoaded] = useState(false);
  const zCounterRef = useRef(BASE_Z_INDEX);

  const folders = FOLDER_DEFINITIONS;
  const folderById = useMemo(() => new Map(folders.map((f) => [f.id, f])), [folders]);
  const folderByName = useMemo(() => new Map(folders.map((f) => [f.name, f])), [folders]);

  useEffect(() => {
    preloadImages(['/bg2.jpg', '/bg3.jpg']);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-retro-intensity',
      retroCrtEnabled ? 'medium' : 'off'
    );
  }, [retroCrtEnabled]);

  useEffect(() => {
    const onResize = () => {
      const isPhone = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(isPhone);
      if (!isPhone) {
        setMobileSwitcherOpen(false);
      }
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    dispatchWindows({
      type: 'INIT_WINDOWS',
      names: folders.map((folder) => folder.name),
    });
  }, [folders]);

  const getNextZIndex = useCallback(() => {
    zCounterRef.current += 1;
    return zCounterRef.current;
  }, []);

  const sortedOpenWindows = useMemo(
    () =>
      Object.entries(windows)
        .filter(([, value]) => value?.isOpen)
        .sort((a, b) => (b[1].zIndex || 0) - (a[1].zIndex || 0))
        .map(([name]) => name),
    [windows]
  );

  useEffect(() => {
    if (!isMobile) return;
    if (activeLink && windows[activeLink]?.isOpen && !windows[activeLink]?.isMinimized) return;

    const next = sortedOpenWindows[0];
    if (next) {
      dispatchWindows({
        type: 'ACTIVATE_MOBILE_WINDOW',
        name: next,
        zIndex: getNextZIndex(),
      });
      setActiveLink(next);
    }
  }, [activeLink, getNextZIndex, isMobile, sortedOpenWindows, windows]);

  const resetFolderPositions = useCallback(() => {
    setResetCounter((prev) => prev + 1);
  }, []);

  const closeModal = useCallback((name) => {
    dispatchWindows({ type: 'CLOSE_WINDOW', name });
    setActiveLink((prevActive) => (prevActive === name ? '' : prevActive));
    setPropertiesWindow((prev) =>
      prev.targetName === name ? { visible: false, targetName: '' } : prev
    );
  }, []);

  const openWindowByName = useCallback(
    (name) => {
      if (!name) return;
      if (isMobile) {
        dispatchWindows({
          type: 'ACTIVATE_MOBILE_WINDOW',
          name,
          zIndex: getNextZIndex(),
        });
        setMobileSwitcherOpen(false);
      } else {
        dispatchWindows({
          type: 'OPEN_WINDOW',
          name,
          zIndex: getNextZIndex(),
        });
      }
      setActiveLink(name);
    },
    [getNextZIndex, isMobile]
  );

  const handleOpenModal = useCallback(
    (id) => {
      const folder = folderById.get(id);
      if (!folder) return;
      openWindowByName(folder.name);
    },
    [folderById, openWindowByName]
  );

  const handleOpenModalByName = useCallback(
    (name) => {
      const folder = folderByName.get(name);
      if (!folder) return;
      openWindowByName(folder.name);
    },
    [folderByName, openWindowByName]
  );

  const handleClickModal = useCallback(
    (name) => {
      if (isMobile) {
        openWindowByName(name);
        return;
      }
      dispatchWindows({
        type: 'FOCUS_WINDOW',
        name,
        zIndex: getNextZIndex(),
      });
      setActiveLink(name);
    },
    [getNextZIndex, isMobile, openWindowByName]
  );

  const handleMinimizeModal = useCallback((name) => {
    dispatchWindows({ type: 'MINIMIZE_WINDOW', name });
    setActiveLink((prevActive) => (prevActive === name ? '' : prevActive));
  }, []);

  const handleToggleMaximizeModal = useCallback(
    (name) => {
      dispatchWindows({
        type: 'TOGGLE_MAXIMIZE_WINDOW',
        name,
        zIndex: getNextZIndex(),
      });
      setActiveLink(name);
    },
    [getNextZIndex]
  );

  const handleCloseAllWindows = useCallback(() => {
    dispatchWindows({ type: 'CLOSE_ALL_WINDOWS' });
    setActiveLink('');
    setMobileSwitcherOpen(false);
    setPropertiesWindow({ visible: false, targetName: '' });
  }, []);

  const switchBackground = useCallback((bgName) => {
    const timestamp = Date.now();
    const nextBg = bgName === 'Classic' ? `/bg2.jpg?${timestamp}` : `/bg3.jpg?${timestamp}`;
    setBackgroundImage(nextBg);
  }, []);

  const toggleRetroCrt = useCallback(() => {
    setRetroCrtEnabled((prev) => !prev);
  }, []);

  const handleFolderContextMenu = useCallback((name, event) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      targetType: 'folder',
      targetName: name,
    });
  }, []);

  const handleDesktopContextMenu = useCallback((event) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      targetType: 'desktop',
      targetName: '',
    });
  }, []);

  const handleCloseContextMenu = useCallback(() => {
    setContextMenu((prev) => ({ ...prev, visible: false }));
  }, []);

  const handleContextMenuAction = useCallback(
    (action) => {
      const { targetType, targetName } = contextMenu;

      if (targetType === 'folder' && targetName) {
        if (action === 'open') handleOpenModalByName(targetName);
        if (action === 'minimize') handleMinimizeModal(targetName);
        if (action === 'maximize') {
          handleOpenModalByName(targetName);
          handleToggleMaximizeModal(targetName);
        }
        if (action === 'close') closeModal(targetName);
        if (action === 'properties') setPropertiesWindow({ visible: true, targetName });
      }

      if (targetType === 'desktop') {
        if (action === 'refresh') resetFolderPositions();
        if (action === 'switch-bg') {
          const isClassic = backgroundImage.includes('/bg2.jpg');
          switchBackground(isClassic ? 'Nighty' : 'Classic');
        }
        if (action === 'toggle-crt') toggleRetroCrt();
        if (action === 'close-all') handleCloseAllWindows();
      }

      handleCloseContextMenu();
    },
    [
      backgroundImage,
      closeModal,
      contextMenu,
      toggleRetroCrt,
      handleCloseAllWindows,
      handleCloseContextMenu,
      handleMinimizeModal,
      handleOpenModalByName,
      handleToggleMaximizeModal,
      resetFolderPositions,
      switchBackground,
    ]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && contextMenu.visible) {
        handleCloseContextMenu();
        return;
      }

      if (event.key === 'Escape' && propertiesWindow.visible) {
        setPropertiesWindow({ visible: false, targetName: '' });
        return;
      }

      if (event.key === 'Escape' && activeLink) {
        closeModal(activeLink);
      }

      if (event.ctrlKey && event.key.toLowerCase() === 'm' && activeLink) {
        event.preventDefault();
        handleMinimizeModal(activeLink);
      }

      if (event.altKey && event.key === 'Tab' && sortedOpenWindows.length > 0) {
        event.preventDefault();
        const currentIndex = sortedOpenWindows.indexOf(activeLink);
        const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % sortedOpenWindows.length : 0;
        const nextWindow = sortedOpenWindows[nextIndex];

        if (isMobile) {
          openWindowByName(nextWindow);
        } else {
          dispatchWindows({
            type: 'FOCUS_WINDOW',
            name: nextWindow,
            zIndex: getNextZIndex(),
          });
        }
        setActiveLink(nextWindow);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    activeLink,
    closeModal,
    contextMenu.visible,
    getNextZIndex,
    handleCloseContextMenu,
    handleMinimizeModal,
    isMobile,
    openWindowByName,
    propertiesWindow.visible,
    sortedOpenWindows,
  ]);

  useEffect(() => {
    const closeMenu = () => handleCloseContextMenu();
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, [handleCloseContextMenu]);

  const openWindows = useMemo(
    () => folders.filter((folder) => windows[folder.name]?.isOpen).map((folder) => folder.name),
    [folders, windows]
  );

  const activeWindowProps = propertiesWindow.targetName
    ? windows[propertiesWindow.targetName] || null
    : null;

  return (
    <MainLayout key={backgroundImage} backgroundImage={backgroundImage}>
      {showNotification && (
        <Notification
          message={t.app.notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}

      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar
          name={t.app.ownerName}
          links={openWindows}
          onClickLink={handleClickModal}
          activeLink={activeLink}
          folders={folders}
          onOpenModal={handleOpenModal}
          onRefreshFolders={resetFolderPositions}
          switchBackground={switchBackground}
          onToggleCrt={toggleRetroCrt}
          retroCrtEnabled={retroCrtEnabled}
          isMobile={isMobile}
          mobileSwitcherOpen={mobileSwitcherOpen}
          onToggleMobileSwitcher={() => setMobileSwitcherOpen((prev) => !prev)}
          onLoad={() => setIsNavbarLoaded(true)}
        />
      </div>

      {isNavbarLoaded && (
        <div
          className="desktop-shell relative mt-16 h-screen overflow-y-auto"
          ref={containerRef}
          onContextMenu={handleDesktopContextMenu}
        >
          <div
            className="grid grid-cols-4 gap-x-1 gap-y-2 mx-2 justify-items-center content-start sm:mx-4 sm:gap-x-2 sm:gap-y-3 md:grid-cols-5 lg:grid-cols-3 lg:gap-2"
            ref={gridContainerRef}
          >
            {folders.map((folder) => {
              const FolderComponent = folder.component;
              const isOpen = Boolean(windows[folder.name]?.isOpen);
              const shouldRenderContent = isOpen;

              return (
                <Folder
                  key={`${folder.id}-${resetCounter}`}
                  id={folder.id}
                  initialOpen={false}
                  className="relative"
                  name={folder.name}
                  content={
                    shouldRenderContent ? (
                      <Suspense
                        fallback={
                          <div className="retro-loading font-mono text-sm text-accent">
                            {t.app.loading}
                          </div>
                        }
                      >
                        <FolderComponent onClose={() => closeModal(folder.name)} />
                      </Suspense>
                    ) : null
                  }
                  onClick={handleClickModal}
                  onOpen={handleOpenModal}
                  onClose={closeModal}
                  onMinimize={handleMinimizeModal}
                  onToggleMaximize={handleToggleMaximizeModal}
                  onContextMenu={handleFolderContextMenu}
                  isOpen={isOpen}
                  isMinimized={Boolean(windows[folder.name]?.isMinimized)}
                  isMaximized={
                    Boolean(windows[folder.name]?.isMaximized) ||
                    (isMobile && activeLink === folder.name)
                  }
                  isActive={
                    activeLink === folder.name &&
                    isOpen &&
                    !Boolean(windows[folder.name]?.isMinimized)
                  }
                  isMobile={isMobile}
                  zIndex={windows[folder.name]?.zIndex || BASE_Z_INDEX}
                  disableDoubleClick={false}
                  openOnSingleClick={isMobile}
                  dragConstraints={gridContainerRef}
                />
              );
            })}
          </div>
        </div>
      )}

      {isMobile && mobileSwitcherOpen && (
        <div className="phone-switcher fixed bottom-4 left-1/2 z-[80] w-[92vw] max-w-xl -translate-x-1/2 border-2 border-accent bg-tertiary/95 p-2 shadow-no-blur">
          <div className="mb-2 font-mono text-xs uppercase tracking-wide text-accent">
            {t.app.mobileSwitcherTitle}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {sortedOpenWindows.map((name) => (
              <button
                key={name}
                type="button"
                className={`retro-switcher-btn ${activeLink === name ? 'active' : ''}`}
                onClick={() => handleOpenModalByName(name)}
              >
                {name}
              </button>
            ))}
            {sortedOpenWindows.length === 0 && (
              <span className="col-span-full font-mono text-xs text-accent/70">
                {t.app.noRunningApps}
              </span>
            )}
          </div>
        </div>
      )}

      {contextMenu.visible && (
        <div
          className="fixed z-[60] border-2 border-accent bg-tertiary text-accent shadow-no-blur min-w-48"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(event) => event.stopPropagation()}
        >
          {contextMenu.targetType === 'folder' ? (
            <ul className="py-1 font-mono text-sm">
              <li>
                <button
                  type="button"
                  className="w-full px-3 py-1 text-left hover:bg-accent hover:text-white"
                  onClick={() => handleContextMenuAction('open')}
                >
                  {t.app.contextMenu.folder.open}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="w-full px-3 py-1 text-left hover:bg-accent hover:text-white"
                  onClick={() => handleContextMenuAction('minimize')}
                >
                  {t.app.contextMenu.folder.minimize}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="w-full px-3 py-1 text-left hover:bg-accent hover:text-white"
                  onClick={() => handleContextMenuAction('maximize')}
                >
                  {t.app.contextMenu.folder.maximizeRestore}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="w-full px-3 py-1 text-left hover:bg-accent hover:text-white"
                  onClick={() => handleContextMenuAction('close')}
                >
                  {t.app.contextMenu.folder.close}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="w-full px-3 py-1 text-left hover:bg-accent hover:text-white"
                  onClick={() => handleContextMenuAction('properties')}
                >
                  {t.app.contextMenu.folder.properties}
                </button>
              </li>
            </ul>
          ) : (
            <ul className="py-1 font-mono text-sm">
              <li>
                <button
                  type="button"
                  className="w-full px-3 py-1 text-left hover:bg-accent hover:text-white"
                  onClick={() => handleContextMenuAction('refresh')}
                >
                  {t.app.contextMenu.desktop.refreshIcons}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="w-full px-3 py-1 text-left hover:bg-accent hover:text-white"
                  onClick={() => handleContextMenuAction('switch-bg')}
                >
                  {t.app.contextMenu.desktop.switchBackground}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="w-full px-3 py-1 text-left hover:bg-accent hover:text-white"
                  onClick={() => handleContextMenuAction('toggle-crt')}
                >
                  {t.app.contextMenu.desktop.toggleCrt}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="w-full px-3 py-1 text-left hover:bg-accent hover:text-white"
                  onClick={() => handleContextMenuAction('close-all')}
                >
                  {t.app.contextMenu.desktop.closeAllWindows}
                </button>
              </li>
            </ul>
          )}
        </div>
      )}

      {propertiesWindow.visible && (
        <div
          className="fixed right-6 top-28 z-[65] w-72 border-4 border-accent bg-tertiary shadow-no-blur"
          data-testid="properties-panel"
        >
          <div className="flex items-center justify-between border-b-4 border-accent bg-gradient-to-r from-tertiary to-secondary/70 px-3 py-1">
            <h3 className="font-mono text-sm font-bold text-accent">
              {t.app.propertiesPanel.title}
            </h3>
            <button
              type="button"
              className="border-2 border-accent px-2 text-xs font-bold hover:bg-accent hover:text-white"
              onClick={() => setPropertiesWindow({ visible: false, targetName: '' })}
              aria-label="Close properties"
            >
              X
            </button>
          </div>
          <div className="p-3 font-mono text-xs text-accent">
            <p>
              <strong>{t.app.propertiesPanel.fields.name}:</strong> {propertiesWindow.targetName}
            </p>
            <p>
              <strong>{t.app.propertiesPanel.fields.open}:</strong>{' '}
              {activeWindowProps?.isOpen
                ? t.app.propertiesPanel.bool.yes
                : t.app.propertiesPanel.bool.no}
            </p>
            <p>
              <strong>{t.app.propertiesPanel.fields.minimized}:</strong>{' '}
              {activeWindowProps?.isMinimized
                ? t.app.propertiesPanel.bool.yes
                : t.app.propertiesPanel.bool.no}
            </p>
            <p>
              <strong>{t.app.propertiesPanel.fields.maximized}:</strong>{' '}
              {activeWindowProps?.isMaximized
                ? t.app.propertiesPanel.bool.yes
                : t.app.propertiesPanel.bool.no}
            </p>
            <p>
              <strong>{t.app.propertiesPanel.fields.zIndex}:</strong>{' '}
              {activeWindowProps?.zIndex ?? BASE_Z_INDEX}
            </p>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default App;
