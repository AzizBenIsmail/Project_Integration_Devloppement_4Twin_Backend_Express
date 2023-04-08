const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/userSchema");

const badgesSchema = new Schema(
  {
    usernameB: String,
    badgeName: String,
    badgeDescription: String,
    date: {
      type: Date,
      default: Date.now,
    },
    badgeImg: String,
  },
  { timestamps: true }
);
const Badges = mongoose.model("Badges", badgesSchema);

module.exports = Badges;
