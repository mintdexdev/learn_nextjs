import dbConnect from "@/lib/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer"

export async function POST(req: NextRequest) {
  dbConnect()

  try {
    const { username, email, password } = await req.json();

    // validation
    console.log(username, email, password)

    const user = await User.findOne({ email })

    if (user) {
      return NextResponse.json({ error: "User already Exist" }, { status: 400 })
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    const savedUser = await newUser.save();
    console.log(savedUser)

    // send verification email
    const emailResponse = await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id.toString() })


    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      savedUser
    }, { status: 200 })


  } catch (error: any) {
    console.error("__Internal Server Error__ \n during: Sign Up")
    throw new Error(error, error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}