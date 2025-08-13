import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConfig";
import User from "@/models/userModel"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { API_MESSAGES } from "@/constants/messages";

export async function POST(req: NextRequest) {
  try {
    await dbConnect()

    const body = await req.json();
    const { email, password } = body;

    // user exist?
    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({ message: API_MESSAGES.USER.NOT_EXISTS }, { status: 400 });

    // encrypt password
    const isValidPassword = await bcryptjs.compare(password, user.password);

    // wrong credentail(password)
    if (!isValidPassword)
      return NextResponse.json({ message: API_MESSAGES.AUTH.INVALID_CREDENTIALS }, { status: 400 });

    // correct password
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    }

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })
    const response = NextResponse.json({ message: API_MESSAGES.AUTH.SIGNIN, success: true }, { status: 200 });
    response.cookies.set("token", token, { httpOnly: true })
    return response;
    
  } catch (error: any) {
    console.error(API_MESSAGES.SERVER_ERROR.SIGNIN);
    return NextResponse.json({ error: API_MESSAGES.SERVER_ERROR.SIGNIN }, { status: 500 });
  }
}