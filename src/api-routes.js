import { userApi } from "./api/users-api.js";
import { poiApi } from "./api/poi-api.js";

export const apiRoutes = [
  // user API routes
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne },

  // poi API routes
  { method: "GET", path: "/api/pois", config: poiApi.find },
  { method: "POST", path: "/api/pois", config: poiApi.create },
  { method: "DELETE", path: "/api/pois", config: poiApi.deleteAll },
  { method: "GET", path: "/api/pois/{id}", config: poiApi.findOne },
  { method: "DELETE", path: "/api/pois/{id}", config: poiApi.deleteOne },

  // autentication
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
];
