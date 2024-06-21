import React from 'react';
import { motion } from 'framer-motion';
import Card from './DailyBloomImages/card.mp4';
import Dashboard from './DailyBloomImages/dashboard.mp4';
import Scroll from './DailyBloomImages/scroll.mp4';
import Mainmenu from './DailyBloomImages/mainmenu.mp4';

const DailyBloomContent = () => (
  <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 12rem)', overflowY: 'auto' }}>
    <div className="p-4 text-center max-w-2xl mx-auto">
      <h1
        className="text-3xl md:text-4xl font-mono font-bold text-accent mb-4"
  
      >
        Daily Bloom Content
      </h1>
      <p className="text-sm md:text-base text-accent mb-8">
        Project where I led UX/UI aspects and frontend implementation. Daily Bloom, designed for memory keeping, offers a daily topic through a flipping card game, promoting non-social social interaction.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Card Interface', video: Card, description: 'Daily topic discovery through a flipping card interface.' },
          { title: 'Dashboard', video: Dashboard, description: 'Profile navigation, category management, and activity stats.' },
          { title: 'Scroll Interaction', video: Scroll, description: 'Seamless scrolling feed showcasing daily posts with color-coded content types.' },
          { title: 'Share Menu', video: Mainmenu, description: 'Content sharing options available via a beautifully designed menu.' }
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center mb-8">
            <h2 className="text-2xl font-mono font-semibold text-accent mb-2">
              {item.title}
            </h2>
            <p className="text-accent mb-4 pr-2 ">
              {item.description}
            </p>
            <video className="w-5/6 rounded-lg" autoPlay loop muted playsInline>
              <source src={item.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default DailyBloomContent;