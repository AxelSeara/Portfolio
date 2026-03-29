const express = require('express');
const path = require('path');
const app = express();

// Middleware para redirigir de no-www a www en dominios públicos
app.use((req, res, next) => {
  const host = req.headers.host || '';
  const hostname = host.split(':')[0];
  const isLocalhost = hostname === 'localhost' || /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname);
  const isSubdomain = hostname.startsWith('www.');

  if (!isLocalhost && hostname && !isSubdomain) {
    return res.redirect(301, `https://www.${host}${req.url}`);
  }

  next();
});

// Servir archivos estáticos desde el directorio 'build'
app.use(express.static(path.join(__dirname, 'build')));

// Manejar todas las rutas para servir el archivo index.html de React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
