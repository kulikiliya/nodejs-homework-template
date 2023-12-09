const sgEmail = require("@sendgrid/mail");
require("dotenv").config();

const { SG_HOST_TEST } = process.env;
sgEmail.setApiKey(SG_HOST_TEST);

const sendEmailSG = async (data) => {
  const mail = { ...data, from: "kulik.illia59@gmail.com" };
  await sgEmail.send(mail);
  return true;
};

module.exports = sendEmailSG;
