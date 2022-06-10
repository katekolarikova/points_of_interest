import Mongoose from "mongoose";

export const testUserJohn = {
  name: "John Newman",
  nickname: "Johhy01",
  email: "john@test.com",
  password: "pass123",
};

export const testUsers = [
  {
    name: "Leonardo di Caprio",
    nickname: "CaptainJack",
    email: "leo@test.com",
    password: "pirate",
  },
  {
    name: "Alvaro Soler",
    nickname: "SpanishGuy",
    email: "alvaro@test.com",
    password: "sofia",
  },
  {
    name: "Alecia Moore",
    nickname: "Pink",
    email: "pink@test.com",
    password: "just_give_me_a_reason",
  },
];

export const testPoiCinema = {
  name: "Cinema",
  category: "Culture",
  description: "movie nights together",
  img: "path to the image",
  latitude: 1.1,
  longitude: 1.1,
};

export const testPois = [
  {
    name: "Museum",
    category: "Culture",
    description: "something for culture lover...",
    img: "path to the image",
    latitude: 1.2,
    longitude: 1.2,
  },
  {
    name: "Zoo",
    category: "Animals",
    description: "exotic space in the city",
    img: "path to the image",
    latitude: 1.3,
    longitude: 1.3,
  },
  {
    name: "Castle",
    category: "History",
    description: "old stone building",
    img: "path to the image",
    latitude: 1.4,
    longitude: 1.4,
  },
];
