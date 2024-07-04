import { MIN_5_READINGS, TIME_REQUIRED } from "../../src/errors/codes"
import { createTrip } from "../../src/modules/trip/service"
import { calculateBoundingBox, calculateDistance, calculateDuration, calculateOverspeed } from "../../src/utils/calc"
import { deepClone } from "../../src/utils/obj"


describe('create trips', () => {
  const readings = [
    {
      time: 1642500462000,
      speed: 9,
      speedLimit: 38,
      location: {
        lat: -33.580158,
        lon: -70.567227,
      }
    },
    {
      time: 1642500466000,
      speed: 26,
      speedLimit: 38,
      location: {
        lat: -33.58013,
        lon: -70.566995,
      }
    },
    {
      time: 1642500470000,
      speed: 28,
      speedLimit: 38,
      location: {
        lat: -33.580117,
        lon: -70.566633,
      }
    },
    {
      time: 1642500474000,
      speed: 13,
      speedLimit: 38,
      location: {
        lat: -33.580078,
        lon: -70.566408
      }
    },
    {
      time: 1642500478000,
      speed: 18,
      speedLimit: 38,
      location: {
        lat: -33.580005,
        lon: -70.566498
      }
    }
  ]

  it('should return an error when 4 readings', () => {
    const fourReadings = readings.slice(0, 4)
    const result = createTrip(fourReadings)
    expect(result.error).toBe(MIN_5_READINGS)
  })

  it('should return an error if time doesnt exists in readings', () => {
    const readingsClone = deepClone(readings)
    delete readingsClone[0].time
    
    const result = createTrip(readingsClone)
    expect(result.error).toBe(TIME_REQUIRED)
  })

  describe('calculate trip time', () => {
    it('should return duration time in miliseconds', () => {
      const readings = [
        {
          time: 1642500462000,
          speed: 9,
          speedLimit: 38,
          location: {
            lat: -33.580158,
            lon: -70.567227,
          }
        },
        {
          time: 1642500466000,
          speed: 26,
          speedLimit: 38,
          location: {
            lat: -33.58013,
            lon: -70.566995,
          }
        },
        {
          time: 1642500470000,
          speed: 28,
          speedLimit: 38,
          location: {
            lat: -33.580117,
            lon: -70.566633,
          }
        }
      ]

      const time = calculateDuration(readings)
      expect(time).toBe(8000)
    })
  })

  describe('calculate trip distance', () => {
    it('should return distance in km', () => {
      const readings = [
        {
          time: 1642500462000,
          speed: 9,
          speedLimit: 38,
          location: {
            lat: -33.580158,
            lon: -70.567227,
          }
        },
        {
          time: 1642500466000,
          speed: 26,
          speedLimit: 38,
          location: {
            lat: -33.58013,
            lon: -70.566995,
          }
        },
      ]
      const distance = calculateDistance(readings)
      expect(distance.toFixed(6)).toBe('0.021716')
    })
  })

  describe('calculate overspeed by segments', () => {
    it('should return 0 overspeed', () => {
      const readings = [
        {
          time: 1642500462000,
          speed: 9,
          speedLimit: 38,
          location: {
            lat: -33.580158,
            lon: -70.567227,
          }
        },
        {
          time: 1642500466000,
          speed: 26,
          speedLimit: 38,
          location: {
            lat: -33.58013,
            lon: -70.566995,
          }
        },
      ]
      expect(calculateOverspeed(readings)).toBe(0)
    })

    it('should return 1 overspeed, only two segments', () => {
      const readings = [
        {
          time: 1642500462000,
          speed: 39,
          speedLimit: 38,
          location: {
            lat: -33.580158,
            lon: -70.567227,
          }
        },
        {
          time: 1642500466000,
          speed: 42,
          speedLimit: 38,
          location: {
            lat: -33.58013,
            lon: -70.566995,
          }
        },
      ]
      expect(calculateOverspeed(readings)).toBe(1)
    })

    it('should return 2 overspeed, two different segments', () => {
      const readings = [
        {
          time: 1642500462000,
          speed: 39,
          speedLimit: 38,
          location: {
            lat: -33.580158,
            lon: -70.567227,
          }
        },
        {
          time: 1642500466000,
          speed: 26,
          speedLimit: 38,
          location: {
            lat: -33.58013,
            lon: -70.566995,
          }
        },
        {
          time: 1642500470000,
          speed: 42,
          speedLimit: 38,
          location: {
            lat: -33.580117,
            lon: -70.566633,
          }
        },
        {
          time: 1642500474000,
          speed: 50,
          speedLimit: 38,
          location: {
            lat: -33.580078,
            lon: -70.566408
          }
        },
        {
          time: 1642500478000,
          speed: 18,
          speedLimit: 38,
          location: {
            lat: -33.580005,
            lon: -70.566498
          }
        }
      ]
      expect(calculateOverspeed(readings)).toBe(2)
    })
  })

  describe('calculate bounding box', () => {
    const readings = [
      {
        time: 1642500462000,
        speed: 9,
        speedLimit: 38,
        location: {
          lat: -33.580158,
          lon: -70.567227,
        }
      },
      {
        time: 1642500466000,
        speed: 26,
        speedLimit: 38,
        location: {
          lat: -33.58013,
          lon: -70.566995,
        }
      },
      {
        time: 1642500470000,
        speed: 28,
        speedLimit: 38,
        location: {
          lat: -33.580117,
          lon: -70.566633,
        }
      },
      {
        time: 1642500474000,
        speed: 13,
        speedLimit: 38,
        location: {
          lat: -33.580078,
          lon: -70.566408,
        }
      },
      {
        time: 1642500478000,
        speed: 18,
        speedLimit: 38,
        location: {
          lat: -33.580005,
          lon: -70.566498,
        }
      },
      {
        time: 1642500482000,
        speed: 32,
        speedLimit: 38,
        location: {
          lat: -33.58002,
          lon: -70.566837,
        }
      },
      {
        time: 1642500486000,
        speed: 38,
        speedLimit: 38,
        location: {
          lat: -33.580038,
          lon: -70.567265,
        }
      },
      {
        time: 1642500490000,
        speed: 38,
        speedLimit: 38,
        location: {
          lat: -33.580043,
          lon: -70.56773,
        }
      },
      {
        time: 1642500494000,
        speed: 35,
        speedLimit: 38,
        location: {
          lat: -33.580048,
          lon: -70.56817,
        }
      },
      {
        time: 1642500498000,
        speed: 20,
        speedLimit: 38,
        location: {
          lat: -33.580053,
          lon: -70.568502,
        }
      },
    ]

    it('should calculate bounding box', () => {
      expect(calculateBoundingBox(readings)).toEqual([
        { lat: -33.580158, lon: -70.568502 },
        { lat: -33.580005, lon: -70.568502 },
        { lat: -33.580005, lon: -70.566408 },
        { lat: -33.580158, lon: -70.566408 },
      ])
    })
  })
})
