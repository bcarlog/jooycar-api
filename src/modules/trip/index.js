import { createTrip, listTrip } from "./service.js";

export const createTripController = async (req, res) => {
  await createTrip(req.body)
  res.status(201).send('Created!')
}

export const listTripController = async (req, res) => {
  const { start_gte, start_lte, distance_gte, limit, offset } = req.query
  const trips = await listTrip({ start_gte, start_lte, distance_gte }, { limit, offset })
  res.status(200).send(trips)
}
