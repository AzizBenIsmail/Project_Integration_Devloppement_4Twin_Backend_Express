const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/userSchema");

const badgesSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId,
    },

    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

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
