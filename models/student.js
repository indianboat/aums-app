import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name:String,
  enrol_num:String,
  email:{type:String, unique:true, required:true},
  mobile:String,
  password:String,
  course:String,
  role:{type:String, default:"student"},
  isActive:{type:Boolean, default:false}
}, { timestamps: true });

mongoose.models = {};
const Student = mongoose.model("students", studentSchema);

export default Student;