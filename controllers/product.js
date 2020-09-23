const cloudinary = require("cloudinary");

const Image = require("../models/Image");

module.exports = {
  async CreateCategory(req, res) {
    cloudinary.v2.uploader.upload(req.file.path, function (err, result) {
      if (err) {
        req.json(err.message);
      }
      req.body.image = result.secure_url;
      req.body.imageId = result.public_id;

      Image.create(req.body, function (err, image) {
        if (err) {
          return res.json(err.message);
        }
      });
    });
  },
};
