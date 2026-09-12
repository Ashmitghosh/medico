import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body?.providerId || !body?.name || !body?.phone) return NextResponse.json({ error: "Please provide your name and phone number." }, { status: 400 });
  return NextResponse.json({ confirmation: `MED-${Date.now().toString().slice(-6)}`, message: "Your appointment request has been received." }, { status: 201 });
}
