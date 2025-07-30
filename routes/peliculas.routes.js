import { Router } from 'express';
import { actualizarPelicula, borrarPelicula, crearPelicula, getPeliculaPorId, getPeliculas } from '../controllers/peliculas.controller.js';
const router = Router();

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

export default router;
