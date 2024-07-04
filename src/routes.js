import { Router } from 'express'
import { createTripController, listTripController } from './modules/trip/index.js';

export default () => {
	const router = Router();

  router.post('/api/trips/v1', createTripController)
  router.get('/api/trips/v1', listTripController)

  return router
}
