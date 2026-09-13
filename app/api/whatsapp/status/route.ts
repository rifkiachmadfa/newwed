import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  getDevice,
  getDeviceStatus,
} from "@/lib/fonnte/client";

export async function GET(
  req: NextRequest
) {
  try {
    const device =
      req.nextUrl.searchParams
        .get("device")
        ?.trim() ?? "";

    if (!device) {
      return NextResponse.json(
        {
          connected: false,
          phoneNumber: null,
          deviceName: null,
          error:
            "Device belum tersedia.",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Cari device menggunakan
     * Account Token.
     */
    const fonnteDevice =
      await getDevice(device);

    if (!fonnteDevice) {
      return NextResponse.json(
        {
          connected: false,
          phoneNumber: null,
          deviceName: null,
          error:
            "Device tidak ditemukan di akun Fonnte.",
        },
        {
          status: 404,
        }
      );
    }

    /**
     * Device Token hanya digunakan
     * server-side.
     */
    const result =
      await getDeviceStatus(
        fonnteDevice.token
      );

    return NextResponse.json(
      result
    );
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Internal server error";

    console.error(
      "Fonnte status error:",
      err
    );

    return NextResponse.json(
      {
        connected: false,
        phoneNumber: null,
        deviceName: null,
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}