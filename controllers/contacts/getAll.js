const { Contact } = require("../../models/contacts");

// ======= With Owner =======

// const getAll = async (req, res) => {
//   const { _id: owner } = req.user;
//   console.log(req.user);
//   const data = await Contact.find({ owner }, "-createdAt -updatedAt").populate(
//     "owner",
//     "email"
//   );

//   res.json(data);
// };

//  ======== With pagination and favorite =======

const getAll = async (req, res) => {
  const favorite = req.query.favorite;
  const filter = {};

  if (favorite !== undefined) {
    filter.favorite = favorite;
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const options = {
    page,
    limit,
    sort: { author: 1 },
  };

  const query = Contact.find(filter);
  console.log(query);

  const result = await Contact.paginate(query, options);
  res.json(result);
};

module.exports = getAll;
