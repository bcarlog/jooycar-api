import { point, distance } from '@turf/turf'

export const calculateDuration = (readings) => {
  return readings[readings.length - 1].time - readings[0].time
}

export const calculateDistance = (readings) => {
  let distanceTotal = 0

  for (let i = 0; i < readings.length - 1; i++) {
    const from = point([readings[i].location.lon, readings[i].location.lat])
    const to = point([readings[i + 1].location.lon, readings[i + 1].location.lat])
    distanceTotal += distance(from, to) // default km
  }

  return distanceTotal
}

export const calculateOverspeed = (readings) => {
  let overspeeds = 0
  let sameSegment = false
  readings.forEach(reading => {
    if (reading.speed > reading.speedLimit && !sameSegment) {
      overspeeds += 1
      sameSegment = true
    } else {
      sameSegment = false
    }
  })

  return overspeeds
}

export const calculateBoundingBox = (readings) => {
  const minLat = Math.min(...readings.map(reading => reading.location.lat))
  const maxLat = Math.max(...readings.map(reading => reading.location.lat))
  const minLon = Math.min(...readings.map(reading => reading.location.lon))
  const maxLon = Math.max(...readings.map(reading => reading.location.lon))

  return [
    { lat: minLat, lon: minLon },
    { lat: maxLat, lon: minLon },
    { lat: maxLat, lon: maxLon },
    { lat: minLat, lon: maxLon }
  ]
}
