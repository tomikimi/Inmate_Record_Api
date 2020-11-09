const config = require("config");
const cors = require("cors");
const auth = require("./routes/auth");
const user = require("./routes/users");
const inmate = require("./routes/inmates");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivate Key not defined");
  process.exit(1);
}

if (app.get("env") === "production") {
  console.log("Production ENV");
  mongoose
    .connect(
      "mongodb+srv://tomi1990:thankfulness1210@cluster0.1trmi.mongodb.net/police_app",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    )
    .then(() => console.log("Connection to Database Successfull..."))
    .catch((err) => console.error("Connection to Database failed"));
} else {
  mongoose
    .connect("mongodb://localhost/PoliceApp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Connection to Database Successfull..."))
    .catch((err) => console.error("Connection to Database failed"));
}

app.use(cors());
app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/inmate", inmate);
require("./startup/prod")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
