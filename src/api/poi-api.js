import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, UserArray, UserSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const poiApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const users = await db.poiStore.getAllPois();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all Pois",
    notes: "Returns details of all Pois",
    // response: { schema: UserArray, failAction: validationError },
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.poiStore.getPoiById(request.params.id);
        if (!user) {
          return Boom.notFound("No Poi with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No Poi with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific poi",
    notes: "Return details of specific poi",
    // response: { schema: UserSpec, failAction: validationError },
    // validate: { params: { id: IdSpec }, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.poiStore.addPoi(request.payload);
        if (user) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create new Poi",
    notes: "Add new poi into database",
    // validate: { payload: UserSpec, failAction: validationError },
    // response: { schema: UserSpec, failAction: validationError },
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
