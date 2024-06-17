import React from 'react';
import PropTypes from 'prop-types';
import bgImage from './bgs/bg3.svg'; // Adjust the path if necessary

const MainLayout = ({ children }) => {
  return (
    <div
      className="h-screen flex flex-col overflow-hidden bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {children}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;