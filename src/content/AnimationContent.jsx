import React from 'react';
import cardsFlames from './FolderImages/animation/cardflramdes.gif';
import dreamy from './FolderImages/animation/dreamy.webp';
import keytrip from './FolderImages/animation/keytrip.webp';
import landscape3d from './FolderImages/animation/landscape3d.webp'; 

const ProjectsContent = () => (
  <div className="overflow-auto p-4 max-w-4xl mx-auto" style={{ maxHeight: 'calc(100vh - 12rem)', maxWidth: '70vh' }}>
    <h1 className="text-4xl font-bold text-accent mb-4 font-mono">Animation Portfolio</h1>
    <h2 className="text-2xl font-semibold text-accent mb-2 font-mono">Highlighting Collaborative Projects and Creativity</h2>
    <p className="text-accent mb-4 ">Here are some pieces from projects where I had the opportunity to collaborate, showcasing various animation works and design prototypes.</p>
    
    {[
      { src: cardsFlames, title: "Flaming Cards", description: "Animation for Pull&Bear's social media, featuring flaming cards intended to be displayed on the Pull&Bear website. Tools used: Illustrator and After Effects.", alt: "Cards Flames Animation" },
      { src: dreamy, title: "Dreamy Moon", description: "A social media post for the Dreamy Collection, entirely designed with After Effects.", alt: "Dreamy Animation" },
      { src: keytrip, title: "Keytrip", description: "Content for Pull&Bear's social media, combining 3D design and traditional frame-by-frame animation for the backgrounds. Tools used: Blender and After Effects.", alt: "Keytrip Animation" },
      { src: landscape3d, title: "3D Landscape", description: "Simulating a 3D rendered retro world, this content was created for Pull&Bear's social media. Designed with Blender and After Effects.", alt: "3D Landscape Animation" }
    ].map(item => (
      <div key={item.title} className="mb-8">
        <img
          src={item.src}
          alt={item.alt}
          className="w-full h-auto mb-4"
        />
        <h4 className="text-lg font-bold text-accent mb-2 font-mono">{item.title}</h4>
        <p className="text-accent font-lora">{item.description}</p>
      </div>
    ))}
  </div>
);

export default ProjectsContent;