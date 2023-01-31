module.exports = {
  ensureAuth: function (req, res, next) {
    console.log("reached ensureAuth");
    console.log(req.user);
    if (req.isAuthenticated()) {
      console.log("user is authenticated");
      return next();
    } else {
      res.redirect("/");
    }
  },
  ensureGuest: function (req, res, next) {
    // console.log("reached ensureGuest");
    // console.log(req.user);
    if (req.isAuthenticated()) {
      //   console.log("Authentication Successfull");
      //   res.redirect("/auth/login/success");
      next();
    } else {
      return next();
    }
  },
};
