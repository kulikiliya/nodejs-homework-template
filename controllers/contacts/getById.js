// const contacts = require("../../models/contacts");
// // const { getContactById } = require("../../models/contacts");
const { Contact } = require("../../models/contacts");
const { RequestError } = require("../../helpers");
const mongoose = require("mongoose");

const getById = async (req, res) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw RequestError(404);
  }

  const data = await Contact.findById(contactId);

  if (!data) {
    throw RequestError(404);
  }

  res.json(data);
};

module.exports = getById;
