const express = require("express");
const ctrl = require("../../controllers/projects");
const { isValidId } = require("../../middlewares");

const router = express.Router();
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/projects");

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.put("/:id", isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.delete("/:id", isValidId, ctrl.deleteById);

module.exports = router;
