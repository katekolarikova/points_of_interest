import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserSpec = Joi.object()
  .keys({
    name: Joi.string().example("Kathy Newman").required(),
    nickname: Joi.string().example("Kathy01").required(),
    email: Joi.string().email().example("kathy@example.com").required(),
    password: Joi.string().example("secret_password").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserSpecification");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");
