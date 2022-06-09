import Joi from "joi";

export const UserSpec = {
  nickname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};
