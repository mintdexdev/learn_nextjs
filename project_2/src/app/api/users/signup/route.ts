import dbConnect from "@/lib/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer"

export async function POST(req: NextRequest) {
  try {
    await dbConnect()

    const body = await req.json();
    const { username, email, password } = body;


    // validation
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: "User already Exist" }, { status: 400 });
    }

    // encrypt password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // create new user using schema
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // save into db
    const savedUser = await newUser.save();

    // send verification email
    const emailResponse = await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id.toString() })
    console.log(emailResponse)

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      savedUser
    }, { status: 200 })

  } catch (error: any) {
    const msg = "---Internal Server Error during: Sign Up---";
    console.error(msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}