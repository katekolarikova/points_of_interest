import Mongoose from "mongoose";

const { Schema } = Mongoose;

const userSchema = new Schema({
  name: String,
  nickname: String,
  email: String,
  password: String,
  admin: Boolean,
});

export const User = Mongoose.model("User", userSchema);
