const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Stripe = require("stripe");
const stripe = Stripe("sk_test_51MvMfiBZ5fUImXoSutLHdt46oMZNPDk4NwJfoyHRzItR1iiCz8yFMWRaYggVUooiLO6dpnV5GnfdrZGYQDQe38wf00MdSJcy4w")

const createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency, 
    },);

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createPaymentIntent,
};
