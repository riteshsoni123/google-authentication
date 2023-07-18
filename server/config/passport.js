const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const UserService = require("../models/user");
const User = require("../models/user/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    // function (accessToken, refreshToken, profile, callback) {
    //   callback(null, profile);
    // }
    async (accessToken, refreshToken, profile, done) => {
      // console.log(accessToken, refreshToken);
      const id = profile.id;
      const email = profile.emails[0].value;
      const username = profile.name.givenName;
      const image = profile.photos[0].value;
      const source = "google";

      const currentUser = await UserService.getUserByEmail({ email });

      // console.log("hello", currentUser);

      if (!currentUser) {
        const newUser = await UserService.addGoogleUser({
          id,
          email,
          username,
          image,
        });
        return done(null, newUser);
      }

      if (currentUser.source != "google") {
        return done(null, false, {
          message: `You previously signed up with a different signin method`,
        });
      }

      currentUser.lastVisited = new Date();
      return done(null, currentUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const currentUser = await User.findOne({ id });
  done(null, currentUser);
});
