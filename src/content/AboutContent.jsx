import React from 'react';
import { motion } from 'framer-motion';
import Avatar from './Avatar/avatar.png';

const AboutContent = () => (
  <>
    <div className="flex flex-col items-center p-4 max-w-xl text-center">
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
        I'm a designer, developer, and UX/UI master. Every pixel and code snippet on this page is crafted by my own hands Feel free to connect; let's create something new.
      </p>
    </div>
  </>
);

export default AboutContent;