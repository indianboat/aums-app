import { NextResponse } from "next/server";
import connectDB from "../../../../middleware/db";
import User from "../../../../models/users";

export const GET = async (request) =>{
  try {
    await connectDB();
      const result = await User.find({});
      return new NextResponse(JSON.stringify(result), {status:200});
    } 
   catch (error) {
    return NextResponse.json({error:"500 Internal Server Error: "+error}, {status:500});
  }
}

