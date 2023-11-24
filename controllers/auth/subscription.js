const { RequestError } = require("../../helpers");
const { User } = require("../../models/users");
const { default: mongoose } = require("mongoose");

const subscription = async (req, res) => {
  const { id } = req.params;
  const { subscription } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw RequestError(404);
  }

  const user = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );

  if (!user) {
    throw RequestError(404);
  }

  res.json(user);
};

module.exports = subscription;
