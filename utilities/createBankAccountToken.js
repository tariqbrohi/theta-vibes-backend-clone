const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// Function to create a bank account token
async function createBankAccountToken(bankAccountDetails) {
  try {
    const token = await stripe.tokens.create({
      bank_account: bankAccountDetails,
    });

    return token.id;
  } catch (error) {
    console.error("Error creating bank account token:", error);
    throw error;
  }
}

module.exports = { createBankAccountToken };
