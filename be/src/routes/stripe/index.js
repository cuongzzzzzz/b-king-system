const express = require("express");
const { } = require("../../controllers/stripe.controller");
const { asyncHandler } = require("../../utils");
const stripeController = require("../../controllers/stripe.controller");
const { createpaymentIntent, webhookHandleResponse } = require("../../services/stripe.service");

const router = express.Router();

router.post(
  "/create-payment-intent",
  (req, res) => {
    asyncHandler(createpaymentIntent(req, res))
  })


router.post(
  "/webhook",
  express.raw({ type: 'application/json' }),
  (req, res) => asyncHandler(webhookHandleResponse(req, res))
);

module.exports = router;
