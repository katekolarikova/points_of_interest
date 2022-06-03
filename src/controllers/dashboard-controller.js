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

  newPoi: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPoi = {
        userid: loggedInUser._id,
        name: request.payload.name,
        category: request.payload.category,
        description: request.payload.description,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
      };
      await db.poiStore.addPoi(newPoi);
      return h.redirect("/dashboard");
    },
  },

  filterPoi: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const category = request.payload.category_display;
      const poisDb = await db.poiStore.getAllPois();
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
