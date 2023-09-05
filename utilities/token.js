const jwt = require("jsonwebtoken");

let validFor = "7d";
module.exports = {
  signToken: (body, key) => jwt.sign({ ...body }, key, { expiresIn: validFor }),
  verify: (token, key) => jwt.verify(token, key),
  decode: (token) => jwt.decode(token),
  getTokenFromHeareds: (headers) =>
    headers.authorization ? headers.authorization.split(" ")[1] : null,
};
