const express = require('express');
const path = require('path');
const app = express();

// Middleware para redirigir de no-www a www
app.use((req, res, next) => {
  if (req.headers.host.slice(0, 4) !== 'www.') {
    res.redirect(301, 'https://www.' + req.headers.host + req.url);
  } else {
    next();
  }
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