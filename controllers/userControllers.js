const userModel=require("../models/userSchema");


const addUser=async(req,res,next)=>{
    console.log("addUser");
    try {
        // const { filename } = req.file;
         //console.log('filename',req.file);
        const {username,password,email,first_Name,last_Name,dateOfBirth,address,phoneNumber,gender,userType,image_user}=req.body;
        created_at = new Date();
        console.log(req.body);
        const user=new userModel({username,password,email,first_Name,last_Name,dateOfBirth,address,phoneNumber,gender,userType,created_at,image_user/*image_user :filename*/});
        //console.log('user',user);
        const addeduser = await user.save();
        //console.log('apres',addeduser);
        res.status(200).json(addeduser);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};
const getUsers=async(req,res,next)=>{
    try {
        const users = await userModel.find();
        if(!users||users.length===0){
            throw new Error('users not found !')
        }
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
};
const updateUser=async(req,res,next)=>{
    try {
        const { filename } = req.file;
        console.log('filename',req.file.filename);
       // console.log('debut',req.body);
        const {password,first_Name,last_Name,dateOfBirth,address,phoneNumber,gender,userType}=req.body;
        console.log(req.body);
        const {id} = req.params;
        const checkIfusertExists=await userModel.findById(id);
        if(!checkIfusertExists){
            throw new Error("user not found !");
        }
        updated_at = new Date();
        updateedUser=await userModel.findByIdAndUpdate(
            id,{
                $set:{password,first_Name,last_Name,dateOfBirth,address,phoneNumber,gender,userType,updated_at,image_user:filename }
            },{new:true}
        );
        res.status(200).json(updateedUser);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};
const deleteUser=async(req,res,next)=>{
    try {
        const {id} = req.params;
        // const checkIfContactExists=await userModel.findById(id);
        const user = await userModel.findById(id); // nfas5o bil username

        if(!user){
            throw new Error("user not found !");
        }
        await userModel.findByIdAndDelete(user.id);
        res.status(200).json("deleted");
    
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};
module.exports={
    addUser,
    getUsers,
    deleteUser,
    updateUser
}