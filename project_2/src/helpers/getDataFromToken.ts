import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value || "";
    const decodedtoken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    
    return decodedtoken.id
  } catch (error: any) {
    return null
  }
}