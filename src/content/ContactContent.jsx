import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

// Reemplaza con tus credenciales EmailJS
const SERVICE_ID = 'service_pbwskx8';
const TEMPLATE_ID = 'template_cqcuixl';
const PUBLIC_KEY = 'OdKGa6t_VAsUFW1vD';

// Pequeña regex para validar emails
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Pasos: Asunto → Email → Mensaje (50 chars min)
const steps = [
  { key: 'subject', prompt: 'Enter SUBJECT and press [OK]' },
  { key: 'from_email', prompt: 'Enter YOUR EMAIL and press [OK]' },
  { key: 'message', prompt: 'Enter MESSAGE (50 chars min) and press [OK]' },
];

function KawaiiShortContact({ onClose }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    subject: '',
    from_email: '',
    message: '',
    from_name: 'Anonymous',
    to_name: 'Recipient',
  });

  // Terminal lines: donde registramos mensajes y prompts
  const [terminalLines, setTerminalLines] = useState([
    '(っ◕‿◕)っ  Welcome to the GREEN Terminal!'
  ]);

  // Estado para envío y errores
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  // Typewriter effect para una línea adicional de bienvenida
  const [typedText, setTypedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const typedLine = "We’ll guide you step by step. Or reach me at axelsearagomez@gmail.com";

  useEffect(() => {
    // Efecto de tipeo, 30ms por carácter
    if (charIndex < typedLine.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + typedLine[charIndex]);
        setCharIndex(charIndex + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      // Al terminar, lo añadimos como línea completa
      setTerminalLines((prev) => [...prev, typedText]);
    }
  }, [charIndex, typedLine, typedText]);

  // Paso actual
  const currentStep = steps[currentStepIndex];

  // Manejo de cambios en input
  const handleChange = (value) => {
    setError('');
    setFormData((prev) => ({
      ...prev,
      [currentStep.key]: value
    }));
  };

  // Validar input según el paso
  const validate = () => {
    if (currentStep.key === 'from_email') {
      const email = formData.from_email.trim();
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address!');
        setTerminalLines((prev) => [
          ...prev,
          'ERROR: Invalid email format. Try again.'
        ]);
        return false;
      }
    }
    if (currentStep.key === 'message') {
      const msgLength = formData.message.trim().length;
      if (msgLength < 50) {
        setError('Message must be at least 50 characters long!');
        setTerminalLines((prev) => [
          ...prev,
          'ERROR: Your message is too short (50 chars min). Try again.'
        ]);
        return false;
      }
    }
    return true;
  };

  // Manejo de [OK]
  const handleOK = () => {
    if (!validate()) return;

    const field = currentStep.key;
    const userInput = formData[field].trim() || '';
    setTerminalLines((prev) => [...prev, `[${field.toUpperCase()}]: ${userInput}`]);

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      sendEmail();
    }
  };

  // Envío de Email
  const sendEmail = () => {
    setIsSending(true);
    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(() => {
        setTerminalLines((prev) => [
          ...prev,
          'SENDING DATA...',
          'Message sent successfully!',
          'Closing automatically in 3 seconds...',
          // Pequeña animación ASCII:
          '  /\\_/\\   Thanks!',
          ' ( o.o )  We will close soon~',
          '  > ^ <'
        ]);
        setIsSending(false);
        setIsSent(true);

        // Cerramos modal a los 3s
        setTimeout(() => {
          onClose();
        }, 3000);
      })
      .catch((err) => {
        setTerminalLines((prev) => [
          ...prev,
          'ERROR SENDING DATA',
          `Error: ${err?.text || err}`
        ]);
        setIsSending(false);
      });
  };

  // Si ya está enviado, solo mostramos las líneas finales (sin botón)
  if (isSent) {
    return (
      <div className="
        w-[90vw] max-w-[600px]
        h-[80vh] max-h-[600px]
        bg-black text-green-400 font-mono p-4
        flex flex-col overflow-auto
      ">
        {terminalLines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    );
  }

  // Componente principal
  return (
    <div
      className="
        w-[90vw] max-w-[600px]
        h-[80vh] max-h-[600px]
        bg-black text-green-400 font-mono p-4
        flex flex-col overflow-auto
      "
    >
      {/* Líneas del “terminal” */}
      {terminalLines.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">{line}</div>
      ))}

      {/* Typewriter en progreso */}
      {charIndex < typedLine.length && (
        <div className="whitespace-pre-wrap">
          {typedText}
          <span className="animate-pulse">▌</span>
        </div>
      )}

      {/* Mostrar error si lo hay */}
      {error && (
        <div className="text-red-500 my-2">{error}</div>
      )}

      {/* Prompt e input si no estamos enviando y ya acabó el typewriter */}
      {!isSending && charIndex >= typedLine.length && (
        <div className="mt-4">
          <div className="mb-2">{currentStep.prompt}</div>

          <div className="relative flex items-center">
            <input
              className="bg-black border-b border-green-400 text-green-400 w-3/4 p-1 outline-none pr-6"
              value={formData[currentStep.key] || ''}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleOK();
              }}
              autoFocus
              style={{ caretColor: 'transparent' }}
            />

            {/* Si el paso es "message", mostrar contador "x/50" */}
            {currentStep.key === 'message' && (
              <div className="ml-2 text-sm text-green-300">
                {formData.message.length}/50
              </div>
            )}

            {/* Cursor cuadrado parpadeante */}
            <div className="absolute right-20 animate-pulse text-green-300 pointer-events-none">▌</div>

            <motion.button
              whileHover={{ opacity: 0.7 }}
              className="bg-green-600 text-black px-4 py-1 ml-4"
              onClick={handleOK}
            >
              OK
            </motion.button>
          </div>
        </div>
      )}

      {/* Si se está enviando */}
      {isSending && (
        <div className="mt-2 text-green-400">Sending data...</div>
      )}
    </div>
  );
}

export default KawaiiShortContact;