const Evaluation = require("../models/evaluationSchema");
const { deleteBadgeE } = require("./badgesController");

const getEvaluations = async (req, res, next) => {
  try {
    const evaluations = await Evaluation.find().sort();
    if (!evaluations || evaluations.length === 0) {
      throw new Error("Evaluations not found!");
    }
    res.status(200).json({ evaluations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEvaluation = async (req, res, next) => {
  try {
    const { username } = req.params;
    const evaluations = await Evaluation.find({ usernameE: username });
    if (!evaluations || evaluations.length === 0) {
      throw new Error("Evaluations not found for the given username!");
    }
    res.status(200).json({ evaluations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addXP = async (req, res, next) => {
  try {
    const { username, xp } = req.params;
    const evaluation = await Evaluation.findOne({ usernameE: username });

    if (!evaluation) {
      throw new Error("Evaluation not found for the given username!");
    }

    // Mettre à jour le niveau et l'XP
    evaluation.xp += parseInt(xp);
    while (evaluation.xp >= 100) {
      evaluation.lvl += 1;
      evaluation.xp -= 100;
    }

    await evaluation.save();

    res.status(200).json({ message: "XP added successfully", evaluation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const reduceXP = async (req, res, next) => {
  try {
    const { username, xp } = req.params;
    const evaluation = await Evaluation.findOne({ usernameE: username });

    if (!evaluation) {
      throw new Error("Evaluation not found for the given username!");
    }

    // Mettre à jour le niveau et l'XP
    evaluation.xp -= parseInt(xp);
    if (evaluation.xp < 0) {
      if (evaluation.lvl > 1) {
        evaluation.lvl -= 1;
        evaluation.xp += 100;
      } else {
        evaluation.xp = 0;
      }
    }

    await evaluation.save();

    res.status(200).json({ message: "XP reduced successfully", evaluation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const reduceXP2 = async (username,xp) => {
  try {
    const evaluation = await Evaluation.findOne({ usernameE: username });



    // Mettre à jour le niveau et l'XP
    evaluation.xp -= parseInt(xp);
    if (evaluation.xp < 0) {
      if (evaluation.lvl > 1) {
        evaluation.lvl -= 1;
        evaluation.xp += 100;
      } else {
        evaluation.xp = 0;
      }
    }

    await evaluation.save();

    //res.status(200).json({ message: "XP reduced successfully", evaluation });
  } catch (error) {
  //  res.status(500).json({ message: error.message });
  }
};

const addXP2 = async (username, xp) => {
  try {
    const evaluation = await Evaluation.findOne({ usernameE: username });


    // Mettre à jour le niveau et l'XP
    evaluation.xp += parseInt(xp);
    while (evaluation.xp >= 100) {
      evaluation.lvl += 1;
      evaluation.xp -= 100;
    }

    await evaluation.save();

  //  res.status(200).json({ message: "XP added successfully", evaluation });
  } catch (error) {
   // res.status(500).json({ message: error.message });
  }
};

const addXP3 = async (id, xp) => {
  try {
    const evaluation = await Evaluation.findById(id);


    // Mettre à jour le niveau et l'XP
    evaluation.xp += parseInt(xp);
    while (evaluation.xp >= 100) {
      evaluation.lvl += 1;
      evaluation.xp -= 100;
    }

    await evaluation.save();

  //  res.status(200).json({ message: "XP added successfully", evaluation });
  } catch (error) {
   // res.status(500).json({ message: error.message });
  }
};


const getTop3Evaluations = async (req, res, next) => {
  try {
    const top5Evaluations = await Evaluation.find().sort({ lvl: -1 }).limit(3);
    res.status(200).json(top5Evaluations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const isTop3Evaluation = async (req,res) => {
  try {
    const { username} = req.params;

    // Get top 3 evaluations
    const top3Evaluations = await Evaluation.find()
      .sort({ lvl: -1 })
      .limit(3);

    // Check if the given username is in the top 3 evaluations
    const isTop3 = top3Evaluations.some(
      (evaluation) => evaluation.usernameE === username
    );
    return res.status(200).json(isTop3);

    
  } catch (error) {
    console.error(error);
    return res.status(200).json(false);
  }
};





const deleteEvaluation = async (username) => {
  try {
   // const { username } = req.params;
    deleteBadgeE(username);
    const b = await Evaluation.findOne({ usernameE: username });

    await b.remove();
    //res.status(200).json({ message: "Evaluation deleted successfully!" });
  } catch (error) {  
    //res.status(500).json({ message: error.message });
}
};


module.exports = {
  getEvaluations,
  getEvaluation,
  addXP,
  reduceXP,getTop3Evaluations,reduceXP2,addXP2,deleteEvaluation,addXP3,isTop3Evaluation
};
