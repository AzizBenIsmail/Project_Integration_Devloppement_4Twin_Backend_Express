const mongoose = require("mongoose");
const { boolean } = require("yup");
const Schema = mongoose.Schema;

const badgesSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId,
    },
    usernameB: String,
    badgeName: String,
    badgeDescription: String,
    date: {
      type: Date,
      default: Date.now,
    },
    badgeImg: String,
    details: String,
    etat:Boolean,
    vu:Boolean,
  
  },
  { timestamps: true }
);
const Badges = mongoose.model("Badges", badgesSchema);

module.exports = Badges;
