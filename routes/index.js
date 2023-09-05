const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const channelRoutes = require("./channel.routes");
const commentRoutes = require("./comment.routes");
const likeRoutes = require("./like.routes");
const subscriptionRoutes = require("./subscription.routes");
const smartContractRoutes = require("./contract.routes");
const categoryRoutes = require("./category.routes");

const mediaRoutes = require("./media.routes");
const notificationRoutes = require("./notification.routes");
const paymentRoutes = require("./payment.routes");
const userRoutes = require("./user.routes");
const stripeRoutes = require("./stripe.routes");
//
const chatRoutes = require("./channel.routes");
//

router.use("/auth", authRoutes);
router.use("/channel", channelRoutes);
router.use("/comment", commentRoutes);
router.use("/like", likeRoutes);
router.use("/contract", smartContractRoutes);
router.use("/subscription", subscriptionRoutes);
router.use("/media", mediaRoutes);
router.use("/notification", notificationRoutes);
router.use("/payment", paymentRoutes);
router.use("/user", userRoutes);
router.use("/stripe", stripeRoutes);
router.use("/category", categoryRoutes);
//
router.use("/chat", chatRoutes);
//

module.exports = router;
