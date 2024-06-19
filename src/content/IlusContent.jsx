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
    <h1 className="text-4xl font-bold text-accent mb-4">Illustrations Content</h1>
    <h2 className="text-2xl font-semibold text-accent mb-2">Welcome to the Illustrations section.</h2>
    <p className="text-accent mb-4">Here you will find a variety of digital artworks and sketches created using different techniques and tools.</p>
    <p className="text-accent mb-4">Explore the vibrant world of illustrations where each piece tells a unique story.</p>
    
    <img src={dog3d} alt="3D Dog Illustration" className="mt-4 mb-4" />
    <p className="text-accent mb-4">This is a 3D illustration of a dog, showcasing the depth and details achieved through digital sculpting techniques.</p>
    
    <img src={rabbit3d} alt="3D Rabbit Illustration" className="mt-4 mb-4" />
    <p className="text-accent mb-4">A playful 3D illustration of a rabbit, capturing the whimsical and lively essence of the character.</p>
    
    <img src={robot3d} alt="3D Robot Illustration" className="mt-4 mb-4" />
    <p className="text-accent mb-4">This 3D illustration depicts a robot, highlighting the intricate design and futuristic concept.</p>
    
    <img src={wizard} alt="Wizard Illustration" className="mt-4 mb-4" />
    <p className="text-accent mb-4">An illustration of a wizard, bringing to life the magical and mystical elements of fantasy art.</p>
    
    <img src={skull} alt="Skull Illustration" className="mt-4 mb-4" />
    <p className="text-accent mb-4">This illustration of a skull showcases the detailed and realistic approach to digital art.</p>
    
    <img src={dog} alt="Dog Illustration" className="mt-4 mb-4" />
    <p className="text-accent mb-4">A charming illustration of a dog, capturing the personality and essence of the animal through expressive art.</p>
    
    <img src={eyes} alt="Eyes Illustration" className="mt-4 mb-4" />
    <p className="text-accent mb-4">An artistic portrayal of eyes, emphasizing the importance of detail and emotion in digital illustrations.</p>
  </div>
);

export default IlusContent;