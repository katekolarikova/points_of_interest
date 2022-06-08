import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const userspoisDb = await db.poiStore.getUserPois(loggedInUser._id);
      const poisDb = await db.poiStore.getAllPois();
      const viewData = {
        title: "Poi Dashboard",
        user_poi: userspoisDb,
        all_poi: poisDb,
      };
      return h.view("dashboard", viewData);
    },
  },

  filterPoi: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const category = request.payload.category_display;
      const poisDb = await db.poiStore.getAllPois();
      const poi = await db.poiStore.getPoiById("62a08b608b076aded1f9479f");
      const userspoisDb = await db.poiStore.getUserPois(loggedInUser._id);
      let poisDbFiltred = [];
      if (category === "All") poisDbFiltred = poisDb;
      else {
        for (let i = 0; i < poisDb.length; i++) {
          if (poisDb[i].category === category) {
            poisDbFiltred.push(poisDb[i]);
          }
        }
      }

      const viewData = {
        title: "Poi Dashboard",
        user_poi: userspoisDb,
        all_poi: poisDbFiltred,
      };
      return h.view("dashboard", viewData);
    },
  },
};
