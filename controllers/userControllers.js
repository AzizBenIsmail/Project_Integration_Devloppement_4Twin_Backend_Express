const userModel = require("../models/userSchema");

const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");

const addUser = async (req, res, next) => {
  // console.log("addUser");
  try {
    const { filename } = req.file;
    console.log("filename", req.file);
    const {
      username,
      password,
      email,
      first_Name,
      last_Name,
      dateOfBirth,
      address,
      phoneNumber,
      gender,
      userType,
    } = req.body;
    // const {username,password,email,dateOfBirth,gender,image_user}=req.body;
    console.log(req.body);
    const user = new userModel({
      username,
      password,
      email,
      first_Name,
      last_Name,
      dateOfBirth,
      address,
      phoneNumber,
      gender,
      userType,
      image_user: filename,
    });
    //const user=new userModel({username,password,email,dateOfBirth,gender,image_user :filename});
    //console.log('user',user);
    const addeduser = await user.save();
    //console.log('apres',addeduser);
    res.status(200).json(addeduser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find();
    if (!users || users.length === 0) {
      throw new Error("users not found !");
    }
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user || user.length === 0) {
      throw new Error("users not found !");
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateUser = async (req, res, next) => {
  try {
    // const { filename } = req.file;
    // console.log('filename',req.file.filename);
    // console.log('debut',req.body);
    const {
      password,
      first_Name,
      last_Name,
      dateOfBirth,
      address,
      phoneNumber,
      gender,
      userType,
    } = req.body;
    console.log(req.body);
    const { id } = req.params;
    const checkIfusertExists = await userModel.findById(id);
    if (!checkIfusertExists) {
      throw new Error("user not found !");
    }
    updated_at = new Date();
    updateedUser = await userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          password,
          first_Name,
          last_Name,
          dateOfBirth,
          address,
          phoneNumber,
          gender,
          userType,
          updated_at /*,image_user:filename*/,
        },
      },
      { new: true }
    );
    res.status(200).json(updateedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const checkIfContactExists=await userModel.findById(id);
    const user = await userModel.findById(id); // nfas5o bil username

    if (!user) {
      throw new Error("user not found !");
    }
    await userModel.findByIdAndDelete(user.id);
    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const forgotpwd = async (req, res) => {
  const { email } = req.body;
  const URL = "http://localhost:3000/resetpwd";

  try {
    res.status(200).json({ message: "Welcome" });
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: "greencrowdproject@gmail.com",
      subject: "Welcome to Green Crowd Project",
      html: `
				<h2>Click the link to reset your password</h2>
				<p>${URL}</p>
			`,
      //templateId: 'd-e09cf57a0a0e45e894027ffd5b6caebb',
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetpwd = async (req, res) => {
  const { email, password } = req.body;

  try {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);
    await user.save();

    res.status(200).json({ message: "password changed" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  forgotpwd,
  resetpwd,
};
