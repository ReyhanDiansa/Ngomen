const express = require('express')

const app = express()

app.use(express.json())

const filmController = require("../controller/filmController");
const auth = require(`../auth/auth`)
require("dotenv/config");

const { checkRole } = require("../middleware/checkRole");

const admin = process.env.EMAIL_ADMIN

app.post("/add_comment", auth.authVerify, filmController.addReview)
app.get("/getAll", filmController.getMovieRev)
app.get("/find_movReview/:id", filmController.findMovieRev)
app.put("/update_filmReview/:id", auth.authVerify, checkRole([admin]), filmController.updateFilmRev)
app.delete("/delete_filmReview/:id", auth.authVerify,  checkRole([admin]), filmController.deleteMovieRev)
app.post("/checkReview",  filmController.checkReview)
app.post("/findByMovieId",  filmController.getMovieRevById)
app.post("/findByUserId",  filmController.getMovieRevByIdUser)





module.exports=app