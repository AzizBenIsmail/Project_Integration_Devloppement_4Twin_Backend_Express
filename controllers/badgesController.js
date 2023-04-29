const Badges = require("../models/badgesSchema");

const getBadges = async (req, res, next) => {
  try {
    const badges = await Badges.find();
    if (!badges || badges.length === 0) {
      throw new Error("Badges not found!");
    }
    res.status(200).json({ badges });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBadge = async (req, res, next) => {
    try {
      const { username } = req.params;
      const badges = await Badges.find({ usernameB: username }); // Utilisation du paramètre username pour rechercher les badges
      if (!badges || badges.length === 0) {
        throw new Error("Badges not found for the given username!");
      }
      res.status(200).json({ badges });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const addBadge = async (req, res, next) => {
    try {
      const { usernameB,badgeName, badgeDescription, badgeImg } = req.body;
  
      const newB = new Badges({
        usernameB,
        badgeName,
        badgeDescription,
        badgeImg
      });
  
      await newB.save();
  
      res.status(201).json({ Badges: newB });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
module.exports = {
  getBadges,
  getBadge,
  addBadge
};
