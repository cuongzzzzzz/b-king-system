const express = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../utils");
const {
  authentication,
} = require("../../middleware/authentication.middleware");

const router = express.Router();

router.post("/login", asyncHandler(accessController.login));

router.post("/logout", authentication, asyncHandler(accessController.logOut));

router.post("/register", asyncHandler(accessController.register));
router.post(
  "/refreshtoken",
  authentication,
  asyncHandler(accessController.handleRefreshToken)
);

module.exports = router;
