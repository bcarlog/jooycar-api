import { Trip } from "../models/Trip.js"

export const save = (data) => {
  const trip = new Trip(data)
  return trip.save()
}

export const list = ({ start_gte, start_lte, distance_gte }, { limit, offset }) => {
  let filters = {}

  if (start_gte) {
    filters['start.time'] = { ...filters['start.time'], $gte: Number(start_gte) };
  }

  if (start_lte) {
    filters['start.time'] = { ...filters['start.time'], $lte: Number(start_lte) };
  }

  if (distance_gte) {
    filters.distance = { $gte: Number(distance_gte)}
  }

  return Trip.find(filters).limit(limit).skip(offset)
}
