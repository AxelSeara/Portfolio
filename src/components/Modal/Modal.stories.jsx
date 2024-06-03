import React, { useState } from 'react';
import Modal from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button onClick={openModal} className="p-2 bg-primary text-white rounded">Open Modal</button>
      <Modal {...args} isOpen={isOpen} onClose={closeModal}>
        <div className="border-4 border-accent p-4">
          <p>Folder content goes here...</p>
        </div>
      </Modal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Folder Name',
};
