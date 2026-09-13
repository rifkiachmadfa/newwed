import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import InvitationClient from "@/app/InvitationPageClient";
import { weddingData } from "@/config/weddingData";
import type { Metadata } from "next";
import { getKaroselImages } from "@/lib/getKaroselImages";

type Props = {
  params: Promise<{ slug: string }>;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://undangandigital-eight.vercel.app";

const OG_IMAGE_URL =
  "https://res.cloudinary.com/dzjydhoc7/image/upload/v1784378310/couple_rwujja.png";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const guest = await prisma.guest.findUnique({ where: { slug } });

  const { groom, bride, akad } = weddingData;

  const coupleTitle = `${groom.name} & ${bride.name}`;

  const title = `Undangan Pernikahan ${coupleTitle}`;

  const description = guest
    ? `Kepada Yth. ${guest.name}, dengan memohon rahmat dan ridho Allah SWT, kami mengundang Anda untuk hadir di pernikahan ${coupleTitle} pada ${akad.day}, ${akad.date} di ${akad.venue}.`
    : `Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Anda untuk hadir di pernikahan ${coupleTitle} pada ${akad.day}, ${akad.date} di ${akad.venue}.`;

  const url = `${SITE_URL}/invitation/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: `Undangan ${coupleTitle}`,
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1080,
          height: 1080,
          alt: title,
        },
      ],
      type: "website",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE_URL],
    },
  };
}

export default async function GuestInvitationPage({ params }: Props) {
  const { slug } = await params;
  const guest = await prisma.guest.findUnique({ where: { slug } });
  if (!guest) notFound();

  const carouselImages = getKaroselImages();

  return (
    <InvitationClient
      guestName={guest.name}
      data={weddingData}
      carouselImages={carouselImages}
    />
  );
}