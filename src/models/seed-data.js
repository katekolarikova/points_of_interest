import Mongoose from "mongoose";

export const seedData = {
  users: {
    _model: "User",
    john: {
      name: "John",
      nickname: "john01",
      email: "john@test.com",
      password: "jon",
      admin: false,
    },
    kathy: {
      name: "Kathy",
      nickname: "kathy01",
      email: "kathy@test.com",
      password: "kathy",
      admin: Boolean,
    },
  },
  pois: {
    _model: "Poi",
    castle: {
      name: "Castle",
      category: "history",
      description: "realy old building",
      img: "xy.com",
      latitude: 1.1,
      longitude: 1.1,
    },
  },
};
