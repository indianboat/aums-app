import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:String,
  email:{type:String, unique:true, required:true},
  mobile:String,
  password:String,
  role:{type:String, enum:["student", "faculty", "admin"], default:null},
  isActive:{type:Boolean, default:false}
}, { timestamps: true });

mongoose.models = {};
const User = mongoose.model("users", userSchema);

export default User;