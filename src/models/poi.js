import Mongoose from "mongoose";

const { Schema } = Mongoose;

const poiSchema = new Schema({
  name: String,
  category: String,
  description: String,
  latitude: Mongoose.Types.Decimal128,
  longitude: Mongoose.Types.Decimal128,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Poi = Mongoose.model("Poi", poiSchema);
