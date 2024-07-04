import { createTrip } from "./service.js";

export const tripController = async (req, res) => {
  await createTrip(req.body)
  res.status(201).send('Created!')
}
