const STATUS = require("../constant/status.constant");
const {
  createBankAccountToken,
} = require("../utilities/createBankAccountToken");
const fiatRepository = require("../repositories/fiat.repository");
const channelRepository = require("../repositories/channel.respository");
const userRepository = require("../repositories/user.respository");
const subscriptionRepository = require("../repositories/subscription.repository");

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

module.exports = {
  // createBankAccountToken: async (req, res) => {
  //   try {
  //     const token = await stripe.tokens.create({
  //       bank_account: {
  //         country: "US",
  //         currency: "usd",
  //         account_holder_name: "Test User",
  //         account_holder_type: "individual",
  //         routing_number: "110000000", // Stripe test routing number
  //         account_number: "000123456789", // Stripe test account number
  //       },
  //     });
  //     res.status(200).json({ token: token.id });
  //   } catch (error) {
  //     console.error("Error creating bank account token:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // },

  createAccount: async (req, res) => {
    try {
      const userId = req.user.id;
      const bankAccountDetails = {
        country: req.body.isoCode,
        currency: req.body.currency,
        account_holder_name: req.body.accountHolderName,
        account_holder_type: req.body.accountHolderType,
        routing_number: req.body.routingNumber, // Stripe test routing number
        account_number: req.body.accountNumber, // Stripe test account number
      };

      const channel = await channelRepository.getChannelByUserId(userId);

      const findFait = await fiatRepository.getFiatByChannelId(channel.id);
      if (findFait) {
        return res
          .status(STATUS.CONFLICT)
          .json({ message: "Account already existed" });
      }

      // Call the function to create a bank account token
      const bankAccountId = await createBankAccountToken(bankAccountDetails);

      const account = await stripe.accounts.create({
        type: "standard", // Change this to 'express' or 'custom' based on your needs
        external_account: bankAccountId, // Attach the bank account token to the account
      });

      console.log("Stripe Connect Account created:", account.id);
      const fait = await fiatRepository.createFiat({
        channelId: channel.id,
        connectAccountId: account.id,
      });

      res.json({ message: "Stripe Connect Account created:", account });
    } catch (err) {
      console.error("Error creating Stripe Connect Account:", err);
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  },

  retrieveAccount: async (req, res) => {
    try {
      const userId = req.user.id;
      const channel = await channelRepository.getChannelByUserId(userId);

      const findFait = await fiatRepository.getFiatByChannelId(channel.id);
      if (!findFait) {
        return res
          .status(STATUS.CONFLICT)
          .json({ message: "Account not existed" });
      }

      const account = await stripe.accounts.retrieve(findFait.connectAccountId);
      console.log("Stripe Connect Account retrieved:", account.id);
      res.json({
        message: "Stripe Connect Account retrieved:",
        account: account.id,
      });
    } catch (err) {
      console.error("Error retrieving Stripe Connect Account:", err);
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  },

  retrieveBalance: async (req, res) => {
    try {
      const balance = await stripe.balance.retrieve({
        stripeAccount: req.body.accountId,
      });

      console.log("Stripe Connect Balance retrieved:", balance);
      res.json({
        message: "Stripe Connect Balance retrieved:",
        accountBalance: balance,
      });
    } catch (err) {
      console.error("Error retrieving Stripe Connect Balance:", err);
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  },

  createPaymentIntent: async (req, res) => {
    try {
      const { amount, currency, accountId, channelId } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: currency,
        metadata: {
          userId: req.user.id,
          channelId: channelId,
        },
        // payment_method: paymentMethodId,
        transfer_data: {
          destination: accountId,
        },
      });

      res
        .status(STATUS.SUCCESS)
        .json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  },

  createCheckoutSession: async (req, res) => {
    try {
      const { channelId } = req.params;
      const channel = await channelRepository.getChannelById(channelId);
      const findFait = await fiatRepository.getFiatByChannelId(channel.id);

      console.log(findFait, "findFait");

      if (!findFait) {
        return res
          .status(STATUS.CONFLICT)
          .json({ message: "Account not existed" });
      }

      if (!findFait.priceId === 0 || !findFait.priceId) {
        return res
          .status(STATUS.CONFLICT)
          .json({ message: "Product price not existed" });
      }

      // logged in user
      const userId = req.user.id;
      const user = await userRepository.getUserById(userId);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription", // Set the mode to "subscription" for recurring payments
        line_items: [
          {
            price: findFait.priceId,
            quantity: 1,
          },
        ],
        metadata: {
          userId,
          channelId: channelId,
          accountId: findFait.connectAccountId,
        },
        customer_email: user.email,
        client_reference_id: userId,

        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
      });

      res
        .status(STATUS.SUCCESS)
        .json({ message: "Checkout session created", sessionUrl: session.url });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  },

  createProductPriceId: async (req, res) => {
    try {
      const userId = req.user.id;

      const product = await stripe.products.create({
        name: req.body.name,
        type: "service",
      });

      const price = await stripe.prices.create({
        unit_amount: req.body.unitAmount * 100,
        currency: req.body.currency,
        recurring: {
          interval: req.body.interval,
        },
        product: product.id,
      });

      const user = await userRepository.getUserById(userId);
      const channel = await channelRepository.getChannelByUserId(userId);
      const findFait = await fiatRepository.getFiatByChannelId(channel.id);

      if (!findFait) {
        return res
          .status(STATUS.CONFLICT)
          .json({ message: "Account not existed" });
      }

      const updateFait = await fiatRepository.updateFiatById(findFait.id, {
        priceId: price.id,
      });

      console.log(updateFait, "updateFait");

      res
        .status(STATUS.SUCCESS)
        .json({ message: "Product price created", priceId: price.id });
    } catch (error) {
      console.error("Error creating subscription:", error);
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  },

  webhook: async (request, response) => {
    console.log("hit");

    let event;
    const signature = request.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(err);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "charge.succeeded":
        const chargeSuccess = event.data.object;
        console.log(chargeSuccess, "chargeSuccess");
        break;
      case "invoice.upcoming":
        const invoiceUpcoming = event.data.object;
        console.log(invoiceUpcoming, "invoiceUpcoming");
        break;
      case "charge.captured":
        const chargeCaptured = event.data.object;
        console.log(chargeCaptured, "chargeCaptured");
        break;
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        console.log(checkoutSessionCompleted, "checkoutSessionCompleted");

        // metadata
        // console.log(checkoutSessionCompleted.metadata, "metadata");
        // console.log(Date.now(), "Date.now()");
        // console.log(checkoutSessionCompleted.metadata.userId, "userId");
        // console.log(checkoutSessionCompleted.metadata.channelId, "channelId");
        // console.log(checkoutSessionCompleted.status, "status");
        // console.log(checkoutSessionCompleted.subscription, "subscription");

        const subscription = await subscriptionRepository.createSubscription({
          subscriptionId: checkoutSessionCompleted.subscription,
          subscriptionDate: checkoutSessionCompleted.created,
          userId: Number(checkoutSessionCompleted.metadata.userId),
          channelId: Number(checkoutSessionCompleted.metadata.channelId),
          status: checkoutSessionCompleted.status,
          // accountId: checkoutSessionCompleted.metadata.accountId,
        });

        console.log(subscription, "subscription");

        break;
      case "payment_intent.created":
        const paymentIntentCreated = event.data.object;
        console.log(paymentIntentCreated, "paymentIntentCreated");
        break;
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;

        console.log(paymentIntentSucceeded, "paymentIntentSucceeded");
        break;

      case "customer.subscription.created":
        const subscriptionCreated = event.data.object;

        console.log(subscriptionCreated, "subscriptionCreated");

        console.log(subscriptionCreated.metadata, "metadata");

        break;

      case "invoice.payment_succeeded":
        const invoicePaymentSucceeded = event.data.object;

        console.log(invoicePaymentSucceeded, "invoicePaymentSucceeded");

        break;
      case "customer.subscription.updated":
        const subscriptionScheduleUpdated = event.data.object;
        console.log(subscriptionScheduleUpdated, "subscriptionScheduleUpdated");

        const findSubscription =
          await subscriptionRepository.getSubscriptionBySubscriptionId(
            subscriptionScheduleUpdated.id
          );

        console.log(findSubscription, "findSubscription");

        const subscriptionUpdated =
          await subscriptionRepository.updateSubscriptionById(
            findSubscription.id,
            {
              status: subscriptionScheduleUpdated.status,
            }
          );

        console.log(subscriptionUpdated, "subscriptionUpdated");

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.status(200).json({ received: true });
  },
};
// createSubscription: async (req, res) => {
//   try {
//     const { priceId } = req.body;
//     const customer = await stripe.customers.create({
//       email: "ilyasdev3@gmail.com",
//     });

//     const subscription = await stripe.subscriptions.create({
//       customer: customer.id,
//       items: [{ price: priceId }],
//     });

//     res.status(STATUS.SUCCESS).json({ subscriptionId: subscription.id });
//   } catch (error) {
//     console.error("Error creating subscription:", error);
//     res
//       .status(STATUS.INTERNAL_SERVER_ERROR)
//       .json({ error: "Internal Server Error" });
//   }
// },
