const { getContactById } = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
  const id = req.params.contactId;
  const data = await getContactById(id);

  if (!data) {
    throw RequestError(404);
  }

  res.json(data);
};

module.exports = getById;
