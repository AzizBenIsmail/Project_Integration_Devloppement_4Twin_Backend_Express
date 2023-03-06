const User = require("../../models/userSchema.js");
const InvalidCreationException=require('../../exceptions/invalid-credential-exception')
const bcrypt=require('bcrypt');
const userControllers=require('../userControllers.js');
const jwt=require('jsonwebtoken');
const {appKey,tokenExpiresIn} = require('../../config/app.js');

class AuthController {




  async login(req, res) {
    const { email, password } = req.body;

 
    // find the user with mongo
    const u = await User.findOne({
      email,
    });
 
    //check if user's email is right
    if (!u)
    return res.status(403).send("Invalid login credentials");

    //check if user's password is correct

   // if (password !== u.password)

   if(!await bcrypt.compare(password, u.password))
      return res.status(403).send("Invalid login credentials");





//part2
      const payload = {id : u.id, email : u.email, username: u.username, first_name: u.first_Name, last_name: u.last_Name};
      const accessToken = jwt.sign(payload,appKey,{expiresIn: tokenExpiresIn})
      res.send({u,...{accessToken}});
//////////////////////////////
    
      console.log(u);
     //res.send(u);
   
  }





  async register(req, res) {
    const { email, password } = req.body;
   const user = new User();
    user.email = email;
    user.password = password;

    //userControllers.addUser(user);

    await user.save();

    res.send("register");
  }



}
module.exports = new AuthController();
