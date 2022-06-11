import Mongoose from "mongoose";
const { Schema } = Mongoose;

const userSchema = new Schema({
  name: String,
  nickname: String,
  email: String,
  password: String,
});

export const User = Mongoose.model("User", userSchema);
