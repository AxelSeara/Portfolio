import React from 'react';
import Card from './DailyBloomImages/card.mp4';
import Dashboard from './DailyBloomImages/dashboard.mp4';
import Scroll from './DailyBloomImages/scroll.mp4';
import Mainmenu from './DailyBloomImages/mainmenu.mp4';

const DailyBloomContent = () => (
  <div className="overflow-auto " style={{ maxHeight: 'calc(100vh - 12rem)', overflowY: 'auto', maxWidth: '70vh' }}>
    <h1 className="text-4xl font-mono font-bold text-accent mb-2 pr-2">Daily Bloom Content</h1>
    <p className="text-accent font-lora max-w-2xl mx-auto mb-8 pr-2">
      Project where I collaborated mainly leading UX/UI aspects and implementing them from a frontend perspective. Daily Bloom is an app designed for those who want to create a memories diary. The app, through a flipping card game, recommends a daily topic. Then we have the option to post content related to it and share if we want, since it is mainly a non-social social app.
    </p>

    <div className="flex flex-col md:flex-row items-center mb-8">
      <div className="flex-1 p-4 pr-2">
        <h2 className="text-3xl font-mono font-semibold mb-2 text-accent">Card Interface</h2>
        <p className="text-accent font-lora mb-4 pr-2">
          Flipping card interface welcomes us every day, suggesting and discovering the daily topic on flip.
        </p>
      </div>
      <div className="flex-1 p-4 pr-2">
        <video className="w-full rounded-lg" autoPlay loop muted playsInline>
          <source src={Card} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>

    <div className="flex flex-col md:flex-row-reverse items-center mb-8">
      <div className="flex-1 p-4 pr-2">
        <h2 className="text-3xl font-mono font-semibold mb-2 text-accent">Dashboard</h2>
        <p className="text-accent font-lora mb-4 pr-2">
          Here we can navigate on our profile, check our categories or update them, check how many days we posted on a monthly view, and see some more stats about how we are doing.
        </p>
      </div>
      <div className="flex-1 p-4 pr-2">
        <video className="w-full rounded-lg" autoPlay loop muted playsInline>
          <source src={Dashboard} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>

    <div className="flex flex-col md:flex-row items-center mb-8">
      <div className="flex-1 p-4 pr-2">
        <h2 className="text-3xl font-mono font-semibold mb-2 text-accent">Scroll Interaction</h2>
        <p className="text-accent font-lora mb-4 pr-2">
          Main feed where we can easily take a look at what we posted, visit each item individually. The color indicates the kind of content we shared that day. The feed avoids distractions, keeping us chill scrolling over our thoughts.
        </p>
      </div>
      <div className="flex-1 p-4 pr-2">
        <video className="w-full rounded-lg" autoPlay loop muted playsInline>
          <source src={Scroll} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>

    <div className="flex flex-col md:flex-row-reverse items-center mb-8">
      <div className="flex-1 p-4 pr-2">
        <h2 className="text-3xl font-mono font-semibold mb-2 text-accent">Share Menu</h2>
        <p className="text-accent font-lora mb-4 pr-2">
          When we choose a topic, we have the beautiful selection menu. Here we can decide the kind of content we want to share.
        </p>
      </div>
      <div className="flex-1 p-4 pr-2">
        <video className="w-full rounded-lg" autoPlay loop muted playsInline>
          <source src={Mainmenu} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
);

export default DailyBloomContent;