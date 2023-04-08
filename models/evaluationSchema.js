const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/userSchema");
const Badges = require("../models/badgesSchema");

const evaluationSchema = new Schema(
  {
    //   evaluationID: {
    //    type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //  required: true,
    // },
    evaluationID: Number,
    xp: Number,
    lvl: Number,
    badges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Badges",
        required: false,
      },
    ],
  },
  { timestamps: true }
);
const Evaluation = mongoose.model("Evaluation", evaluationSchema);

module.exports = Evaluation;
