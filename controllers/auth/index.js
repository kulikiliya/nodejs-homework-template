const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const subscription = require("./subscription");
const updateImg = require("./updateIMG");
const verifyUser = require("./verify");
const resendEmail = require("./resendVerify");
module.exports = {
  register,
  login,
  logout,
  current,
  subscription,
  updateImg,
  verifyUser,
  resendEmail,
};
