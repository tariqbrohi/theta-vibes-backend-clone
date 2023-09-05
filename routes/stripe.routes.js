const express = require("express");
const router = express.Router();
const authState = require("../middlewares/authState");
const stripeController = require("../controllers/stripe.controller");

// router.post(
//   "/create-bank-account-token",
//   stripeController.createBankAccountToken
// );

router.post(
  "/create-connect-account",
  authState.verifyTokenAndAttachUser,
  stripeController.createAccount
);

router.get(
  "/retrieve-connect-account",
  authState.verifyTokenAndAttachUser,
  stripeController.retrieveAccount
);
router.get("/retrieve-balance", stripeController.retrieveBalance);
router.post("/create-payment-intent", stripeController.createPaymentIntent);

router.post(
  "/create-price",
  authState.verifyTokenAndAttachUser,
  stripeController.createProductPriceId
);
router.post(
  "/create-checkout-session/:channelId",
  authState.verifyTokenAndAttachUser,
  stripeController.createCheckoutSession
);

// router.post("/create-customer", stripeController.createCustomer);

// router.post("/create-subscription", stripeController.createSubscription);

// createCheckoutSession

// createTransfer

// router.post("/create-transfer", stripeController.createTransfer);

// router.post(
//   "/create-subscription-for-connected-account",
//   stripeController.createSubscriptionForConnectedAccount
// );

// router.post("/retrieve-subscription", stripeController.retrieveSubscription);

// router.post("/create-transfer", stripeController.createTransfer);

module.exports = router;
