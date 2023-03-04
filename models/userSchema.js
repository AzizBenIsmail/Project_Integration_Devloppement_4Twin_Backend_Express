const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name:{type :String, require : true, default :""},
        age:Number,
        moy:Number,
        address:{
            street:String,
            country:String
        }
    },{timestamps:true}
);
const user = mongoose.model("user", userSchema);
module.exports=user;