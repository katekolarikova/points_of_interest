import { writeFileSync } from "fs";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const poiController = {
  index: {
    handler: async function (request, h) {
      const poi = await db.poiStore.getPoiById(request.params.id);
      const viewData = {
        name: poi.name,
        category: poi.category,
        description: poi.description,
        latitude: poi.latitude,
        longitude: poi.longitude,
        poiId: request.params.id,
      };
      console.log(viewData);
      return h.view("poi_detail", viewData);
    },
  },

  newPoi: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      let url = "";
      try {
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          url = await imageStore.uploadImage(request.payload.imagefile);
        }
      } catch (err) {
        console.log(err);
      }
      console.log("here");
      const newPoi = {
        userid: loggedInUser._id,
        name: request.payload.name,
        category: request.payload.category,
        description: request.payload.description,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
        img: url,
      };
      await db.poiStore.addPoi(newPoi);
      return h.redirect("/dashboard");
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

  updatePoi: {
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
      await db.poiStore.updatePoi(request.payload.poiId, newPoi);
      return h.redirect("/dashboard");
    },
  },

  deletePoi: {
    handler: async function (request, h) {
      const poi = await db.poiStore.getPoiById(request.params.id);
      await db.poiStore.deletePoi(poi._id);
      return h.redirect("/dashboard");
    },
  },
};
