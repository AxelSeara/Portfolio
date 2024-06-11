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

const App = () => {
  const [openModals, setOpenModals] = useState([]);
  const [zIndex, setZIndex] = useState(1000); // Starting zIndex for modals
  const [modalZIndices, setModalZIndices] = useState({});
  const [activeLink, setActiveLink] = useState('');

  const folders = [
    { name: 'Ilus', content: <IlusContent /> },
    { name: 'Projects', content: <ProjectsContent /> },
    { name: 'Design', content: <DesignContent /> },
    { name: 'CV', content: <CVContent /> },
    { name: 'DailyBloom', content: <DailyBloomContent /> },
    { name: 'Weather', content: <WeatherContent /> },
    { name: 'Contact', content: <ContactContent /> },
    { name: 'Mondrian Generator', content: <MondrianContent /> },
  ];

  const handleOpenModal = (name) => {
    setOpenModals((prevModals) => [...prevModals, name]);
    setModalZIndices((prevIndices) => ({ ...prevIndices, [name]: zIndex }));
    setZIndex((prevZIndex) => prevZIndex + 1); // Increment zIndex for the next modal
    setActiveLink(name); // Set the active link to the opened modal
  };

  const handleCloseModal = (name) => {
    setOpenModals((prevModals) => prevModals.filter((modal) => modal !== name));
  };

  const handleClickModal = (name) => {
    setModalZIndices((prevIndices) => ({ ...prevIndices, [name]: zIndex }));
    setZIndex((prevZIndex) => prevZIndex + 1); // Increment zIndex for the clicked modal
    setActiveLink(name); // Set the active link to the clicked modal
  };

  return (
    <MainLayout>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar name="AXEL S" links={openModals} onClickLink={handleClickModal} activeLink={activeLink} />
      </div>
      <div className="relative mt-16 h-screen overflow-y-auto">
        <div className="grid grid-cols-3 gap-1 lg:grid-cols-3 lg:gap-2 mx-4">
          {folders.map((folder, index) => (
            <Folder
              key={folder.name}
              initialOpen={false}
              className="relative"
              style={{ marginTop: `${index >= 3 ? '20px' : '0'}` }}
              name={folder.name}
              content={folder.content}
              onOpen={handleOpenModal}
              onClose={handleCloseModal}
              onClick={() => handleClickModal(folder.name)}
              zIndex={modalZIndices[folder.name] || 1000} // Default zIndex if not set
              disableDoubleClick={false}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default App;