const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Badges = require("../models/badgesSchema");

const evaluationSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
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