import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getDevices, sendMessage } from "@/lib/fonnte/client";
import { weddingData } from "@/config/weddingData";

export async function POST(req: NextRequest) {
  try {
    const { guestId } = await req.json();

    const guest = await prisma.guest.findUnique({
      where: { id: Number(guestId) },
    });

    if (!guest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }

    if (!guest.phone) {
      return NextResponse.json(
        { error: "Nomor WhatsApp tamu belum diisi." },
        { status: 400 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `${req.headers.get("x-forwarded-proto") ?? "http"}://${req.headers.get("host")}`);

    const invitationUrl = `${baseUrl}/invitation/${guest.slug}`;

    const { groom, bride } = weddingData;
    const coupleName = `${groom.name} & ${bride.name}`;

    const message =
      `*Assalamu'alaikum Wr. Wb.*\n\n` +
      `Kepada Yth.\n*${guest.name}*\n\n` +
      `Dengan memohon rahmat dan ridho Allah Subhanahuwata'ala, kami bermaksud mengundang *${guest.name}* untuk menghadiri acara pernikahan kami.\n\n` +
      `*Berikut link undangan digital untuk ${guest.name}:*\n` +
      `${invitationUrl}\n` +
      `Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\n` +
      `*Wassalamu'alaikum Wr. Wb.*\n` +
      `${coupleName} 💍`;

    const phone = guest.phone
      .replace(/\D/g, "")
      .replace(/^0/, "62");

    if (!phone) {
      return NextResponse.json(
        { error: "Nomor WhatsApp tamu tidak valid." },
        { status: 400 }
      );
    }

    /**
     * -----------------------------------------------------
     * AMBIL DEVICE TOKEN
     * -----------------------------------------------------
     *
     * Sementara: pakai device pertama yang statusnya
     * "connect" di akun Fonnte.
     *
     * TODO (multi-tenant):
     * Ganti bagian ini dengan mengambil `fonnte_token`
     * dari data tenant/user yang login, bukan mencari
     * device pertama yang connect.
     */

    const devices = await getDevices();

    if (!devices.success) {
      console.error("Fonnte getDevices error:", devices.error);
      return NextResponse.json(
        { error: devices.error ?? "Gagal mengambil daftar device Fonnte." },
        { status: 500 }
      );
    }

    const activeDevice = devices.data.find(
      (d) => d.status === "connect"
    );

    if (!activeDevice) {
      return NextResponse.json(
        { error: "Tidak ada device WhatsApp yang terhubung." },
        { status: 400 }
      );
    }

    /**
     * -----------------------------------------------------
     * KIRIM PESAN
     * -----------------------------------------------------
     *
     * Urutan parameter WAJIB sesuai signature sendMessage:
     * (deviceToken, target, message, imageUrl?)
     */

    const result = await sendMessage(
      activeDevice.token,
      phone,
      message,
      "https://res.cloudinary.com/dzjydhoc7/image/upload/v1789303474/bg_wfd5um.jpg"
    );

    if (!result.success) {
      console.error("Fonnte error:", result.error);
      return NextResponse.json(
        { error: result.error ?? "Gagal mengirim undangan." },
        { status: 500 }
      );
    }

    await prisma.guest.update({
      where: { id: guest.id },
      data: { blastedAt: new Date() },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Gagal mengirim undangan.";
    console.error(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}