import React from 'react';
import dog3d from './FolderImages/ilustration/dog_3d.jpeg';
import rabbit3d from './FolderImages/ilustration/rabbit_3d.jpeg';
import robot3d from './FolderImages/ilustration/robot_3d.png';
import wizard from './FolderImages/ilustration/wizard_3d.png';
import skull from './FolderImages/ilustration/skull.jpeg';
import dog from './FolderImages/ilustration/dog.jpeg';
import eyes from './FolderImages/ilustration/eyes.jpeg';

const IlusContent = () => (
  <div className="overflow-auto p-4 max-w-4xl mx-auto" style={{ maxHeight: 'calc(100vh - 12rem)', maxWidth: '70vh' }}>
    <h1 className="text-4xl font-mono font-bold text-accent mb-4">Illustration Portfolio</h1>
    <h2 className="text-2xl font-mono font-semibold text-accent mb-2">Exploring Creativity and Professionalism</h2>
    <p className="text-accent mb-4 ">During my time at Cotton Corner Group, I worked on creating a variety of content for different brands within the Inditex group. My focus was on both print materials and digital content displayed in stores. Below is a selection of these projects.</p>
    <p className="text-accent mb-4 font-lora">Dive into the vibrant world of illustrations, where each piece tells its own unique story, brought to life through various digital techniques and tools.</p>
    
    {[
      { src: dog3d, title: "Napping Dog", description: "This 3D illustration of a dog was created for the spring-summer collection displays in stores. I used Photoshop, Blender, and Cycles to bring it to life.", alt: "3D Dog Illustration" },
      { src: rabbit3d, title: "Tracksuit Rabbit", description: "As part of the same campaign, this playful 3D rabbit was crafted using Photoshop, Blender, and Cycles, aligning perfectly with the display strategy.", alt: "3D Rabbit Illustration" },
      { src: robot3d, title: "Clay Robot", description: "Robot was designed to simulate clay models for in-store displays. The tools I used were Photoshop, Blender, and Cycles.", alt: "3D Robot Illustration" },
      { src: wizard, title: "The Angry Wizard", description: "Wizard character was designed for animation by a different team and was displayed on in-store screens. I used Photoshop, Blender, and Cycles to create it.", alt: "Wizard Illustration" },
      { src: skull, title: "Skull&snake", description: "This illustration was created for a Pull&Bear T-shirt collection. The techniques I used included hand-drawing and Procreate.", alt: "Skull Illustration" },
      { src: dog, title: "Cartoon Dog", description: "This old school dog illustration was designed for Zara Kids using Photoshop, Illustrator, and hand-drawing.", alt: "Dog Illustration" },
      { src: eyes, title: "Walking Eyes", description: "This artistic portrayal of eyes was created for the same T-shirt campaign, utilizing hand-drawing and Procreate.", alt: "Eyes Illustration" }
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

export default IlusContent;