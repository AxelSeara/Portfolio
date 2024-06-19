import React, { useState } from 'react';
import Button from '../components/Button/Button'; // Make sure this path is correct

const ContactContent = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending data
    setTimeout(() => {
      console.log('Form Submitted:', formData);
      setIsSent(true);
    }, 2000);
  };

  if (isSent) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <h2 className="text-lg font-bold text-accent mb-4">Message Sent!</h2>
        <p className="text-accent mb-4">Thank you for reaching out. We will get back to you soon.</p>
        <Button text="Close" onClick={onClose} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full p-4 overflow-auto">
      <h2 className="text-lg font-bold text-accent mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label className="block text-sm font-bold text-accent mb-2" htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-accent bg-quaternary text-accent rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-accent mb-2" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-accent bg-quaternary text-accent rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-accent mb-2" htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-accent bg-quaternary text-accent rounded"
            rows="4"
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button text="Send" />
        </div>
      </form>
    </div>
  );
};

export default ContactContent;