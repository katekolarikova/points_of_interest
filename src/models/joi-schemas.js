import Joi from "joi";
import Mongoose from "mongoose";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserLogin = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserLogin");

export const UserSpec = UserLogin.keys({
  name: Joi.string().example("Kathy Newman").required(),
  nickname: Joi.string().example("Kathy01").required(),
}).label("UserSpecification");

export const UserDbDetail = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDbDetail");

export const UserArray = Joi.array().items(UserDbDetail).label("UserArray");

export const PoiSpec = Joi.object()
  .keys({
    name: Joi.string().example("National Museum").required(),
    category: Joi.string().example("Culture").required(),
    description: Joi.string().example("Exposiions about history and traditions").required(),
    latitude: Joi.any().example(18.262524).required(), // any because mongo return new decimal type inspite of number
    longitude: Joi.any().example(49.820923).required(),
    img: Joi.string().example("http://url-image.com").allow("").allow(null),
  })
  .unknown(true)
  .label("InserPoiSpecification");

export const PoiSpecDb = PoiSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
  userid: IdSpec,
}).label("DbPoiSpecification");

export const PoiArray = Joi.array().items(PoiSpecDb).label("PoiArray");

export const DescriptionValidation = Joi.object()
  .keys({
    name: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    poiId: Joi.any(),
  })
  .label("UpdatePoiDescription");

export const CoordinationValidation = Joi.object()
  .keys({
    latitude: Joi.any().required(), // any because mongo return new decimal type inspite of number
    longitude: Joi.any().required(),
    poiId: Joi.any(),
  })
  .label("UpdatePoiLocation");
