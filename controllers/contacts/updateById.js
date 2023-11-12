const { RequestError } = require("../../helpers");
const { updateContact } = require("../../models/contacts");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    throw RequestError(404);
  }
  res.status(200).json(result);
};

module.exports = updateById;
