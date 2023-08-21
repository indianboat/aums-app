import { Schema } from "mongoose";

const adminSchema = new Schema({
  name:String,
  mobile:String,
  email:{type:String, unique:true, required:true},
  password:String,
  role:{type:String, default:"admin"},
}, { timestamps: true });

mongoose.models = {};
const Admin = mongoose.model("admin", adminSchema);

export default Admin;