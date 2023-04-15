const projectModel = require("../models/projectSchema");
const userModel = require("../models/userSchema");
const nlp = require("natural");
const { WordTokenizer, PorterStemmer } = nlp;

async function isProjectEcological(description) {
  const tokenizer = new WordTokenizer();
  const stemmer = PorterStemmer;
  
  const classifier = new nlp.LogisticRegressionClassifier();
  const stopWords = ["cette", "ce", "cet", "ces", "de", "des", "du", "le", "la", "les", "un", "une", "et", "est", "sont", "pour", "à", "avec", "qui", "que", "dans", "sur", "par", "au", "aux", "d'une", "d'un", "lorsque", "il", "elle", "nous", "vous", "ils", "elles"];
  
  // Preprocessing of description
  const preprocessedDesc = tokenizer.tokenize(description.toLowerCase())
    .filter(word => !stopWords.includes(word))
    .map(word => stemmer.stem(word))
    .join(' ');

  classifier.addDocument(
    "utilise matériau recyclé",
    "écologique"
  );
  classifier.addDocument(
    "utilise énergie solaire produire électricité",
    "écologique"
  );
  classifier.addDocument(
    "produit fabriqué partir plastique recyclable",
    "non-écologique"
  );
  classifier.addDocument(
    "usine pollue environnement déchets toxiques",
    "non-écologique"
  );
  
  classifier.train();

  // Analyser la description du projet avec le modèle NLP
  const result = classifier.classify(preprocessedDesc);
  console.log(result);

  // Retourner true si le projet est considéré comme écologique et éco-friendly, false sinon
  return result === "écologique";
}


const addproject = async (req, res, next) => {
  try {
    const idUser = req.user._id;
    const { filename } = req.file;
    const {
      title,
      description,
      domaine,
      goal,
      numberOfPeople,
      montant_Final,
      location,
      Duration,
    } = req.body;

    let numberOfPeople_actuel = 0;
    let montant_actuel = 1;
    const created_at = new Date();

    // Call the isProjectEcological function to determine if the project is ecological
    const isEcological = await isProjectEcological(description);

    const user = await userModel.findById(idUser);

    const project = new projectModel({
      title,
      description,
      domaine,
      goal,
      numberOfPeople,
      numberOfPeople_actuel,
      montant_actuel,
      montant_Final,
      location,
      Duration,
      image_project: filename,
      creator: user,
      created_at,
      ecological: isEcological, // Add a new field 'ecological' to the project object and set its value to isEcological
    });

    const savedProject = await project.save();

    // find the user by ID
    const foundUser = await userModel.findById(idUser);

    // add the project ID to the user's project array
    foundUser.projects.push(savedProject._id);

    // save the user to the database
    await foundUser.save();

    console.log("Project added to user successfully");

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const getprojects = async (req, res, next) => {
  try {
    const projects = await projectModel.find({ verified: false });
    if (!projects || projects.length === 0) {
      throw new Error("projects not found !");
    }
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getproject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectModel.findById(id);
    console.log(project);
    if (!project) {
      throw new Error("projectsnot found !");
    }
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectsByCreator = async (req, res, next) => {
  try {
    const projects = await projectModel
      .find({ creator: req.user._id })
      .populate("creator");
    console.log(projects);
    if (!projects || projects.length === 0) {
      throw new Error("No projects found for this creator.");
    }
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectsValider = async (req, res, next) => {
  try {
    const projects = await projectModel.find({ verified: true });
    console.log(projects);
    if (!projects || projects.length === 0) {
      throw new Error("No projects found for this creator.");
    }
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateproject = async (req, res, next) => {
  try {
    const {
      title,
      description,
      domaine,
      goal,
      Duration,
      numberOfPeople,
      montant_Final,
      location,
    } = req.body;
    console.log("req", req.body);
    const { id } = req.params;
    console.log("id", id);

    const checkIfprojectExists = await projectModel.findById(id);
    if (!checkIfprojectExists) {
      throw new Error("project not found !");
    }
    updated_at = new Date();
    updateedUser = await projectModel.findByIdAndUpdate(id, {
      $set: {
        title,
        description,
        domaine,
        goal,
        Duration,
        numberOfPeople,
        montant_Final,
        location,
        updated_at,
      },
    });
    res.status(200).json(updateedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteproject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectModel.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }

    await project.remove();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addproject,
  getprojects,
  getProjectsByCreator,
  getproject,
  deleteproject,
  updateproject,
  getProjectsValider,
};
