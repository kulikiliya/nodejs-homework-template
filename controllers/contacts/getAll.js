const { Contact } = require("../../models/contacts");

const getAll = async (req, res) => {
  const data = await Contact.find();
  res.json(data);
};

module.exports = getAll;
