import { NextResponse } from "next/server";
import connectDB from "../../../../../middleware/db";
import Student from "../../../../../models/student";
import argon2i from "argon2";

export async function POST(request){

  const { fname, lname, email, mobile, password, enrol_num, course, role } = await request.json();

  try {
    await connectDB();

    const studentExist = await Student.findOne({ email });

    if (studentExist) {
      return NextResponse.json({ error: 'Student already exists !' }, { status: 422});
    } 
    
    else {
      const passHash = await argon2i.hash(password);
      const stud = new Student({ fname, lname, email, mobile, password:passHash, enrol_num, course, role });
      const data = await stud.save();

      if (data) {
        return new NextResponse('Student Added',{ status: 201});
      } else {
        return new NextResponse('Internal Server Error', { status: 500 });
      }
    }


  } catch (error) {
    return NextResponse.json({error:"500 Internal Server Error: " +error}, {status:500});
  }
}