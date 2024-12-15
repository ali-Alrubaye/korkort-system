// app/api/test/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    // Ta bort testanvändaren
    await prisma.user.delete({
      where: {
        email: "test@example.com",
      },
    });

    return NextResponse.json({ success: true, message: "Test user deleted" });
  } catch (error) {
    console.error("Database test error:", error);
    return NextResponse.json(
      { success: false, error: "Database operation failed" },
      { status: 500 }
    );
  }
}
