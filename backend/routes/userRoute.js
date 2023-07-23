const express = require("express");

const app = express();

app.use(express.json());

const userController = require("../controller/userController");
const auth = require(`../auth/auth`);
const { checkRole } = require("../middleware/checkRole");
require("dotenv/config");

const admin = process.env.EMAIL_ADMIN;

app.post("/login", userController.googleLogin);
app.post(
  "/add_user",
  auth.authVerify,
  checkRole([admin]),
  userController.addUser
);
app.delete(
  "/delete_user/:id",
  auth.authVerify,
  checkRole([admin]),
  userController.deleteUser
);
app.get("/getAll", auth.authVerify, checkRole([admin]), userController.getUser);
app.put(
  "/update_user/:id",
  auth.authVerify,
  checkRole([admin]),
  userController.updateUser
);

app.get("/find_user/:id", userController.findUser);

module.exports = app;
