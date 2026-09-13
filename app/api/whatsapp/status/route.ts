import { NextResponse } from "next/server";
import { getDeviceStatus } from "@/lib/fonnte/client";

export async function GET() {
  try {
    const status = await getDeviceStatus();
    return NextResponse.json(status);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error(err);
    return NextResponse.json(
      { connected: false, phoneNumber: null, error: message },
      { status: 500 }
    );
  }
}