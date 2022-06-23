import { db } from "../models/db.js";
import fetch from "node-fetch";

async function getWeather() {
  const city = "Ostrava";
  const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=64e705f29005260c94ec18065bfc50f6&units=metric");
  const data = await response.text();
  return data;
}

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const weatherData = await getWeather();
      const WeatherJsonData = JSON.parse(weatherData);
      let description = WeatherJsonData["weather"][0]["description"];
      let temperature = WeatherJsonData["main"]["temp"];
      const loggedInUser = request.auth.credentials;
      const userspoisDb = await db.poiStore.getUserPois(loggedInUser._id);
      const poisDb = await db.poiStore.getAllPois();
      const viewData = {
        title: "Poi Dashboard",
        user_poi: userspoisDb,
        all_poi: poisDb,
        admin: loggedInUser.admin,
        weather_description: description,
        temperature: temperature,
        num_of_pois_user: userspoisDb.length,
        num_of_poi_total: poisDb.length,
        nickname: loggedInUser.nickname,
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
