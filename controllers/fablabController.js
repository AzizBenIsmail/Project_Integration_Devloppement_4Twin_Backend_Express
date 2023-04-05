const userModel=require("../models/userSchema");
const fablabModel=require("../models/fablabResquestSchema");
var generator = require('generate-password');
require('dotenv').config();
const nodemailer = require('nodemailer');

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

const addFablabRequest=async(req,res,next)=>{
    try {
        const { filename } = req.file;
       // console.log('filename',req.file);
       const { fablabName,
               fablabEmail,
               dateOfCreation,
               phoneNumber,
               address,
               description}=req.body;
               is_treated = false;
               is_accepted = false;
        const fablab=new fablabModel({fablabName,fablabEmail,dateOfCreation,phoneNumber,address,fablbLogo:filename,description,is_treated});
        const addedFablab = await fablab.save();   
        res.status(200).json(addedFablab);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

const acceptFablabRequest=async(req,res,next)=>{
    try {
        const {id} = req.params;
        // console.log(req.params);
        const fablab=await fablabModel.findById(id);
       // console.log(checkIfusertExists);
        if(!fablab){
            throw new Error("fablab request not found !");
        }
        var password = generator.generate({
            length: 8,
            numbers: true,
            strict:true
        });
        let addedUser;

    try {
      const user = new userModel({
        username: fablab.fablabName,
        password,
        email: fablab.fablabEmail,
        dateOfBirth: fablab.dateOfCreation,
        address: fablab.address,
        phoneNumber1: fablab.phoneNumber,
        userType: "fablab",
        image_user : fablab.fablbLogo
      });

      // Send email

      const message = {
        from: process.env.EMAIL_USERNAME,
        to: fablab.fablabEmail,
        subject: "Your login credentials",
        html: `<p>Dear ${fablab.fablabName},</p>
             <p>Your login credentials for our platform are:</p>
             <ul>
               <li>Username: ${fablab.fablabEmail}</li>
               <li>Password: ${password}</li>
             </ul>
             <p>Thank you for joining our platform!</p>`
      };

      await transporter.sendMail(message);
      console.log("Email sent successfully");

      addedUser = await user.save();
      await fablabModel.findByIdAndUpdate(
        id,{
            $set:{is_treated:true,is_accepted:true}
        },{new:true}
        );

    } catch (error) {
        console.log("Failed to send email", error);
        throw new Error("Failed to send email to fablab");
    }

        // Send a response to the client with the added user data
        res.status(200).json(addedUser);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

const declineFablabRequest=async(req,res,next)=>{
    try {
        const {id} = req.params;
        const fablab=await fablabModel.findById(id);
        console.log(fablab);
        if(!fablab){
            throw new Error("fablab not found !");
        }
        //send mail to the fablab here 
        try {
            const message = {
                from: process.env.EMAIL_USERNAME,
                to: fablab.fablabEmail,
                subject: 'Your request to join our platform has been rejected',
                html: `<p>Dear ${fablab.fablabName},</p>
                <p>We regret to inform you that your request to join our platform has been rejected. Please do not hesitate to contact us for further information.</p>
                <p>Best regards,</p>
                The GREENCROWD Team`
            };
            await transporter.sendMail(message);
            console.log("Email sent successfully");
            await fablabModel.findByIdAndUpdate(
                id,{
                    $set:{is_treated:true,is_accepted:false}
                },{new:true}
             );
        } catch (error) {
            console.log("Failed to send email", error);
            throw new Error("Failed to send email to fablab");
        }
        res.status(200).json("declined");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

/*const getFablabRequests=async(req,res,next)=>{
    try {
        const {is_accepted ,is_treated} = req.query ;
        console.log(is_accepted);
        console.log(is_treated);
        let fablabs = [];
        if(is_accepted && is_treated){
            fablabs = await fablabModel.find({is_treated:is_treated,is_accepted:is_accepted});
        }
        else{
            fablabs = await fablabModel.find();
        }
          
        if(!fablabs||fablabs.length===0){
            throw new Error("fablab not found !");
        }

        res.status(200).json({fablabs});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
};*/

const getFablabRequests = async (req, res, next) => {
    try {

        const { is_accepted, is_treated, page, limit } = req.query;
        const query = {};

        if (is_accepted !== undefined) {
        query.is_accepted = is_accepted;
        }

        if (is_treated !== undefined) {
        query.is_treated = is_treated;
        }

        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 5;
        
        const totalFablabs = await fablabModel.countDocuments(query);
        const totalPages = Math.ceil(totalFablabs / limitNum);
    
        const skip = (pageNum - 1) * limitNum;
        const fablabs = await fablabModel.find(query).skip(skip).limit(limitNum);
    
        if (!fablabs || fablabs.length === 0) {
          throw new Error("Fablabs not found!");
        }
    
        res.status(200).json({ fablabs, totalPages });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

const getFablabRequest=async(req,res,next)=>{
    try {
        const {id} = req.params;
        const fablab = await fablabModel.findById(id);
        if(!fablab||fablab.length===0){
            throw new Error('fablab not found !')
        }
        res.status(200).json({fablab});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
};

const getFablabs=async(req,res,next)=>{
    try {
        //const fablabs = await userModel.find({userType:'fablab'});
          
        const { page, limit } = req.query;
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 5;
        
        const totalFablabs = await userModel.countDocuments({userType:'fablab'});
        const totalPages = Math.ceil(totalFablabs / limitNum);
    
        const skip = (pageNum - 1) * limitNum;
        const fablabs = await userModel.find({userType:'fablab'}).skip(skip).limit(limitNum);
    
        if (!fablabs || fablabs.length === 0) {
          throw new Error("Fablabs not found!");
        }
    
        res.status(200).json({ fablabs, totalPages });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
};

const getFablab=async(req,res,next)=>{
    try {
        const {id} = req.params;
        const fablab = await userModel.findOne({ _id:id ,userType:'fablab'}); 
        if(!fablab||fablab.length===0){
            throw new Error("fablab not found !");
        }

        res.status(200).json({fablab});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
};
module.exports={
    addFablabRequest,
    acceptFablabRequest,
    declineFablabRequest,
    getFablabRequests,
    getFablabRequest,
    getFablabs,
    getFablab
}