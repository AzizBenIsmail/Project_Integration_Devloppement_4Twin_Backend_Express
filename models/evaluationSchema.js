const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Badges = require("../models/badgesSchema");

const evaluationSchema = new Schema(
  {
    usernameE: String,
    xp: Number,
    lvl: Number,
    badges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Badges",
      },
    ],
  },
  { timestamps: true }
);

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

module.exports = Evaluation;