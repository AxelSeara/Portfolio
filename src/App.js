import React from 'react';
import Navbar from './components/Navbar/Navbar';
import MainLayout from './components/MainLayout/MainLayout';
import Folder from './components/Folder/Folder';

const App = () => {
  return (
    <MainLayout>
      <Navbar name="Axel S" links={['About', 'CV']} />
      <div className="relative mt-16 h-full w-full">
        <Folder initialOpen={false} className="absolute" style={{ top: '80px', left: '80px' }} name="Ilus" />
        <Folder initialOpen={false} className="absolute" style={{ top: '160px', left: '200px' }} name="Pictures" />
        <Folder initialOpen={false} className="absolute" style={{ top: '240px', left: '320px' }} name="Music" />
      </div>
    </MainLayout>
  );
};

export default App;
