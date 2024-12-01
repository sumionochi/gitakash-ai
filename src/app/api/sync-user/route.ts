// app/api/sync-user/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { id, email, avatarUrl, firstName, lastName } = body;

    if (!id || !email) {
      return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
    }

    // Upsert user data in Prisma
    const user = await prisma.user.upsert({
      where: { id },
      update: {
        emailAddress: email,
        imageUrl: avatarUrl || undefined,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
      },
      create: {
        id,
        emailAddress: email,
        imageUrl: avatarUrl || undefined,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error syncing user with Prisma:", error);
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }
}
