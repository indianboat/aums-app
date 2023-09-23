import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  enrol_num: String,
  email: { type: String, unique: true, required: true },
  mobile: String,
  password: String,
  course: String,
  batch: String,
  currentSemester:{type:Number, default:1},
  semesterData: [],
  // isFeesPaid:[{
  //   semester:Number,
  //   paid:{type:Boolean, default:false}
  // }],
  gender: String,
  DOB: Date,
  religion: String,
  blood_group: String,
  nationality: String,
  country: String,
  adhar_card: Number,
  pancard: String,
  address: String,
  img: String,
  sign: String,
  role: { type: String, default: "student" },
  isActive: { type: Boolean, default: false }
}, { timestamps: true });

mongoose.models = {};
const Student = mongoose.model("students", studentSchema);

export default Student; 