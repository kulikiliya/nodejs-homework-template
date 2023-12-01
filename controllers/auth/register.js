const bcrypt = require("bcrypt");
const gravatr = require("gravatar");
const { User } = require("../../models/users");

const { RequestError } = require("../../helpers");

const register = async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email already used");
  }

  // хэш пароля
  const hashPassword = await bcrypt.hash(password, 5);
  // дефолтная аватарка
  const avatarURL = gravatr.url(email);
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
    avatarURL: result.avatarURL,
  });
};

module.exports = register;
