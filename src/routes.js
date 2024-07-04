import { Router } from 'express'
import { tripController } from './modules/trip/index.js';

export default () => {
	const router = Router();

  router.post('/api/trips/v1', tripController)

  return router
}
