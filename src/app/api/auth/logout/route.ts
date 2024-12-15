// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Skapa response
    const response = NextResponse.json({
      message: "Utloggning lyckades",
    });

    // Ta bort auth cookie
    response.cookies.delete("auth-token");

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Ett fel uppstod vid utloggning" },
      { status: 500 }
    );
  }
}
