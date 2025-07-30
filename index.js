import express, { json } from 'express';
import peliculasRoutes from './routes/peliculas.routes.js';
const app = express();
const PORT = 3000;

app.use(json()); // Para leer JSON en requests

app.use('/api/peliculas', peliculasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
