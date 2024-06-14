import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import MainLayout from './components/MainLayout/MainLayout';
import Folder from './components/Folder/Folder';
import IlusContent from './content/IlusContent';
import ProjectsContent from './content/ProjectsContent';
import DesignContent from './content/DesignContent';
import CVContent from './content/CVContent';
import DailyBloomContent from './content/DailyBloomContent';
import WeatherContent from './content/WeatherContent';
import ContactContent from './content/ContactContent';
import MondrianContent from './content/MondrianContent';
import AboutContent from './content/AboutContent';

const App = () => {
  const [openModals, setOpenModals] = useState([]);
  const [zIndex, setZIndex] = useState(1000); // Starting zIndex for modals
  const [modalZIndices, setModalZIndices] = useState({});
  const [activeLink, setActiveLink] = useState('');

  const folders = [
    { id: 1, name: 'Ilus', content: <IlusContent onClose={() => handleCloseModal('Ilus')} /> },
    { id: 2, name: 'Projects', content: <ProjectsContent onClose={() => handleCloseModal('Projects')} /> },
    { id: 3, name: 'Design', content: <DesignContent onClose={() => handleCloseModal('Design')} /> },
    { id: 4, name: 'CV', content: <CVContent onClose={() => handleCloseModal('CV')} /> },
    { id: 5, name: 'DailyBloom', content: <DailyBloomContent onClose={() => handleCloseModal('DailyBloom')} /> },
    { id: 6, name: 'Weather', content: <WeatherContent onClose={() => handleCloseModal('Weather')} /> },
    { id: 7, name: 'Contact', content: <ContactContent onClose={() => handleCloseModal('Contact')} /> },
    { id: 8, name: 'Mondrian Generator', content: <MondrianContent onClose={() => handleCloseModal('Mondrian Generator')} /> },
    { id: 9, name: 'About', content: <AboutContent onClose={() => handleCloseModal('About Content')} /> },

  ];

  const handleOpenModal = (id) => {
    const folder = folders.find(folder => folder.id === id);
    if (folder) {
      console.log("Opening modal for:", folder.name);  // This should log the folder name being opened
      setOpenModals((prevModals) => {
        if (!prevModals.includes(folder.name)) {
          return [...prevModals, folder.name];
        }
        return prevModals;  // Prevent adding the same modal if already open
      });
      setModalZIndices((prevIndices) => ({ ...prevIndices, [folder.name]: zIndex }));
      setZIndex((prevZIndex) => prevZIndex + 1);
      setActiveLink(folder.name);
    }
  };

  const handleCloseModal = (name) => {
    setOpenModals((prevModals) => prevModals.filter((modal) => modal !== name));
  };

  const handleClickModal = (name) => {
    setModalZIndices((prevIndices) => ({ ...prevIndices, [name]: zIndex }));
    setZIndex((prevZIndex) => prevZIndex + 1); // Increment zIndex for the clicked modal
    setActiveLink(name); // Set the active link to the clicked modal
  };

  const handleClick = (folderName) => {
    handleClickModal(folderName);
  };

  return (
    <MainLayout>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar 
          name="AXEL S" 
          links={openModals} 
          onClickLink={handleClickModal} 
          activeLink={activeLink} 
          folders={folders} 
          onOpenModal={handleOpenModal} 
        />
      </div>
      <div className="relative mt-16 h-screen overflow-y-auto">
        <div className="grid grid-cols-3 gap-1 lg:grid-cols-3 lg:gap-2 mx-4">
            {folders.map((folder, index) => (  // Include index here
             <Folder
             key={folder.id}
             id={folder.id}
             initialOpen={false}
             className="relative"
             name={folder.name}
             content={folder.content}
             onClick={handleClick} 
             onOpen={handleOpenModal}
             onClose={handleCloseModal}
             isOpen={openModals.includes(folder.name)}
             zIndex={modalZIndices[folder.name] || 1000}
             disableDoubleClick={false}
           />
            ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default App;