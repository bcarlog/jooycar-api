import { Trip } from "../models/Trip.js"

export const save = (data) => {
  const trip = new Trip(data)
  return trip.save()
}

export const list = () => {
  return Trip.find()
}
