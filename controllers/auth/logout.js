const { User } = require("../../models/users");

const logout = async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204);
};

module.exports = logout;
