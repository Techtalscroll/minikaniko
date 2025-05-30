// filepath: app/api/menu/route.ts
import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const items = await db.collection("menu").find({}).toArray();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const data = await req.json();
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection("menu").insertOne(data);
  return NextResponse.json(result);
}