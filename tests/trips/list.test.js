import { jest } from '@jest/globals';
import { Trip } from "../../src/models/Trip";
import { listTrip } from "../../src/modules/trip/service";

describe('list trips', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('pagination', () => {
    it('should call repository with a default limit, offset', () => {
      const spyLimit = jest.spyOn(Trip, 'find').mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnValue([]),
      })

      listTrip({})
      expect(spyLimit().limit).toHaveBeenCalledWith(10)
      expect(spyLimit().skip).toHaveBeenCalledWith(0)
    })
  })

  describe('filters', () => {
    const spyLimit = jest.spyOn(Trip, 'find').mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnValue([]),
    })

    it('should call db only for start_gte', () => {
      listTrip({ start_gte: 10 })
      expect(spyLimit).toHaveBeenCalledWith({ 'start.time': { '$gte': 10 } })
    })

    it('should call db only for start_lte', () => {
      listTrip({ start_lte: 999999999 })
      expect(spyLimit).toHaveBeenCalledWith({ 'start.time': { '$lte': 999999999 } })
    })

    it('should call db only for distance_gte', () => {
      listTrip({ distance_gte: 10 })
      expect(spyLimit).toHaveBeenCalledWith({ 'distance': { '$gte': 10 } })
    })

    it('should call db for start_gte, start_lte, and, distance_gte', () => {
      listTrip({ distance_gte: 10, start_gte: 10, start_lte: 20 })
      expect(spyLimit).toHaveBeenCalledWith({
        'distance': { '$gte': 10 },
        'start.time': { '$gte': 10, '$lte': 20 }
      })
    })
  })
})