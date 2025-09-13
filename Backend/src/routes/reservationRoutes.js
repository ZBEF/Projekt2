import express from 'express';
import {
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation
} from '../controllers/reservation.controller.js';

const router = express.Router();

router.get('/reservations', getReservations);
router.post('/reservations', createReservation);
router.put('/reservations/:id', updateReservation);
router.delete('/reservations/:id', deleteReservation);

export default router;