import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Button from '../components/Button/Button'; // Ensure this path is correct

const ContactContent = ({ onClose }) => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: '',
    to_name: 'Recipient' // Assuming a static recipient name
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

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <div className="flex flex-col h-full w-full px-4 py-2 overflow-auto">
      <h2 className="text-lg font-bold text-accent mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label className="block text-sm font-bold text-accent mb-2" htmlFor="from_name">Name:</label>
          <input
            type="text"
            id="from_name"
            name="from_name"
            value={formData.from_name}
            onChange={handleChange}
            className="w-full p-2 border border-accent bg-quaternary text-accent rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-accent mb-2" htmlFor="from_email">Email:</label>
          <input
            type="email"
            id="from_email"
            name="from_email"
            value={formData.from_email}
            onChange={handleChange}
            className="w-full p-2 border border-accent bg-quaternary text-accent rounded"
          />
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