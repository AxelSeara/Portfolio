import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-tertiary hover:bg-accent text-accent hover:text-tertiary font-bold py-2 px-4 border-2 border-accent rounded transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
};

export default Button;