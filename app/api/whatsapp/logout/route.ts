import { NextResponse } from "next/server";
import { disconnectDevice } from "@/lib/fonnte/client";

export async function POST() {
  try {
    const result = await disconnectDevice();
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}