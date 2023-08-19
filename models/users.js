import { Schema } from "mongoose";

const userSchema = new Schema({
  name:String,
  email:{type:String, unique:true, required:true},
  password:String,
  role:{type:String, enum:["student", "faculty", "admin"], default:null},
  isActive:{type:Boolean, default:false}
}, { timestamps: true });

mongoose.models = {};
const User = mongoose.model("users", userSchema);

export default User;