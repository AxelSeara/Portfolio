import React from 'react';
import brand2 from './FolderImages/brand/brand 2.jpeg';
import brand3 from './FolderImages/brand/brand 3.jpeg';
import brand4 from './FolderImages/brand/brand 4.jpeg';
import brand5 from './FolderImages/brand/brand 5.jpeg';
import logo1 from './FolderImages/brand/logo1.jpeg';

const DesignContent = () => (
  <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 12rem)', maxWidth: '70vh' }}>
    <h1 className="text-4xl font-bold text-accent mb-4 font-lora">Design Content</h1>
    <h2 className="text-2xl font-semibold text-accent mb-2 font-lora">Welcome to the Design section.</h2>
    <p className="text-accent mb-4 font-lora">Here you will find graphic design works, UI/UX designs, and other creative designs.</p>
    <p className="text-accent mb-4 font-lora">Each design piece is crafted with attention to detail and a focus on user experience.</p>
    
    <img src={brand2} alt="Brand Design 2" className="w-full mt-4 mb-4" />
    <p className="text-accent mb-4 font-mono">A brand design piece showcasing a modern and sleek look, aimed at capturing the essence of the brand.</p>
    
    <img src={brand3} alt="Brand Design 3" className="w-full mt-4 mb-4" />
    <p className="text-accent mb-4 font-mono">This design emphasizes bold colors and strong typography to create a memorable brand identity.</p>
    
    <img src={brand4} alt="Brand Design 4" className="w-full mt-4 mb-4" />
    <p className="text-accent mb-4 font-mono">A creative design piece that combines visual aesthetics with functional elements for an effective brand presence.</p>
    
    <img src={brand5} alt="Brand Design 5" className="w-full mt-4 mb-4" />
    <p className="text-accent mb-4 font-mono">This design showcases innovative use of space and color to deliver a unique brand message.</p>
    
    <img src={logo1} alt="Logo Design 1" className="w-full mt-4 mb-4" />
    <p className="text-accent mb-4 font-mono">A logo design project, focusing on simplicity and recognition to create a strong brand mark.</p>
  </div>
);

export default DesignContent;