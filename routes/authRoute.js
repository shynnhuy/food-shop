const express = require("express");
const router = express.Router();

const AuthCrtl = require("../controllers/auth");

const checkAuth = require("../middlewares/checkAuth");

router.post("/register", AuthCrtl.Register);
router.post("/login", AuthCrtl.Login);
router.post("/checkToken", AuthCrtl.CheckToken);
router.get("/userData", checkAuth, AuthCrtl.GetUserData);
router.get("/roles", AuthCrtl.GetRoles);
router.post("/createRole", checkAuth, AuthCrtl.CreateRole);
router.get("/users", AuthCrtl.GetAllUsers);

module.exports = router;
