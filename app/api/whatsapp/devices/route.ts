import {
  NextResponse,
} from "next/server";

import {
  getDevices,
} from "@/lib/fonnte/client";

export async function GET() {
  try {
    const result =
      await getDevices();

    return NextResponse.json(
      result,
      {
        status:
          result.success
            ? 200
            : 500,
      }
    );
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Internal server error";

    console.error(
      "Fonnte devices error:",
      err
    );

    return NextResponse.json(
      {
        success: false,
        connected: 0,
        devices: 0,
        messages: 0,
        data: [],
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}