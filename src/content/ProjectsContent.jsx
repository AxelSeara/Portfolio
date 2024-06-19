import React from 'react';
import cardsFlames from './FolderImages/animation/cardflramdes.gif';
import dreamy from './FolderImages/animation/dreamy.webp';
import keytrip from './FolderImages/animation/keytrip.webp';
import landscape3d from './FolderImages/animation/landscape3d.webp'; 

const ProjectsContent = () => (
  <div className="overflow-auto " style={{ maxHeight: 'calc(100vh - 12rem)', maxWidth: '70vh' }}>
    <h1 className="text-4xl font-bold text-accent mb-4 font-mono">Animation Content</h1>
    <h2 className="text-2xl font-semibold text-accent mb-2 font-mono">Welcome to the Projects section.</h2>
    <p className="text-accent mb-4 font-lora">This section showcases various projects including coding projects, design prototypes, and collaborative works.</p>
    <p className="text-accent mb-4 font-lora">Each project demonstrates unique challenges and innovative solutions.</p>
    
    <img src={cardsFlames} alt="Cards Flames Animation" className="w-full pr-2 mt-4 mb-4" />
    <p className="text-accent mb-4 font-mono">An animation project featuring flaming cards, highlighting dynamic visual effects and motion graphics skills.</p>
    
    <img src={dreamy} alt="Dreamy Animation" className="w-full pr-2 mt-4 mb-4" />
    <p className="text-accent mb-4 font-mono">A dreamy animation project, showcasing the use of smooth transitions and surreal visual elements.</p>
    
    <img src={keytrip} alt="Keytrip Animation" className="w-full pr-2 mt-4 mb-4" />
    <p className="text-accent mb-4 font-mono">Keytrip animation project, demonstrating the journey through key scenes with engaging storytelling.</p>
    
    <img src={landscape3d} alt="3D Landscape Animation" className="w-full pr-2 mt-4 mb-4" />
    <p className="text-accent mb-4 font-mono">A 3D landscape animation, highlighting the use of 3D modeling and rendering to create immersive environments.</p>
  </div>
);

export default ProjectsContent;