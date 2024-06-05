import React from 'react';
import Navbar from './components/Navbar/Navbar';
import MainLayout from './components/MainLayout/MainLayout';
import Folder from './components/Folder/Folder';
import FolderNoDoubleClick from './components/FolderNoDoubleClick/FolderNoDoubleClick';
import IlusContent from './content/IlusContent';
import ProjectsContent from './content/ProjectsContent';
import DesignContent from './content/DesignContent';
import CVContent from './content/CVContent';
import DailyBloomContent from './content/DailyBloomContent';
import WeatherContent from './content/WeatherContent';

const App = () => {
  const folders = [
    { name: 'Ilus', content: <IlusContent /> },
    { name: 'Projects', content: <ProjectsContent /> },
    { name: 'Design', content: <DesignContent /> },
    { name: 'CV', content: <CVContent /> },
    { name: 'DailyBloom', content: <DailyBloomContent /> },
    { name: 'Weather', content: <WeatherContent /> },
  ];

  return (
    <MainLayout>
      <Navbar name="AXEL S" links={['About', 'CV', 'o_o']} />
      <div className="relative flex-1 mt-16 h-full w-full">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
          {folders.slice(0, 4).map((folder, index) => {
            const FolderComponent = ['CV', 'DailyBloom', 'Weather'].includes(folder.name) ? FolderNoDoubleClick : Folder;
            return (
              <FolderComponent
                key={folder.name}
                initialOpen={false}
                className="absolute"
                style={{ top: `${100 + Math.floor(index / 2) * 120}px`, left: `${80 + (index % 2) * 140}px` }}
                name={folder.name}
                content={folder.content}
              />
            );
          })}
          {folders.slice(4).map((folder, index) => {
            const FolderComponent = ['CV', 'DailyBloom', 'Weather'].includes(folder.name) ? FolderNoDoubleClick : Folder;
            return (
              <FolderComponent
                key={folder.name}
                initialOpen={false}
                className="absolute"
                style={{ top: `${100 + index * 120}px`, right: '80px' }}
                name={folder.name}
                content={folder.content}
              />
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default App;