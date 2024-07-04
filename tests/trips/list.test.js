import { jest } from '@jest/globals';
import { Trip } from "../../src/models/Trip";
import { listTrip } from "../../src/modules/trip/service";

describe('list trips', () => {
  describe('pagination', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

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
})