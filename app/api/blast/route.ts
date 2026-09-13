import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { sendMessage } from "@/lib/fonnte/client";

export async function POST(req: NextRequest) {
  try {
    const { guestId } = await req.json();

    const guest = await prisma.guest.findUnique({
      where: { id: Number(guestId) },
    });

    if (!guest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `${req.headers.get("x-forwarded-proto") ?? "http"}://${req.headers.get("host")}`);

    const invitationUrl = `${baseUrl}/invitation/${guest.slug}`;

    const message =
      `*Assalamu'alaikum Wr. Wb.*\n\n` +
      `Kepada Yth.\n*${guest.name}*\n\n` +
      `Dengan memohon rahmat dan ridho Allah Subhanahuwata'ala, kami bermaksud mengundang *${guest.name}* untuk menghadiri acara pernikahan kami.\n\n` +
      `*Berikut link undangan digital untuk ${guest.name}:*\n` +
      `${invitationUrl}\n` +
      `Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\n` +
      `*Wassalamu'alaikum Wr. Wb.*\n` +
      `Khaharani & Yono 💍`;

    const phone = guest.phone
      .replace(/\D/g, "")
      .replace(/^0/, "62");

    const result = await sendMessage(
      phone,
      message,
      "https://res.cloudinary.com/dzjydhoc7/image/upload/v1784378310/couple_rwujja.png"
    );

    if (!result.success) {
      console.error("Fonnte error:", result.error);
      return NextResponse.json(
        { error: result.error ?? "Gagal mengirim undangan." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Gagal mengirim undangan.";
    console.error(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}