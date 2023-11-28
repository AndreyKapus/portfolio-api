const express = require("express");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/users");
const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.registerSchema), ctrl.login);

module.exports = router;
