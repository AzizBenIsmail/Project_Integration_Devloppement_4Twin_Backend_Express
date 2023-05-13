const BType = require("../models/bTypeShema");

const getBType = async (req, res, next) => {
  try {
    const btype = await BType.find();
    if (!btype || btype.length === 0) {
      throw new Error("btype not found!");
    }
    res.status(200).json({ btype });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addBType = async (req, res, next) => {
  try {
    const { badgeName, badgeDescription, badgeImg } = req.body;

    const newBType = new BType({
      badgeName,
      badgeDescription,
      badgeImg
    });

    await newBType.save();

    res.status(201).json({ btype: newBType });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteBType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const btype = await BType.findById(id);
    if (!btype) {
      throw new Error("btype not found!");
    }
    await btype.remove();
    res.status(200).json({ message: "btype deleted successfully!" });
  } catch (error) {  res.status(500).json({ message: error.message });
}
};


module.exports = {
  getBType,
  addBType,
  deleteBType
 
};
