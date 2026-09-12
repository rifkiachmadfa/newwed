"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { weddingData } from "../config/weddingData";
import HeroSection from "./Components/HeroSection";
import CoupleSection from "./Components/CoupleSection";
import EventSection from "./Components/EventSection";
import GiftSection from "./Components/GiftSection";
import ClosingSection from "./Components/ClosingSection";
import CountdownSection from "./Components/CountDownSection";
import EnvelopeOpener from "./Components/EnvelopeOpener";
import QuotesSection from "./Components/QuotesSection";
import WishesSection from "./Components/WishesSection";
import DressCodeSection from "./Components/DressCodeSection";
import MusicPlayer, { MusicPlayerHandle } from "./Components/MusicPlayer";

interface InvitationContentProps {
  carouselImages: string[];
  guestName?: string;
  data?: typeof weddingData;
}

export default function InvitationContent({
  carouselImages,
  guestName: guestNameProp,
  data: dataProp,
}: InvitationContentProps) {
  const searchParams = useSearchParams();
  const guestName = guestNameProp ?? searchParams.get("to") ?? "Tamu Undangan";
  const data = dataProp ?? weddingData;
  const [opened, setOpened] = useState(false);
  const musicRef = useRef<MusicPlayerHandle>(null);

  const handleEnvelopeOpen = () => {
    setOpened(true);
    // Klik segel = user gesture, jadi browser mengizinkan audio.play() di sini.
    musicRef.current?.play();
  };

  return (
    <main className="min-h-screen bg-[#f4f6eb] overflow-x-hidden">
      {!opened && <EnvelopeOpener guestName={guestName} onOpen={handleEnvelopeOpen} />}

      <MusicPlayer ref={musicRef} src="/music/wedding-song.mp3" />

      <HeroSection guestName={guestName} data={data} />
      <QuotesSection carouselImages={carouselImages} />
      <CoupleSection data={data} />
      <CountdownSection targetDate={data.weddingDate} />
      <EventSection data={data} />
      <DressCodeSection data={data} />
      <GiftSection data={data} />
      <WishesSection data={data} guestName={guestName} />
      <ClosingSection data={data} />
    </main>
  );
}