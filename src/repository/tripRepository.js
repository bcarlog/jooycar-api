import { Trip } from "../models/Trip.js"

export const save = (data) => {
  const trip = new Trip(data)
  return trip.save()
}

export const list = ({ limit, offset }) => {
  return Trip.find({}).limit(limit).skip(offset)
}
