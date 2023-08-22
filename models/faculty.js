import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  name:String,
  email:{type:String, unique:true, required:true},
  mobile:String,
  password:String,
  role:{type:String, default:"faculty"},
  isActive:{type:Boolean, default:false}
}, { timestamps: true });

mongoose.models = {};
const Faculty = mongoose.model("faculties", facultySchema);

export default Faculty;