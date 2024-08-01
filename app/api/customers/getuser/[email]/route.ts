import { Connect } from "@/dbConfig/connect";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

Connect();

interface IParams {
  email: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin":
    process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3001",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(
  request: NextRequest,
  { params }: { params: IParams }
) {
  const email = params.email;
  const user = await UserModel.findOne({ email })
    .select("-type")
    .select("-provider");

  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404, headers: corsHeaders }
    );
  }
  return NextResponse.json(
    {
      message: "User Found Successfully",
      success: true,
      user,
    },
    { status: 200, headers: corsHeaders }
  );
}
