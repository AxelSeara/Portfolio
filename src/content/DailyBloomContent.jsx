import React from 'react';
import Card from './DailyBloomImages/card.mp4';
import Dashboard from './DailyBloomImages/dashboard.mp4';
import Scroll from './DailyBloomImages/scroll.mp4';
import Mainmenu from './DailyBloomImages/mainmenu.mp4';

const DailyBloomContent = () => (
  <div>
    <h2>Daily Bloom Content</h2>
    <div className="flex flex-col md:flex-row">
      <div className="flex-1">
        <h3>Card Interface</h3>
        <p>This interface allows users to interact with cards.</p>
      </div>
      <div className="flex-1">
        <video autoPlay loop muted playsInline>
          <source src={Card} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p>Explore interactive cards that provide information at a glance.</p>
      </div>
    </div>

    <div className="flex flex-col md:flex-row-reverse">
      <div className="flex-1">
        <h3>Dashboard</h3>
        <p>This is the main dashboard of the app.</p>
      </div>
      <div className="flex-1">
        <video autoPlay loop muted playsInline>
          <source src={Dashboard} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p>Navigate through the main dashboard for overall insights and controls.</p>
      </div>
    </div>

    <div className="flex flex-col md:flex-row">
      <div className="flex-1">
        <h3>Scroll Interaction</h3>
        <p>Users can scroll through content smoothly.</p>
      </div>
      <div className="flex-1">
        <video autoPlay loop muted playsInline>
          <source src={Scroll} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p>Enhanced scrolling features for easy navigation and content discovery.</p>
      </div>
    </div>

    <div className="flex flex-col md:flex-row-reverse">
      <div className="flex-1">
        <h3>Main Menu</h3>
        <p>Access all app features from the main menu.</p>
      </div>
      <div className="flex-1">
        <video autoPlay loop muted playsInline>
          <source src={Mainmenu} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p>Quickly navigate to different parts of the application from the main menu.</p>
      </div>
    </div>
  </div>
);

export default DailyBloomContent;