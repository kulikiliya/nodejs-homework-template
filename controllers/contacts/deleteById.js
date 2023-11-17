const { default: mongoose } = require("mongoose");
const { RequestError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

const deleteById = async (req, res) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw RequestError(404);
  }
  const result = await Contact.findByIdAndDelete(contactId);
  console.log(result);

  if (!result) {
    throw RequestError(404);
  }
  res.status(200).json({
    message: "Delete success",
  });
};

module.exports = deleteById;
