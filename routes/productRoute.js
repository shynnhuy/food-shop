const express = require("express");
const router = express.Router();

const ProductCrtl = require("../controllers/product");

const multer = require("multer");
const { route } = require("./authRoute");
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage, fileFilter: imageFilter });

route.post("/addImage", upload.single("image"), ProductCrtl.addImage);

router.post("/createCategory", ProductCrtl.CreateCategory);

module.exports = router;
