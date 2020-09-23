const Joi = require("joi");
const HttpStatus = require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const mongoose = require("mongoose");
const User = mongoose.model("User");
const Role = mongoose.model("Role");
const Helper = require("../helpers");

const _ = require("lodash");

dotenv.config();

module.exports = {
  async GetRoles(req, res) {
    const roles = await Role.find();
    if (roles.length) {
      res
        .status(HttpStatus.OK)
        .json(_.zipObject(_.map(roles, "roleName"), _.map(roles, "_id")));
    }
  },

  async CreateRole(req, res) {
    const schema = Joi.object({
      roleName: Joi.string().min(3).required(),
    });
    const { error, value } = schema.validate(req.body);

    if (error && error.details) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.details });
    }

    const roleExists = await Role.findOne({
      roleName: Helper.firstUpper(req.body["roleName"]),
    });
    if (roleExists) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ message: "Role already exists" });
    }

    const newRole = new Role({
      roleName: Helper.firstUpper(value.roleName),
    });

    newRole
      .save()
      .then((role) => {
        res.status(HttpStatus.CREATED).json({
          message: "Role created successfully",
          role,
        });
      })
      .catch((err) =>
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Something error + " + err })
      );
  },

  async Register(req, res) {
    const schema = Joi.object({
      displayName: Joi.string().alphanum().min(4).max(16).required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "org"] },
        })
        .required(),
      gender: Joi.string().valid("male", "female", "neutral"),
      age: Joi.number().min(14),
      photoUrl: Joi.string(),
      address: Joi.string(),
    });

    const { error, value } = schema.validate(req.body);

    if (error && error.details) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.details });
    }

    const user = await User.findOne({
      email: Helper.lowerCase(req.body.email),
    });
    if (user) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ message: "Email already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(value.password, salt);
    if (!hash) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Error hashing password" });
    }

    const newUser = new User({
      displayName: Helper.firstUpper(value.displayName),
      email: Helper.lowerCase(value.email),
      gender: value.gender,
      age: value.age,
      address: value.address,
      password: hash,
    });

    const userDoc = await newUser.save();
    if (!userDoc) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something error + " + err });
    }

    res.status(HttpStatus.CREATED).json({
      message: `User [${userDoc.displayName}] created successfully`,
      id: userDoc._id,
    });
    // const token = newUser.generateAuthToken();
  },

  async Login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "No empty fields allowed",
      });
    }

    const user = await User.findOne({
      email: Helper.lowerCase(email),
    });
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "Email isn't exists" });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Password is incorrect",
      });

    const token = user.generateAuthToken();

    return res.status(HttpStatus.OK).json({
      token,
      user: _.omit(user.toObject(), ["password"]),
    });
  },

  async CheckToken(req, res) {
    const { authorization } = req.headers;
    try {
      if (!authorization) return res.json(false);
      const token = authorization.split(" ")[1];
      if (!token) return res.json(false);

      const verified = jwt.verify(token, process.env.SECRET_JWT);
      if (!verified) return res.json(false);

      const user = await User.findById(verified.id);
      if (!user) return res.json(false);

      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async GetUserData(req, res) {
    const user = await User.findById(req.user.id);
    const userDoc = user.toObject();
    if (user) {
      res.status(HttpStatus.OK).json({
        token: req.token,
        user: _.omit(user.toObject(), ["password"]),
      });
    }
  },

  async GetAllUsers(req, res) {
    const users = await User.find();
    // console.log(_.omit(users, ["password"]));
    res.status(HttpStatus.OK).json(users);
  },
};
