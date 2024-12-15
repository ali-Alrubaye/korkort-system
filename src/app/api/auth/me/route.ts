// src/app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      user: session.user,
      expires: session.expires,
    });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
