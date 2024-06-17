import React from 'react';
import PropTypes from 'prop-types';

const MainLayout = ({ children }) => {
  return (
    <div
      className="h-screen flex flex-col overflow-hidden bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: 'url(/bg3.jpg)' }}
    >
      {children}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;