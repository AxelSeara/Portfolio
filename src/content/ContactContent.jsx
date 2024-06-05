import React, { useState } from 'react';
import Button from '../components/Button/Button';

const ContactContent = () => {
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
    
    // Simulación de envío de formulario con un retraso de 2 segundos
    setTimeout(() => {
      console.log('Formulario enviado:', formData);
      setIsSent(true);
    }, 2000);
  };

  if (isSent) {
    return (
      <div className="p-4 bg-red-200 border-2 border-quaternary rounded">
        <h2 className="text-lg font-bold mb-4 text-accent">Message Sent!</h2>
        <p className="text-accent">Thank you for reaching out. We will get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-red-200 border-2 border-quaternary rounded">
      <h2 className="text-lg font-bold mb-4 text-accent">Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-accent" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-accent bg-quaternary text-accent rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-accent" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-accent bg-quaternary text-accent rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-accent" htmlFor="message">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-accent bg-quaternary text-accent rounded"
            rows="4"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <Button text="Send" />
        </div>
      </form>
    </div>
  );
};

export default ContactContent;