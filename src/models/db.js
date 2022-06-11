import { connectMongo } from "./connect.js";
import { connectMongoTest } from "./connect-test.js";
import { userMongoStore } from "./user-mongo-store.js";
import { poiMongoStore } from "./poi-mongo-store.js";

export const db = {
  userStore: null,

  init(storeType) {
    switch (storeType) {
      case "testMongo":
        this.userStore = userMongoStore;
        this.poiStore = poiMongoStore;
        connectMongoTest();
      // eslint-disable-next-line no-fallthrough
      default:
        this.userStore = userMongoStore;
        this.poiStore = poiMongoStore;
        connectMongo();
    }
  },
};
