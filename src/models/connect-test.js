import * as dotenv from "dotenv";
import Mongoose from "mongoose";

export function connectMongoTest() {
  dotenv.config();

  Mongoose.connect(process.env.db_test);
  // eslint-disable-next-line camelcase
  const dbTest = Mongoose.connection;

  // eslint-disable-next-line camelcase
  dbTest.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  dbTest.on("disconnected", () => {
    console.log("database disconnected");
  });

  dbTest.once("open", function () {
    console.log(`database connected to ${this.name} on ${this.host}`);
  });
}
