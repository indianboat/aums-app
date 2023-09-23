import { NextResponse } from "next/server";
import connectDB from "../../../../middleware/db";
import Student from "../../../../models/student";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  try {
    await connectDB();

    const url = new URL(request.url);

    let course = url.searchParams.get("course");
    let batch = url.searchParams.get("batch");

    let studs = [];

    if (course === null) { // paramter not given 
      studs = await Student.find({});
    }
    if(batch === null){
      studs = await Student.find({});
    }
    if(course === null || batch === null){
      studs = await Student.find({});
    }
    if(course === null && batch === null){
      studs = await Student.find({});
    }

    if(course === ""){ // paramter given but not having value 
      studs = await Student.find({});
    }
    if(batch === ""){
      studs = await Student.find({});
    }
    if(course === "" && batch === ""){
      studs = await Student.find({});
    }
    if(course === "" || batch === ""){
      studs = await Student.find({});
    }

    if(course !== null){
      if(course !== ""){
        course = course.toUpperCase();
        studs = await Student.find({course});
      }
    }

    if(batch !== null){
      if(batch !== ""){
        studs = await Student.find({batch});
      }
    }

    if(course !== null && batch !== null){
      if(course !== "" && batch !== ""){
        course = course.toUpperCase();
        studs = await Student.find({course, batch});
      }
    }

    return new NextResponse(JSON.stringify(studs), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "500 Internal Server Error: " + error }, { status: 500 });
  }
}