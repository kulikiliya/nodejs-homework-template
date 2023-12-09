const bcrypt = require("bcrypt");
const gravatr = require("gravatar");
const { User } = require("../../models/users");
const { nanoid } = require("nanoid");

const { RequestError, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

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
  // token for SG
  const verificationToken = nanoid();

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify you email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
    avatarURL: result.avatarURL,
  });
};

module.exports = register;
