const express = require("express");
const ctrl = require("../../controllers/projects");
const { isValidId, authenticate, upload } = require("../../middlewares");

const router = express.Router();
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/projects");

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post(
  "/",
  upload.single("avatar"),
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.add
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

module.exports = router;
