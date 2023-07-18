const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user/user.model");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// router.get("/login/success", ensureGuest, async (req, res) => {
//   // console.log("redirected to /auth/login/success");
//   // console.log(req);
//   if (req.user) {
//     // console.log("found the user");
//     res.status(200).json({
//       error: false,
//       message: "Successfully Loged In",
//       user: req.user,
//     });
//   } else {
//     // console.log("Can't find the user");
//     res.status(403).json({ error: true, message: "Not Authorized" });
//   }
// });

router.get("/login/success", async (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

router.post("/editdetail/:id", ensureAuth, async (req, res) => {
  console.log(req);
  console.log("back to the editdetail endpoint");
  User.findByIdAndUpdate(req.params.id, req.body, (err, docs) => {
    if (!err) {
      res.status(200).json({ success: true, message: "Edited the item" });
    } else {
      console.log(err);
      res.status(500).json({ success: false, message: "Can't edit the item" });
    }
  });
});

// router.post("/editdetail/:id", async (req, res) => {
//   User.findByIdAndUpdate(req.params.id, req.body, (err, docs) => {
//     if (!err) {
//       res.status(200).json({ success: true, message: "Edited the item" });
//     } else {
//       console.log(err);
//       res.status(500).json({ success: false, message: "Can't edit the item" });
//     }
//   });
// });

module.exports = router;
