import Mongoose from "mongoose";

const { Schema } = Mongoose;

const poiSchema = new Schema({
  name: String,
  category: String,
  description: String,
  latitude: String,
  longitude: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Poi = Mongoose.model("Poi", poiSchema);
