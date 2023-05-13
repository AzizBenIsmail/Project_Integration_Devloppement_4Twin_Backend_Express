const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    // jobOffer: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "JobOffer",
    //   required: true,
    // },
    //jobOffer 1->* application 1->1 user
    firstName: { type: String, required: true },

    lastName: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    phone: { type: String, required: true },

    availability: { type: String, required: true },

    adresse: { type: String, required: true },

    resume: { type: String },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;

//  candidate: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//       },
//     ],
//     jobOffer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "JobOffer",
//       required: true,
//     },
//     resume: { type: String},

//     firstName: { type: String, required: true },

//     lastName: { type: String,required: true },

//     email: { type: String,required: true,unique: true },

//     phone: { type: String,required: true },

//     availability: { type: String, required: true },

//     location: { type: String, required: true },

//     status: {
//       type: String,
//       enum: ["pending", "accepted", "rejected"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
