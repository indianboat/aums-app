import { NextResponse } from "next/server";
import connectDB from "../../../../middleware/db";
import Student from "../../../../models/student";

export async function GET(request){
  try {
    await connectDB();
    const studs = await Student.find({});
    return new NextResponse(JSON.stringify(studs), {status:200});
  } catch (error) {
    return NextResponse.json({error:"500 Internal Server Error: " +error}, {status:500});
  }
}