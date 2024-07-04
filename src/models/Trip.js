import mongoose from "mongoose"

export const Trip = mongoose.model('Trip', {
  start: {
    lat: Number,
    lon: Number,
    address: String
  },
  end: {
    lat: Number,
    lon: Number,
    address: String
  },
  duration: Number,
  distance: Number,
  overspeedsCount: Number,
  boundingBox: [{
    lat: Number,
    lon: Number,
  }]
})
