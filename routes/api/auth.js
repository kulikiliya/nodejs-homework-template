const express = require("express");
const ctrl = require("../../controllers/auth");
const { validateBody, authenticate, upload } = require("../../middlewares");
const schema = require("../../schemas/user");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();

router.get(
  "/register",
  validateBody(schema.registerSchema),
  ctrlWrapper(ctrl.register)
);
router.get("/current", authenticate, ctrlWrapper(ctrl.current));

router.post(
  "/login",
  validateBody(schema.registerSchema),
  ctrlWrapper(ctrl.login)
);
router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));
router.patch(
  "/:id/subscription",
  authenticate,
  validateBody(schema.subscriptionSchema),
  ctrlWrapper(ctrl.subscription)
);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateImg)
);

module.exports = router;
