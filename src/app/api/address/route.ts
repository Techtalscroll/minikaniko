// src/app/api/address/route.ts
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  const { address } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: { address },
  });

  return NextResponse.json({ success: true });
}
