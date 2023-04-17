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
      const { usernameB, badge } = req.body; // Récupérer le nom d'utilisateur et le badge à partir du corps de la requête
      const badgeToAdd = { badge }; // Créer un nouvel objet de badge avec les données du corps de la requête
  
      // Rechercher l'utilisateur par nom d'utilisateur et ajouter le badge
      const user = await Badges.findOneAndUpdate(
        { usernameB }, // Rechercher l'utilisateur par nom d'utilisateur
        { $push: { badges: badgeToAdd } }, // Ajouter le badge à la liste des badges de l'utilisateur
        { new: true } // Retourner la version mise à jour de l'utilisateur après la mise à jour
      );
  
      if (!user) {
        throw new Error("User not found!"); // L'utilisateur n'a pas été trouvé
      }
  
      res.status(200).json({ message: "Badge added successfully", user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
module.exports = {
  getBadges,
  getBadge,
  addBadge
};
