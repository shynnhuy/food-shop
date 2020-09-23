const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  displayName: { type: String },
  email: { type: String },
  password: { type: String },
  gender: { type: String, enum: ["male", "female", "neutral"] },
  age: Number,
  photoUrl: String,
  address: String,
  roles: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "roleSchema" }],
    default: ["5f60c199250e7815402d6c8c"],
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { id: this._id, roles: this.roles },
    process.env.SECRET_JWT,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

module.exports = mongoose.model("User", userSchema);
