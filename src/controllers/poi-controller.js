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

  updatePoiDescription: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPoi = {
        // userid: loggedInUser._id,
        name: request.payload.name,
        category: request.payload.category,
        description: request.payload.description,
      };
      await db.poiStore.updatePoi(request.payload.poiId, newPoi);
      return h.redirect("/dashboard");
    },
  },

  updatePoiLocation: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const poi = db.poiStore.getPoiById(request.payload.poiId);
      const newPoi = {
        // userid: loggedInUser._id,
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

  updatePoiImage: {
    handler: async function (request, h) {
      try {
        const file = request.payload.imagefile;
        const poi = await db.poiStore.getPoiById(request.payload.poiId);
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);

          if (poi.img.length > 0) {
            const parseUrl = poi.img.split("/");
            const filename = parseUrl[parseUrl.length - 1];
            const parseFilename = filename.split(".");
            await imageStore.deleteImage(parseFilename[0]);
          }
          const newPoi = {
            img: url,
          };
          await db.poiStore.updatePoi(request.payload.poiId, newPoi);
        }
        return h.redirect("/dashboard");
      } catch (err) {
        console.log(err);
        return h.redirect("/dashboard");
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};
