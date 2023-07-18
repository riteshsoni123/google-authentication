require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const session = require("express-session");
// const cookieSession = require("cookie-session");
// const passportStrategy = require("./passport");
const connectDB = require("./config/db");
const passportStrategy = require("./config/passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

connectDB();

const app = express();
app.use(express.json());

// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["cyberwolve"],
//     maxAge: 24 * 60 * 60 * 100,
//   })
// );

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 24 * 60 * 60 * 100,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// const Cors = require("cors");
// app.use(Cors());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
