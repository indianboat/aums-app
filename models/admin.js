import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name:String,
  email:{type:String, unique:true, required:true},
  mobile:String,
  password:String,
  role:{type:String, default:"admin"},
}, { timestamps: true });

mongoose.models = {};
const Admin = mongoose.model("admins", adminSchema);

export default Admin;