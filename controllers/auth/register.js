const bcrypt = require("bcrypt");

const { User } = require("../../models/users");

const { RequestError } = require("../../helpers");

const register = async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email already used");
  }
  const hashPassword = await bcrypt.hash(password, 5);
  const result = await User.create({ email, password: hashPassword });
  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = register;
