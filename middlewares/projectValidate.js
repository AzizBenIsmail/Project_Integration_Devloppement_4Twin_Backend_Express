const yup = require("yup");
const projectModel = require("../models/projectSchema");

const projectValidate = async (req, res, next) => {
  try {
    console.log("test", req.body);
    const schema = yup.object().shape({
      title: yup
        .string()
        .required()
        .test("title_unique", "title is already taken", async function (value) {
          const isUnique = await checkusertitleUniqueness(value); //console.log("aze",user);
          return isUnique;
        }),
      description: yup
        .string()
        .required()
        .min(4, "description must contain min 4 characters max 50 characters"),
      numberOfPeople: yup
        .number()
        .required()
        .max(100, "The numberOfPeople must be a positive number max 100 min 10")
        .min(10, "The numberOfPeople must be a positive number max 100 min 10")
        .typeError("The numberOfPeople must be a positive number max 100 min 10"),
      montant_Final: yup
        .number()
        .min(1000,"The montant_Final must be a positive number min 1000 dt")
        .required(),
        location: yup.string().required(),
    });
    async function checkusertitleUniqueness(title) {
      // Check if username exists in database
      const project = await projectModel.findOne({ title: title });
      // Return true if username exists, false otherwise
      console.log("test sur project",project);
      return !project;
    }
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.json({ message: error.message });
  }
};
module.exports = projectValidate;
