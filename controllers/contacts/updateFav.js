const { default: mongoose } = require("mongoose");
const { RequestError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw RequestError(404);
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw RequestError(404);
  }

  res.status(200).json(result);
};

module.exports = updateStatusContact;
