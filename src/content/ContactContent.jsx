import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button/Button'; // Ensure this path is correct
import iconLetter from '../icons/icon_letter.svg'; // Ensure this path is correct

const ContactContent = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name.match(/^[a-zA-Z\s]+$/)) {
      tempErrors.name = 'Name should contain only letters and spaces.';
      isValid = false;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      tempErrors.email = 'Email is not valid.';
      isValid = false;
    }

    if (formData.subject.trim() === '') {
      tempErrors.subject = 'Subject is required.';
      isValid = false;
    }

    if (formData.message.trim() === '') {
      tempErrors.message = 'Message is required.';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSending(true);

    emailjs.send('service_pbwskx8', 'template_cqcuixl', formData, 'OdKGa6t_VAsUFW1vD')
      .then((result) => {
        console.log('Form Submitted:', result.text);
        setIsSent(true);
        setIsSending(false);
      }, (error) => {
        console.log('Failed to send form:', error.text);
        setIsSending(false);
      });
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
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-accent mb-2" htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border border-accent bg-quaternary text-accent rounded"
          />
          {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
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
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>
        <div className="flex justify-end mt-4 relative">
          <Button text="Send" />
        </div>
      </form>
    </div>
  );
};

export default ContactContent;