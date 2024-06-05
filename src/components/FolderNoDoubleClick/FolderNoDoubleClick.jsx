import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import documentIcon from '../../icons/document.svg';
import dailyBloomIcon from '../../icons/dailybloom.svg';
import weatherIcon from '../../icons/weather3.svg';
import contactIcon from '../../icons/letter_close.svg';
import Modal from '../Modal/Modal';
import CVContent from '../../content/CVContent';

const FolderNoDoubleClick = ({ initialOpen, className, style, name, content }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const iconMapping = {
    'CV': documentIcon,
    'DailyBloom': dailyBloomIcon,
    'Weather': weatherIcon,
    'Contact': contactIcon,
  };

  const handleDoubleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDoubleClick();
    }
  };

  const handlePointerDown = () => {
    setIsClicked(true);
  };

  return (
    <>
      <div className="m-3">
        <motion.div
          className={`flex flex-col items-center justify-center w-24 p-2 mb-4 ${className}`}
          style={style}
          drag
          dragMomentum={false}
          onDoubleClick={handleDoubleClick}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerUp={() => setIsClicked(false)}
          whileTap={{ scale: 0.95 }}
        >
          <motion.img
            src={iconMapping[name] || documentIcon}
            alt={name}
            className="w-full h-full pointer-events-none"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            style={{ cursor: 'move' }}
          />
          <span className={`mt-2 text-center w-full ${isClicked ? 'bg-accent text-white ' : 'text-accent'}`}>
            {name}
          </span>
        </motion.div>
        <Modal isOpen={isModalOpen} onClose={closeModal} title={name} zIndex={2000}>
          {name === 'CV' ? <CVContent onClose={closeModal} /> : content}
        </Modal>
      </div>
    </>
  );
};

FolderNoDoubleClick.propTypes = {
  initialOpen: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  name: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

FolderNoDoubleClick.defaultProps = {
  initialOpen: false,
  className: '',
  style: {},
};

export default FolderNoDoubleClick;