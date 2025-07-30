const express = require('express');
const app = express();
const peliculasRoutes = require('./routes/peliculas.routes');
const PORT = 3000;

app.use(express.json()); // Para leer JSON en requests

app.use('/peliculas', peliculasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
