import React from 'react';
import brand2 from './FolderImages/brand/brand 2.jpeg';
import brand3 from './FolderImages/brand/brand 3.jpeg';
import brand4 from './FolderImages/brand/brand 4.jpeg';
import brand5 from './FolderImages/brand/brand 5.jpeg';
import logo1 from './FolderImages/brand/logo1.jpeg';

const DesignContent = () => (
  <div className="overflow-auto p-4 max-w-4xl mx-auto" style={{ maxHeight: 'calc(100vh - 12rem)', maxWidth: '70vh' }}>
    <h1 className="text-4xl font-bold text-accent mb-4 font-mono">Brand Design Portfolio</h1>
    <h2 className="text-2xl font-semibold text-accent mb-2 font-mono">Collaborations and Creative Projects</h2>
    <p className="text-accent mb-4">I've had the opportunity to collaborate with diverse brands, generating logos for handbags, collections, and various small projects. Each piece showcases a unique approach to brand identity and design.</p>
    
    {[
      { src: brand2, title: "Time Vortex", description: "Design for a T-shirt collection inspired by retro digital logos. Tools used: Illustrator.", alt: "Brand Design 2" },
      { src: brand3, title: "Little Dimensional Company", description: "Collaboration with the same brand for a second collection logo, based on the retro digital logos concept with appealing naming. Tools used: Illustrator.", alt: "Brand Design 3" },
      { src: brand4, title: "In Love With", description: "For a campaign promoting eco-transition at Pull&Bear, this logo was used in handtags and fabric tags for a small collection. Tools used: Illustrator.", alt: "Brand Design 4" },
      { src: brand5, title: "Grow is Pleasure", description: "Worked with a small streetwear brand to completely redesign their brand identity. Tools used: Illustrator.", alt: "Brand Design 5" },
      { src: logo1, title: "Daily Beats", description: "Logo for an independent radio station from northern Spain. Tools used: Illustrator.", alt: "Logo Design 1" }
    ].map(item => (
      <div key={item.title} className="mb-8">
        <img
          src={item.src}
          alt={item.alt}
          className="w-full h-auto mb-4"
        />
        <h4 className="text-lg font-bold text-accent mb-2 font-mono">{item.title}</h4>
        <p className="text-accent">{item.description}</p>
      </div>
    ))}
  </div>
);

export default DesignContent;