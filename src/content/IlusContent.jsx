import React from 'react';
import dog3d from './FolderImages/ilustration/dog_3d.jpeg';
import rabbit3d from './FolderImages/ilustration/rabbit_3d.jpeg';
import robot3d from './FolderImages/ilustration/robot_3d.png';
import wizard from './FolderImages/ilustration/wizard_3d.png';
import skull from './FolderImages/ilustration/skull.jpeg';
import dog from './FolderImages/ilustration/dog.jpeg';
import eyes from './FolderImages/ilustration/eyes.jpeg';

const IlusContent = () => (
  <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 12rem)', maxWidth: '70vh' }}>
    <h1 className="text-4xl font-bold text-accent mb-4 font-mono">Illustration Portfolio</h1>
    <h2 className="text-2xl font-semibold text-accent mb-2 font-lora">Exploring Creativity and Professionalism</h2>
    <p className="text-accent mb-2 font-lora pr-2">During my time at Cotton Corner Group, I worked on creating a variety of content for different brands within the Inditex group. My focus was on both print materials and digital content displayed in stores. Below is a selection of these projects.</p>
    <p className="text-accent mb-2 font-lora pr-2">Dive into the vibrant world of illustrations, where each piece tells its own unique story, brought to life through various digital techniques and tools.</p>
    
    <img src={dog3d} alt="3D Dog Illustration" className="mt-4 pr-2 mb-4" />
    <h4 className="text-lg font-bold text-accent mb-2 font-mono">Napping dog</h4>
    <p className="text-accent mb-4 font-lora pr-2">This 3D illustration of a dog was created for the spring-summer collection displays in stores. I used <i>Photoshop, Blender, and Cycles</i> to bring it to life.</p>
    
    <img src={rabbit3d} alt="3D Rabbit Illustration" className="mt-4 pr-2 mb-4" />
    <h4 className="text-lg font-bold text-accent mb-2 font-mono">Tracksuit rabbit</h4>
    <p className="text-accent mb-4 font-lora pr-2">As part of the same campaign, this playful 3D rabbit was crafted using <i>Photoshop, Blender, and Cycles</i>, aligning perfectly with the display strategy.</p>
    
    <img src={robot3d} alt="3D Robot Illustration" className="mt-4 pr-2 mb-4" />
    <h4 className="text-lg font-bold text-accent mb-2 font-mono">Clay Robot</h4>
    <p className="text-accent mb-4 font-lora pr-2">Robot was designed to simulate clay models for in-store displays. The tools I used were <i>Photoshop, Blender, and Cycles</i>.</p>
    
    <img src={wizard} alt="Wizard Illustration" className="mt-4 pr-2 mb-4" />
    <h4 className="text-lg font-bold text-accent mb-2 font-mono">The angry wizard</h4>
    <p className="text-accent mb-4 font-lora pr-2">Wizard character was designed for animation by a different team and was displayed on in-store screens. I used <i>Photoshop, Blender, and Cycles</i> to create it.</p>
    
    <img src={skull} alt="Skull Illustration" className="mt-4 pr-2 mb-4" />
    <h4 className="text-lg font-bold text-accent mb-2 font-mono">Skull&snake</h4>
    <p className="text-accent mb-4 font-lora pr-2">This illustration was created for a Pull&Bear T-shirt collection. The techniques I used included <i>hand-drawing and Procreate</i>.</p>
    
    <img src={dog} alt="Dog Illustration" className="mt-4 pr-2 mb-4" />
    <h4 className="text-lg font-bold text-accent mb-2 font-mono">Cartoon dog</h4>
    <p className="text-accent mb-4 font-lora pr-2">This old school dog illustration was designed for Zara Kids using <i>Photoshop, Illustrator, and hand-drawing</i>.</p>
    
    <img src={eyes} alt="Eyes Illustration" className="mt-4 pr-2 mb-4" />
    <h4 className="text-lg font-bold text-accent mb-2 font-mono">Walking eyes</h4>
    <p className="text-accent mb-4 font-lora pr-2">This artistic portrayal of eyes was created for the same T-shirt campaign, utilizing <i>hand-drawing and Procreate</i>.</p>
  </div>
);

export default IlusContent;