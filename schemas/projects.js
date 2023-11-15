const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  techs: Joi.string().required(),
  descr: Joi.string().required(),
});

module.exports = {
  addSchema,
};
