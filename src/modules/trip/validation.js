import { MIN_5_READINGS, TIME_REQUIRED } from "../../errors/codes.js"

export const validate = (readings) => {
  if (readings.length < 5) {
    return { valid: false, code: MIN_5_READINGS }
  }

  const timeValid = readings.every(reading => reading.time || reading.time === 0)
  if (!timeValid) {
    return { valid: false, code: TIME_REQUIRED }
  }

  return { valid: true }
}
