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
};
