import dbConnect from "@/lib/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect()
  try {
    const body = await req.json();
    console.log(body) // TODO Remove 
    const { token } = body;

    const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
    if (!user) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 400 });
    }
    console.log(user) // TODO Remove 

    user.isVerified = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined

    await user.save()

    return NextResponse.json({
      message: "Email Verified Successfully",
      success: true,
    }, { status: 200 })

  } catch (error) {
    const msg = "---Internal Server Error during: Email Verification---";
    console.error(msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }

}