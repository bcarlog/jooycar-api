import { validate } from "./validation.js"
import * as tripRepository from "../../repository/tripRepository.js"
import { calculateBoundingBox, calculateDistance, calculateDuration, calculateOverspeed } from "../../utils/calc.js"

export const createTrip = (readings) => {
  const { valid, code } = validate(readings)
  if (!valid) {
    return { error: code }
  }

  const start = readings.reduce((prev, curr) => prev.time > curr.time ? prev : curr, Infinity)
  const end = readings.reduce((prev, curr) => prev.time < curr.time ? prev : curr, -Infinity)
  const duration = calculateDuration(readings)
  const distance = calculateDistance(readings)
  const overspeedsCount = calculateOverspeed(readings)
  const boundingBox = calculateBoundingBox(readings)

  const data = {
    start: {
      time: start.time,
      lat: start.location.lat,
      lon: start.location.lon,
      address: 'Address example',
    },
    end: {
      time: end.time,
      lat: end.location.lat,
      lon: end.location.lon,
      address: 'Address example',
    },
    duration,
    distance,
    overspeedsCount,
    boundingBox,
  }

  return tripRepository.save(data)
}

export const listTrip = (filters, pagination) => {
  const { limit = 10, offset = 0 } = pagination || {}
  return tripRepository.list(filters, { limit, offset })
}
