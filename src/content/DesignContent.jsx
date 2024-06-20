import React from 'react';
import brand2 from './FolderImages/brand/brand 2.jpeg';
import brand3 from './FolderImages/brand/brand 3.jpeg';
import brand4 from './FolderImages/brand/brand 4.jpeg';
import brand5 from './FolderImages/brand/brand 5.jpeg';
import logo1 from './FolderImages/brand/logo1.jpeg';

const DesignContent = () => (
  <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 12rem)', maxWidth: '70vh' }}>
    <h1 className="text-4xl font-bold text-accent mb-4 font-mono pr-2">Brand Design Portfolio</h1>
    <h2 className="text-2xl font-semibold text-accent mb-2 font-lora pr-2">Collaborations and Creative Projects</h2>
    <p className="text-accent mb-4 font-lora pr-2">I've had the opportunity to collaborate with diverse brands, generating logos for handbags, collections, and various small projects. Each piece showcases a unique approach to brand identity and design.</p>
    
    <img src={brand2} alt="Brand Design 2" className="w-full pr-2 mt-4 mb-4" />
    <h4 className="text-lg font-bold text-accent mb-2 font-mono pr-2">Time Vortex</h4>
    <p className="text-accent mb-4 font-lora pr-2">Design for a T-shirt collection inspired by retro digital logos. Tools used: <i>Illustrator</i>.</p>
    
    <img src={brand3} alt="Brand Design 3" className="w-full pr-2 mt-4 mb-4" />
    <h4 className="text-lg font-bold text-accent mb-2 font-mono pr-2">Little Dimensional Company</h4>
    <p className="text-accent mb-4 font-lora pr-2">Collaboration with the same brand for a second collection logo, based on the retro digital logos concept with appealing naming. Tools used: <i>Illustrator</i>.</p>
    
    <img src={brand4} alt="Brand Design 4" className="w-full pr-2 mt-4 mb-4" />
    <h4 className="text-lg font-bold text-accent mb-2 font-mono pr-2">In Love With</h4>
    <p className="text-accent mb-4 font-lora pr-2">For a campaign promoting eco-transition at Pull&Bear, this logo was used in handtags and fabric tags for a small collection. Tools used: <i>Illustrator</i>.</p>
    
    <img src={brand5} alt="Brand Design 5" className="w-full pr-2 mt-4 mb-4" />
    <h4 className="text-lg font-bold text-accent mb-2 font-mono pr-2">Grow is Pleasure</h4>
    <p className="text-accent mb-4 font-lora pr-2">Worked with a small streetwear brand to completely redesign their brand identity. Tools used: <i>Illustrator</i>.</p>
    
    <img src={logo1} alt="Logo Design 1" className="w-full pr-2 mt-4 mb-4" />
    <h4 className="text-lg font-bold text-accent mb-2 font-mono pr-2">Daily Beats</h4>
    <p className="text-accent mb-4 font-lora pr-2">Logo for an independent radio station from northern Spain. Tools used: <i>Illustrator</i>.</p>
  </div>
);

export default DesignContent;