const express = require("express");

const app = express();

app.use(express.json());

const musicController = require("../controller/musicController");
const auth = require(`../auth/auth`);

const { checkRole } = require("../middleware/checkRole");
require("dotenv/config");

const admin = process.env.EMAIL_ADMIN;

app.post("/add_comment", auth.authVerify, musicController.addReview);
app.get("/getAll", musicController.getMusicRev);
app.get("/find_musReview/:id", musicController.findMusicRev);
app.put(
  "/update_musReview/:id",
  auth.authVerify,
  checkRole([admin]),
  musicController.updateMusicRev
);
app.post("/checkReview", musicController.checkReview);
app.delete(
  "/delete_musReview/:id",
  auth.authVerify,
  checkRole([admin]),
  musicController.deleteMusicRev
);
app.post("/findByMusicId", musicController.getMusicRevById);
app.post("/findByUserId", musicController.getMusicRevByIdUser);

module.exports = app;
