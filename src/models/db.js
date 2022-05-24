import { connectMongo } from "./connect.js";
import { userMongoStore } from "./user-mongo-store.js";

export const db = {
  userStore: null,

  init() {
    this.userStore = userMongoStore;
    connectMongo();
  },
};
