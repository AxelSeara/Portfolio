import React from 'react';
import { motion } from 'framer-motion';
import Avatar from './Avatar/avatar.png';

const AboutContent = () => (
  <>
    <div className="flex flex-col items-center p-4 max-w-xl text-center bg-tertiary rounded-lg shadow-xl">
      <motion.img
        src={Avatar}
        alt="Axel"
        className="w-48 h-48 mb-4 "
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 2
        }}
      />
      <h1 className="text-5xl font-bold text-accent mb-2">
        Hey, It's Axel!
      </h1>
      <h2 className="text-3xl text-accent mb-4">
        Dive into My Digital Realm
      </h2>
      <p className="text-accent font-medium mb-4">
        I'm a designer, developer, and UX/UI master. Every pixel and code snippet on this page is crafted by my own hands. Revel in the exploration of my work, featuring bespoke apps and design projects. Feel free to connect; let's create something new.
      </p>
      <p className="text-accent mt-4 font-bold text-lg">
        Axel S © 2024 - All Rights Reserved
      </p>
    </div>
  </>
);

export default AboutContent;