import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// ✅ Esta parte reemplaza __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, '../data/peliculas.json');

const leerPeliculas = () => {
  const data = readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const guardarPeliculas = (peliculas) => {
  writeFileSync(filePath, JSON.stringify(peliculas, null, 2));
};

export function getPeliculas(req, res) {
  const peliculas = leerPeliculas();
  res.json(peliculas);
}

export function getPeliculaPorId(req, res) {
  const peliculas = leerPeliculas();
  const pelicula = peliculas.find(p => p.id === parseInt(req.params.id));
  if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' });
  res.json(pelicula);
}

export function crearPelicula(req, res) {
  const peliculas = leerPeliculas();
  const nuevaPelicula = {
    id: peliculas.length ? peliculas[peliculas.length - 1].id + 1 : 1,
    ...req.body
  };
  peliculas.push(nuevaPelicula);
  guardarPeliculas(peliculas);
  res.status(201).json({ mensaje: 'Película agregada', pelicula: nuevaPelicula });
}

export function actualizarPelicula(req, res) {
  const peliculas = leerPeliculas();
  const id = parseInt(req.params.id);
  const index = peliculas.findIndex(p => p.id === id);

  if (index === -1) return res.status(404).json({ error: 'Película no encontrada' });

  peliculas[index] = { ...peliculas[index], ...req.body };
  guardarPeliculas(peliculas);
  res.json({ mensaje: 'Película actualizada', pelicula: peliculas[index] });
}

export function borrarPelicula(req, res) {
  const peliculas = leerPeliculas();
  const id = parseInt(req.params.id);
  const index = peliculas.findIndex(p => p.id === id);

  if (index === -1) return res.status(404).json({ error: 'Película no encontrada' });

  const eliminada = peliculas.splice(index, 1);
  guardarPeliculas(peliculas);
  res.json({ mensaje: 'Película eliminada', eliminada: eliminada[0] });
}
