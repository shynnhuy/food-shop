require("dotenv").config();

const socketIO = require("socket.io");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.log(`Connect to MongoDB error: ${err.message}`);
});

mongoose.connection.once("open", () => {
  console.log(`Connected to MongoDB`);
});

require("./models/User");
require("./models/Role");
require("./models/Image");

const multer = require("multer");
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are accepted!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "nnyhsshop",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = require("./app");

const port = process.env.PORT;

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);
const io = socketIO(server);

io.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("sendMessage", function (msg) {
    console.log("message: " + msg);
    io.emit("newMsg", msg);
  });
  socket.on("disconnect", function () {
    console.log("User Disconnected");
  });
});
