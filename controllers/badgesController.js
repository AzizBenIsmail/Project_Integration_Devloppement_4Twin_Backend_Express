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

  const getFBadge = async (req, res, next) => {
    try {
      const { username } = req.params;
      const badges = await Badges.find({ usernameB: username, etat: false });
      if (!badges || badges.length === 0) {
        throw new Error("Badges not found for the given username!");
      }
      res.status(200).json({ badges });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  const getFBadges = async (req, res, next) => {
    try {
      const badges = await Badges.find({etat:false}).sort({date:-1}); // Utilisation du paramètre username pour rechercher les badges
      if (!badges || badges.length === 0) {
        throw new Error("Badges not found for the given username!");
      }
      res.status(200).json({ badges });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getTBadge = async (req, res, next) => {
    try {
      const { username } = req.params;
      const badges = await Badges.find({ usernameB: username, etat: true }).sort({date:-1});
      if (!badges || badges.length === 0) {
        throw new Error("Badges not found for the given username!");
      }
      res.status(200).json({ badges });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
  const getTVBadge = async (req, res, next) => {
    try {
      const { username } = req.params;
      const count = await Badges.countDocuments({ usernameB: username, etat: true,vu:false });
   
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const addBadge = async (req, res, next) => {
    try {
      const { usernameB,badgeName, badgeDescription, badgeImg,etat,details,vu} = req.body;
  
      const newB = new Badges({
        usernameB,
        badgeName,
        badgeDescription,
        badgeImg,
        etat,
        details,
        vu,
      });
  
      await newB.save();
  
      res.status(201).json({ Badges: newB });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  const deleteBadge = async (req, res, next) => {
    try {
      const { id } = req.params;
      const b = await Badges.findById(id);
      if (!b) {
        throw new Error("btype not found!");
      }
      await b.remove();
      res.status(200).json({ message: "btype deleted successfully!" });
    } catch (error) {  res.status(500).json({ message: error.message });
  }
  };

  const deleteBadgeE = async (username) => {
    try {
      const b = await Badges.find({ usernameB : username});
    
      await b.remove();
     // res.status(200).json({ message: "btype deleted successfully!" });
    } catch (error) { 
      // res.status(500).json({ message: error.message });
  }
  };


  const updateBadge = async (req, res, next) => {
    try {
      const { id } = req.params; // Get the badge ID from URL parameter
      const { badgeName, badgeDescription, badgeImg, etat, details,vu } = req.body;
  
      // Update the badge using its ID
      const updatedBadge = await Badges.findByIdAndUpdate(id, {
        badgeName,
        badgeDescription,
        badgeImg,
        etat,
        details,vu,
      }, { new: true }); // Set { new: true } to return the updated badge after the update is applied
  
      if (!updatedBadge) {
        throw new Error("Badge not found!");
      }
  
      res.status(200).json({ badge: updatedBadge });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateBadgeV = async (req, res, next) => {
    try {

      const { username } = req.params; // Get the badge ID from URL parameter
      const { badgeName, badgeDescription, badgeImg, etat, details,vu } = req.body;
  
      // Update the badge using its ID
      const updatedBadges = await Badges.updateMany(
        { usernameB: username }, // Filter criteria
        { 
          badgeName,
          badgeDescription,
          badgeImg,
          etat,
          details,
          vu,
        }, // Fields to update
        { new: true } // Options
      );
      

      res.status(200).json({ badge: updatedBadges });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  


module.exports = {
  getBadges,
  getBadge,
  addBadge,
  deleteBadge,
  getFBadge,
  getTBadge,
  getFBadges,
  updateBadge,deleteBadgeE,getTVBadge,updateBadgeV
};
