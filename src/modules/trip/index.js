import { createTrip, listTrip } from "./service.js";

export const createTripController = async (req, res) => {
  await createTrip(req.body)
  res.status(201).send('Created!')
}

export const listTripController = async (req, res) => {
  const trips = await listTrip()
  res.status(200).send(trips)
}
