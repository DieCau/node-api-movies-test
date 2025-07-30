const express = require('express');
const router = express.Router();
const {
  getPeliculas,
  getPeliculaPorId,
  crearPelicula,
  actualizarPelicula,
  borrarPelicula
} = require('../controllers/peliculas.controller');

// GET todas las películas
router.get('/', getPeliculas);

// GET una película por ID
router.get('/:id', getPeliculaPorId);

// POST crear nueva película
router.post('/', crearPelicula);

// PUT actualizar película
router.put('/:id', actualizarPelicula);

// DELETE eliminar película
router.delete('/:id', borrarPelicula);

module.exports = router;
