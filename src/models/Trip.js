import mongoose from "mongoose"

export const Trip = mongoose.model('Trip', {
  start: {
    time: Number,
    lat: Number,
    lon: Number,
    address: String
  },
  end: {
    time: Number,
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
