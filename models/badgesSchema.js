const mongoose = require("mongoose");
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
    etat:Boolean
  
  },
  { timestamps: true }
);
const Badges = mongoose.model("Badges", badgesSchema);

module.exports = Badges;
