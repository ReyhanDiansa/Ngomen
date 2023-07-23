const express = require("express");
const mongoose = require("mongoose");
const userRoute = require(`./routes/userRoute`);
const filmRevRoute = require(`./routes/filmRevRoute`);
const musicRevRoute = require(`./routes/musicRevRoute`);
const cors = require("cors");
require("dotenv/config");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(`/user`, userRoute);
app.use(`/filmRev`, filmRevRoute);
app.use(`/musicRev`, musicRevRoute);
app.use(express.static(__dirname));

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Node API is Running in port ${process.env.PORT}`);
    });
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
