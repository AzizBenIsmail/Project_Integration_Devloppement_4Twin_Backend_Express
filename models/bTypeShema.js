const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bTypeSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId,
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
const BType = mongoose.model("BType", bTypeSchema);

module.exports = BType;
