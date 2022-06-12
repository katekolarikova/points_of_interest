import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, PoiSpec, PoiArray, PoiSpecDb } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const poiApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const pois = await db.poiStore.getAllPois();
        return pois;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all Pois",
    notes: "Returns details of all Pois",
    response: { schema: PoiArray, failAction: validationError },
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const poi = await db.poiStore.getPoiById(request.params.id);
        if (!poi) {
          return Boom.notFound("No Poi with this id");
        }
        return poi;
      } catch (err) {
        return Boom.serverUnavailable("No Poi with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific poi",
    notes: "Return details of specific poi",
    response: { schema: PoiSpecDb, failAction: validationError },
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        console.log("toto je poi");
        console.log(request.payload);
        console.log(typeof request.payload.latitude);
        const poi = await db.poiStore.addPoi(request.payload);
        console.log("pridano");
        console.log(typeof poi.latitude);
        if (poi) {
          return h.response(poi).code(201);
        }
        return Boom.badImplementation("error creating poi");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create new Poi",
    notes: "Add new poi into database",
    validate: { payload: PoiSpec, failAction: validationError },
    response: { schema: PoiSpecDb, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.poiStore.deleteAllPoi();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete All Pois",
    notes: "Deletes pois from db",
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const poi = await db.poiStore.getPoiById(request.params.id);
        if (!poi) {
          return Boom.notFound("No Poi with this id");
        }
        await db.poiStore.deletePoi(request.params.id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Poi with this id");
      }
    },
    tags: ["api"],
    description: "Delete Poi",
    notes: "Deletes one specific poi from db",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
