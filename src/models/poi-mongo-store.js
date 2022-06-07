import { Poi } from "./poi.js";

export const poiMongoStore = {
  async getAllPois() {
    const pois = await Poi.find().lean();
    return pois;
  },

  async getPoiById(id) {
    if (id) {
      const poi = await Poi.findOne({ _id: id }).lean();
      return poi;
    }
    return null;
  },

  async addPoi(poi) {
    const newPoi = new Poi(poi);
    const poiObj = await newPoi.save();
    const p = await this.getPoiById(poiObj._id);
    return p;
  },

  async getUserPois(id) {
    const pois = await Poi.find({ userid: id }).lean();
    return pois;
  },

  async deletePoi(id) {
    try {
      await Poi.deleteOne({ _id: id });
    } catch (error) {
      console.log("something went wrong, poi wasnt deleted");
    }
  },

  async updatePoi(id, poi) {
    try {
      await Poi.updateOne({ _id: id }, poi, { upsert: true });
    } catch (error) {
      console.log("something went wrong, poi wasnt updated");
    }
  },
};
