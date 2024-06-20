import React from 'react';
import cardsFlames from './FolderImages/animation/cardflramdes.gif';
import dreamy from './FolderImages/animation/dreamy.webp';
import keytrip from './FolderImages/animation/keytrip.webp';
import landscape3d from './FolderImages/animation/landscape3d.webp'; 

const ProjectsContent = () => (
  <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 12rem)', maxWidth: '70vh' }}>
    <h1 className="text-4xl font-bold text-accent mb-4 font-mono">Animation Portfolio</h1>
    <h2 className="text-2xl font-semibold text-accent mb-2 font-lora">Highlighting Collaborative Projects and Creativity</h2>
    <p className="text-accent mb-4 font-lora pr-2">Here are some pieces from projects where I had the opportunity to collaborate, showcasing various animation works and design prototypes.</p>
    
    <img src={cardsFlames} alt="Cards Flames Animation" className="w-full pr-2 mt-4 mb-4" />
    <h4 className="text-lg font-bold text-accent mb-2 font-mono">Flaming Cards</h4>
    <p className="text-accent mb-4 font-lora pr-2">Animation for Pull&Bear's social media, featuring flaming cards intended to be displayed on the Pull&Bear website. Tools used: <i>Illustrator and After Effects</i>.</p>
    
    <img src={dreamy} alt="Dreamy Animation" className="w-full pr-2 mt-4 mb-4" />
    <h4 className="text-lg font-bold text-accent mb-2 font-mono">Dreamy Moon</h4>
    <p className="text-accent mb-4 font-lora pr-2">A social media post for the Dreamy Collection, entirely designed with <i>After Effects</i>.</p>
    
    <img src={keytrip} alt="Keytrip Animation" className="w-full pr-2 mt-4 mb-4" />
    <h4 className="text-lg font-bold text-accent mb-2 font-mono">Keytrip</h4>
    <p className="text-accent mb-4 font-lora pr-2">Content for Pull&Bear's social media, combining 3D design and traditional frame-by-frame animation for the backgrounds. Tools used: <i>Blender and After Effects</i>.</p>
    
    <img src={landscape3d} alt="3D Landscape Animation" className="w-full pr-2 mt-4 mb-4" />
    <h4 className="text-lg font-bold text-accent mb-2 font-mono">3D Landscape</h4>
    <p className="text-accent mb-4 font-lora pr-2">Simulating a 3D rendered retro world, this content was created for Pull&Bear's social media. Designed with <i>Blender and After Effects</i>.</p>
  </div>
);

export default ProjectsContent;