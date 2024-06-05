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
      <div className="relative mt-16 h-full w-full">
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-4 lg:gap-8 mx-4">
          {folders.map((folder, index) => {
            const FolderComponent = ['CV', 'DailyBloom', 'Weather'].includes(folder.name) ? FolderNoDoubleClick : Folder;
            return (
              <FolderComponent
                key={folder.name}
                initialOpen={false}
                className="relative"
                style={{ marginTop: `${index >= 3 ? '20px' : '0'}` }}
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