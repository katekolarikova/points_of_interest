import axios from "axios";

import { serviceUrl } from "../fixtures.js";

// axios - knihovna pro realizaci http requestu

export const poiService = {
  poiUrl: serviceUrl,

  // USERS
  async addUser(user) {
    const res = await axios.post(`${this.poiUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.poiUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.poiUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.poiUrl}/api/users`);
    return res.data;
  },

  // delte one user
  async deleteOneUser(id) {
    const res = await axios.delete(`${this.poiUrl}/api/users/${id}`);
    return res.data;
  },

  // POIS
  async addPoi(poi) {
    const res = await axios.post(`${this.poiUrl}/api/pois`, poi);
    return res.data;
  },

  async getPoi(id) {
    const res = await axios.get(`${this.poiUrl}/api/pois/${id}`);
    return res.data;
  },

  async getAllPois() {
    const res = await axios.get(`${this.poiUrl}/api/pois`);
    return res.data;
  },

  async deleteAllPois() {
    const res = await axios.delete(`${this.poiUrl}/api/pois`);
    return res.data;
  },

  // delte one user
  async deleteOnePoi(id) {
    const res = await axios.delete(`${this.poiUrl}/api/pois/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.poiUrl}/api/users/authenticate`, user); // access the endpoint
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token; // set header of the token
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};
