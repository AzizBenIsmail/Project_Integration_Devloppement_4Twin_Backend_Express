const userModel=require("../models/userSchema");
var generator = require('generate-password');
const bcrypt = require("bcrypt");
require('dotenv').config();
const nodemailer = require('nodemailer');
const User = require("../models/userSchema");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
      }
      
});

const acceptFablabRequest=async(req,res,next)=>{
    try {
        const {id} = req.params;
        // console.log(req.params);
        const fablab=await userModel.findById(id);
       // console.log(checkIfusertExists);
        if(!fablab){
            throw new Error("user not found !");
        }
        var password = generator.generate({
            length: 8,
            numbers: true,
            strict:true
        });
        console.log(password);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        console.log(hash);
        updated_at = new Date();
        updatedUser = await userModel.findByIdAndUpdate(
            id,{
                $set:{hash,updated_at }
            },{new:true}
        );
        //send mail to the fablab here  
        const message = {
            from: process.env.EMAIL_ACCOUNT,
            to: fablab.email,
            subject: 'Your login credentials',
            html: `<p>Dear user,</p>
                   <p>Your login credentials for our platform are:</p>
                   <ul>
                       <li>login: ${fablab.email}</li>
                       <li>Password: ${password}</li>
                   </ul>
                   <p>Thank you for joining our platform!</p>`
        };
        transporter.sendMail(message, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

const declineFablabRequest=async(req,res,next)=>{
    try {
        const {id} = req.params;
        const fablab=await userModel.findById(id);
        console.log(fablab);
        if(!fablab){
            throw new Error("user not found !");
        }
        //send mail to the fablab here 
        await userModel.findByIdAndDelete(id);
        const message = {
            from: process.env.EMAIL_ACCOUNT,
            to: fablab.email,
            subject: 'Your request to join our platform has been rejected',
            html: `<p>Dear ${fablab.username},</p>
            <p>We regret to inform you that your request to join our platform has been rejected. Please do not hesitate to contact us for further information.</p>
            <p>Best regards,</p>
            The GREENCROWD Team`
        };
        transporter.sendMail(message, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.status(200).json("deleted");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};
const getFablabs=async(req,res,next)=>{
    try {
        const userType = req.query.userType
        console.log(userType);
        let users = [];
        if (userType){
              users = await userModel.find({userType: userType });

        }else{
               users = await userModel.find();
        }
         
        if(!users||users.length===0){
            throw new Error("user not found !");
        }

        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
};

module.exports={

    acceptFablabRequest,
    declineFablabRequest,
    getFablabs
}