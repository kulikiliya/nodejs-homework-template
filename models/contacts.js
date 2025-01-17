const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },

  { versionKey: false, timestamps: true }
);

const handleSaveErrors = (error, data, next) => {
  const { name, code } = error;
  console.log(name, code);
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
};

contactSchema.post("save", handleSaveErrors);
contactSchema.plugin(mongoosePaginate);

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
};
