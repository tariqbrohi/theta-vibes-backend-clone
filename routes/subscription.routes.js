const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscription.controller");
const authState = require("../middlewares/authState");

router.post(
  "/subscribe/:channelId",
  authState.verifyTokenAndAttachUser,
  subscriptionController.createSubscription
);

// for admin
router.get(
  "/subscriptions",
  authState.verifyTokenAndAttachUser,
  subscriptionController.getSubscriptions
);

// router.get(
//   "/subscription/:id",
//   authState.verifyTokenAndAttachUser,
//   subscriptionController.getSubscriptionById
// );

// router.get(
//   "/subscription",
//   authState.verifyTokenAndAttachUser,
//   subscriptionController.getSubscriptionByUserId
// );

router.get(
  "/subscription/:channelId",
  authState.verifyTokenAndAttachUser,
  subscriptionController.getSubscriptionByUserIdAndChannelId
);

router.get(
  "/subscriptions/:channelId",
  authState.verifyTokenAndAttachUser,
  subscriptionController.getSubscriptionsByChannelId
);

router.delete(
  "/unsubscribe/:channelId",
  authState.verifyTokenAndAttachUser,
  subscriptionController.unSubscribe
);

module.exports = router;
