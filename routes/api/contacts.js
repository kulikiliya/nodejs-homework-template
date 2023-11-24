const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, authenticate } = require("../../middlewares");
const schema = require("../../schemas/contact");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validateBody(schema.addSchema),
  ctrlWrapper(ctrl.add)
);

router.delete("/:contactId", authenticate, ctrlWrapper(ctrl.deleteById));

router.put(
  "/:contactId",
  authenticate,
  validateBody(schema.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schema.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
