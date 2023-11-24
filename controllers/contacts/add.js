const { RequestError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { email } = req.body;

  const contactEmail = await Contact.findOne({ email });

  if (contactEmail) {
    throw RequestError(400, "You already had this email");
  }

  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = add;
