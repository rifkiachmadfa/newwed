import { NextResponse } from "next/server";
import { requestQrCode } from "@/lib/fonnte/client";

export async function POST() {
  try {
    const result = await requestQrCode();
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error(err);
    return NextResponse.json(
      { qr: null, alreadyConnected: false, error: message },
      { status: 500 }
    );
  }
}