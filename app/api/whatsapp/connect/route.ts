import { NextRequest, NextResponse } from "next/server";
import { addDevice, getDevices, requestQrCode } from "@/lib/fonnte/client";

export async function POST(req: NextRequest) {
  try {
    // Kalau frontend sudah tahu device id-nya, pakai itu langsung
    const body = await req.json().catch(() => ({}));
    const existingDevice =
      typeof body?.device === "string" ? body.device.trim() : "";

    let deviceIdentifier = existingDevice;
    let deviceToken: string | null = null;

    if (deviceIdentifier) {
      // cari token dari device yang sudah pernah dibuat
      const devices = await getDevices();
      const found = devices.data.find((d) => d.device === deviceIdentifier);
      if (found) deviceToken = found.token;
    }

    // Kalau belum ada device sama sekali di akun ini, baru buat 1x
    if (!deviceToken) {
      const devices = await getDevices();

      if (devices.success && devices.data.length > 0) {
        // Sudah ada device (dari percobaan sebelumnya) → pakai itu,
        // JANGAN addDevice lagi (kuota free plan cuma 1)
        deviceIdentifier = devices.data[0].device;
        deviceToken = devices.data[0].token;
      } else {
        // Benar-benar belum ada device → baru buat
        const newId = Date.now().toString().slice(-8) +
          Math.floor(100000 + Math.random() * 900000).toString();

        const created = await addDevice(newId, "Undangan Digital");

        if (!created.success || !created.token) {
          return NextResponse.json(
            { qr: null, alreadyConnected: false, error: created.error },
            { status: 500 }
          );
        }

        deviceIdentifier = created.device!;
        deviceToken = created.token;
      }
    }

    const qr = await requestQrCode(deviceToken);

    if (qr.alreadyConnected) {
      return NextResponse.json({
        qr: null,
        alreadyConnected: true,
        error: null,
        device: deviceIdentifier,
      });
    }

    if (qr.error) {
      return NextResponse.json(
        { qr: null, alreadyConnected: false, error: qr.error, device: deviceIdentifier },
        { status: 500 }
      );
    }

    return NextResponse.json({
      qr: qr.qr,
      alreadyConnected: false,
      error: null,
      device: deviceIdentifier,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json(
      { qr: null, alreadyConnected: false, error: message },
      { status: 500 }
    );
  }
}