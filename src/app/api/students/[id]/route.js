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