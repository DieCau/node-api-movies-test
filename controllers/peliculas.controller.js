const fs = require('fs');
const path = './movies.json';

const leerPeliculas = () => {
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
};

const guardarPeliculas = (peliculas) => {
  fs.writeFileSync(path, JSON.stringify(peliculas, null, 2));
};

exports.getPeliculas = (req, res) => {
  const peliculas = leerPeliculas();
  res.json(peliculas);
};

exports.getPeliculaPorId = (req, res) => {
  const peliculas = leerPeliculas();
  const pelicula = peliculas[req.params.id];
  if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' });
  res.json(pelicula);
};

exports.crearPelicula = (req, res) => {
  const peliculas = leerPeliculas();
  peliculas.push(req.body);
  guardarPeliculas(peliculas);
  res.status(201).json({ mensaje: 'Película agregada', pelicula: req.body });
};

exports.actualizarPelicula = (req, res) => {
  const peliculas = leerPeliculas();
  const id = req.params.id;

  if (!peliculas[id]) return res.status(404).json({ error: 'Película no encontrada' });

  peliculas[id] = { ...peliculas[id], ...req.body };
  guardarPeliculas(peliculas);
  res.json({ mensaje: 'Película actualizada', pelicula: peliculas[id] });
};

exports.borrarPelicula = (req, res) => {
  const peliculas = leerPeliculas();
  const id = req.params.id;

  if (!peliculas[id]) return res.status(404).json({ error: 'Película no encontrada' });

  const eliminada = peliculas.splice(id, 1);
  guardarPeliculas(peliculas);
  res.json({ mensaje: 'Película eliminada', eliminada: eliminada[0] });
};
