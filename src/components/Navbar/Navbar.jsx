import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import iconLetter from '../../icons/icon_letter.svg';
import iconAdjust from '../../icons/icon_adjust.svg';

const Navbar = ({ name, links }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateClock();
    const intervalId = setInterval(updateClock, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative">
      <nav className="flex justify-between items-center p-2 px-6 bg-quaternary text-accent font-mono">
        <div className="relative flex items-center space-x-4">
          <button
            id="dropdownDefaultButton"
            onClick={toggleDropdown}
            className="font-bold text-accent hover:bg-primary hover:text-white rounded-lg px-2 py-1 focus:outline-none"
          >
            {name}
          </button>
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hover:bg-primary hover:text-white rounded-md px-2 py-1"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 flex items-center justify-center hover:bg-primary hover:text-white rounded-md">
            <img src={iconLetter} alt="Icon Letter" className="w-6 h-6" />
          </div>
          <div className="w-8 h-8 flex items-center justify-center hover:bg-primary hover:text-white rounded-md">
            <img src={iconAdjust} alt="Icon Adjust" className="w-6 h-6" />
          </div>
          <span>{currentTime}</span>
        </div>
      </nav>
      {dropdownOpen && (
        <div
          id="dropdown"
          className="absolute left-0 mt-2 z-10 bg-primary divide-y divide-gray-100  shadow w-44 "
        >
          <ul className="py-2 text-sm text-accent dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-secondary hover:text-white ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-secondary hover:text-white ">
                Version
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-secondary hover:text-white ">
                Me
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-secondary hover:text-white ">
                Haha
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

Navbar.propTypes = {
  name: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Navbar;
