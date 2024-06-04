import React from 'react';
import Navbar from './components/Navbar/Navbar';
import MainLayout from './components/MainLayout/MainLayout';
import Folder from './components/Folder/Folder';
import IlusContent from './content/IlusContent';
import ProjectsContent from './content/ProjectsContent';
import DesignContent from './content/DesignContent';

const App = () => {
  const folders = [
    { name: 'Ilus', content: <IlusContent /> },
    { name: 'Projects', content: <ProjectsContent /> },
    { name: 'Design', content: <DesignContent /> },
  ];

  return (
    <MainLayout>
      <Navbar name="AXEL S" links={['About', 'CV', 'o_o']} />
      <div className="relative mt-16 h-full w-full">
        {folders.map((folder, index) => (
          <Folder
            key={folder.name}
            initialOpen={false}
            className="absolute"
            style={{ top: `${80 + index * 80}px`, left: `${80 + index * 120}px` }}
            name={folder.name}
            content={folder.content}
          />
        ))}
      </div>
    </MainLayout>
  );
};

export default App;
