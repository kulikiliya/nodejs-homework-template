const { RequestError } = require("../../helpers");
const { removeContact } = require("../../models/contacts");

const deleteById = async (req, res) => {
  console.log(req.params);
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw RequestError(404);
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = deleteById;
