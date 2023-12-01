// const { RequestError } = require("../../helpers");
const { User } = require("../../models/users");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const imgDir = path.join(__dirname, "../../public/avatars");

const updateImg = async (req, res) => {
  // достаем нужную инфу
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  // Jimp
  const updatedImg = await Jimp.read(tempUpload)
    .then((img) => {
      return img.resize(250, 250);
    })
    .catch((e) => {
      console.log(e);
    });

  await updatedImg.writeAsync(tempUpload);

  // готовим новое название для нашего файла
  const extension = originalname.split(".").pop();
  const filename = `${_id}.${extension}`;
  // новый путь для нашего файла
  const resultUpload = path.join(imgDir, filename);
  // перемещаем
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  // обновляем БД
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL: avatarURL,
  });
};

module.exports = updateImg;
