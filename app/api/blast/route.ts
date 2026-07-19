import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

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

    // Kirim pesan teks
    const res = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        "Authorization": process.env.FONNTE_TOKEN!,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        target: phone,
        message,
        url: "https://res.cloudinary.com/dzjydhoc7/image/upload/v1784378310/couple_rwujja.png",
        countryCode: "62",
      }),
    });

    const data = await res.json();
    console.log("Fonnte response:", JSON.stringify(data));

    if (!res.ok || !data.status) {
      console.error("Fonnte error:", data);
      return NextResponse.json({ error: data.reason ?? "Gagal kirim pesan" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}