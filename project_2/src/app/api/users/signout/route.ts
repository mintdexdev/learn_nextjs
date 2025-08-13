import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConfig";
import { API_MESSAGES } from "@/constants/messages";

export async function GET(req: NextRequest) {
  try {
    await dbConnect()

    const response = NextResponse.json({ message: API_MESSAGES.AUTH.SIGNOUT, success: true }, { status: 200 });
    response.cookies.set("token", "", { httpOnly: true, expires: 0 })
    return response;

  } catch (error: any) {
    console.error(API_MESSAGES.SERVER_ERROR.SIGNIN);
    return NextResponse.json({ error: API_MESSAGES.SERVER_ERROR.SIGNOUT }, { status: 500 });
  }
}