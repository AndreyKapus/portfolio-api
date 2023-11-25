const Joi = require("joi");

const addSchema = Joi.object({
  img: Joi.string().required(),
  name: Joi.string().required(),
  techs: Joi.string().required(),
  descr: Joi.string().required(),
  team: Joi.boolean(),
});

module.exports = {
  addSchema,
};
