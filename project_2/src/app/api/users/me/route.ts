import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConfig";
import User from "@/models/userModel"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { API_MESSAGES } from "@/constants/messages";

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const userID = await getDataFromToken(req)

    // user exist?
    const user = await User.findOne({ _id: userID }).select("-password");
    if (!user)
      return NextResponse.json({ message: API_MESSAGES.USER.NOT_FOUND }, { status: 400 });

    return NextResponse.json({ message: API_MESSAGES.USER.FOUND }, { status: 200 });

  } catch (error: any) {
    console.error(API_MESSAGES.SERVER_ERROR.SIGNIN);
    return NextResponse.json({ error: API_MESSAGES.SERVER_ERROR.SIGNIN }, { status: 500 });
  }
}