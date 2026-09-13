import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  disconnectDevice,
  getDevice,
} from "@/lib/fonnte/client";

export async function POST(
  req: NextRequest
) {
  try {
    const body =
      (await req.json()) as unknown;

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Format request tidak valid.",
        },
        {
          status: 400,
        }
      );
    }

    const data =
      body as Record<string, unknown>;

    const device =
      typeof data.device === "string"
        ? data.device.trim()
        : "";

    if (!device) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Device belum tersedia.",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Cari device berdasarkan
     * Account Token.
     */
    const fonnteDevice =
      await getDevice(device);

    if (!fonnteDevice) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Device tidak ditemukan di akun Fonnte.",
        },
        {
          status: 404,
        }
      );
    }

    /**
     * Disconnect menggunakan
     * Device Token.
     */
    const result =
      await disconnectDevice(
        fonnteDevice.token
      );

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
      "Fonnte logout error:",
      err
    );

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}