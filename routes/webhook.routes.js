const express = require("express");
const router = express.Router();
// const authState = require("../middlewares/authState");
const stripeController = require("../controllers/stripe.controller");

router.post(
  "/payment-intent",
  express.raw({ type: "application/json" }),
  stripeController.webhook
);

module.exports = router;
