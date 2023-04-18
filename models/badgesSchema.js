const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    evaluation: {
      type: Schema.Types.ObjectId,
      ref: "Evaluation",
    },
  },
  { timestamps: true }
);
const Badges = mongoose.model("Badges", badgesSchema);

module.exports = Badges;
