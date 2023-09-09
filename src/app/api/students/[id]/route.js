import { NextResponse } from "next/server";
import connectDB from "../../../../../middleware/db";
import Student from "../../../../../models/student";

export async function DELETE(req, ctx){
  try {
    await connectDB();
    const id = ctx.params.id;

    const findStudent = await Student.findByIdAndDelete({_id : id})
    if(findStudent){
      return new NextResponse(JSON.stringify("Student Deleted !"), {status:200});
    }
    else{
      return new NextResponse(JSON.stringify("Student Not Found !!"), {status:200});
    }
  } catch (error) {
    return NextResponse.json({error:"500 Internal Server Error: " +error}, {status:500});
  }
} 

export async function GET(req, ctx){
  try {
    await connectDB();
    const id = ctx.params.id;

    const findStudent = await Student.findById({_id : id})
    if(findStudent){
      return new NextResponse(JSON.stringify(findStudent), {status:200});
    }
    else{
      return new NextResponse(JSON.stringify("Student Not Found !!"), {status:200});
    }
  } catch (error) {
    return NextResponse.json({error:"500 Internal Server Error: " +error}, {status:500});
  }
} 

export async function PUT(req, { params }){
  try {
    await connectDB();
    const { id } = params;
    const {fname, lname, email, mobile, password, enrol_num, course, batch, gender, DOB, religion, blood_group, semester, nationality, country, adhar_card, pancard, address, img, sign, role, isActive} = await req.json();

    const updateStudent = await Student.findByIdAndUpdate({_id : id}, {fname, lname, email, mobile, password, enrol_num, course, batch, gender, DOB, religion, blood_group, semester, nationality, country, adhar_card, pancard, address, img, sign, role, isActive});
    if(updateStudent){
      return new NextResponse(JSON.stringify("Student Info Updated !"), {status:201});
    }
    else{
      return new NextResponse(JSON.stringify("Student Not Found !!"), {status:200});
    }
  } catch (error) {
    return NextResponse.json({error:"500 Internal Server Error: " +error}, {status:500});
  }
}