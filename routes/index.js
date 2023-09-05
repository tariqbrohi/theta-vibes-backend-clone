const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const channelRoutes = require("./channel.routes");
const commentRoutes = require("./comment.routes");
const mediaRoutes = require("./media.routes");
const notificationRoutes = require("./notification.routes");
const paymentRoutes = require("./payment.routes");
const userRoutes = require("./user.routes");

router.use("/auth", authRoutes);
router.use("/channel", channelRoutes);
router.use("/comment", commentRoutes);
router.use("/media", mediaRoutes);
router.use("/notification", notificationRoutes);
router.use("/payment", paymentRoutes);
router.use("/user", userRoutes);
// router.use('/webhook', webhookRoutes)

module.exports = router;
