const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: { type: String },
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: { type: String },
  image: { type: String },
  location: { type: String },
  summary: { type: String },
  website: { type: String },
  github: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
  work: { type: String },
  education: { type: String },
  skill: { type: String },
  source: {
    type: String,
    required: [true, "source not specified"],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
