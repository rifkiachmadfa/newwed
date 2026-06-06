"use client";

import { useState, useRef, useEffect } from "react";
import { StaticImageData } from "next/image";
import HeroSection from "@/app/Components/HeroSection";
import CoupleSection from "@/app/Components/CoupleSection";
import EventSection from "@/app/Components/EventSection";
// import DressCodeSection from "@/app/Components/DressCodeSection";
import GiftSection from "@/app/Components/GiftSection";
import ClosingSection from "@/app/Components/ClosingSection";
import CountdownSection from "@/app/Components/CountDownSection";
import EnvelopeOpener from "@/app/Components/EnvelopeOpener";
import QuotesSection from "@/app/Components/QuotesSection";
import WishesSection from "@/app/Components/WishesSection";
import { Volume2, VolumeX } from "lucide-react";

interface WeddingData {
    heroImage: string | StaticImageData;
    groom: {
      name: string;
      fullName: string;
      photo: string;
      father: string;
      mother: string;
      instagram: string;
    };
    bride: {
      name: string;
      fullName: string;
      photo: string;
      father: string;
      mother: string;
      instagram: string;
    };
    weddingDate: string;
    akad: {
      day: string;
      date: string;
      time: string;
      venue: string;
      address: string;
    };
    resepsi: {
      day: string;
      date: string;
      time: string;
      venue: string;
      address: string;
    };
    googleMapsEmbed: string;
    googleMapsUrl: string;
    dressCode: {
      theme: string;
      description: string;
      avoidColors: string[];
      male: string;
      female: string;
    };
    gift: {
      address: string;
      contactPerson: string;
      contactPhone: string;
      bankAccounts: {
        bank: string;
        accountNumber: string;
        accountName: string;
      }[];
    };
    closing: {
      quote: string;
      quoteSource: string;
      message: string;
    };
    rsvpWhatsApp: string;
  }

interface Props {
  guestName: string;
  data: WeddingData;
}

export default function InvitationPageClient({ guestName, data }: Props) {
  const [opened, setOpened] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Mulai musik saat envelope dibuka
  useEffect(() => {
    if (opened && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  }, [opened]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f1de] overflow-x-hidden">
      {/* Audio */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {!opened && (
        <EnvelopeOpener guestName={guestName} onOpen={() => setOpened(true)} />
      )}

      {/* Floating Mute/Unmute Button */}
      {opened && (
        <button
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/80 backdrop-blur shadow-lg border border-rose-100 flex items-center justify-center hover:bg-rose-50 transition-all"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-rose-400" />
          ) : (
            <Volume2 className="w-5 h-5 text-rose-400" />
          )}
        </button>
      )}

      <HeroSection guestName={guestName} data={data} />
      <QuotesSection />
      <CoupleSection data={data} />
      <CountdownSection targetDate={data.weddingDate} />
      <EventSection data={data} />
      {/* <DressCodeSection data={data} /> */}
      <GiftSection data={data} />
      <WishesSection data={data} guestName={guestName} />
      <ClosingSection data={data} />
    </main>
  );
}