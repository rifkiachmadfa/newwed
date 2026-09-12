import { Suspense } from "react";
import { getKaroselImages } from "@/lib/getKaroselImages";
import InvitationContent from "./InvitationPageClient";

export default function InvitationPage() {
  const carouselImages = getKaroselImages();

  return (
    <Suspense>
      <InvitationContent carouselImages={carouselImages} />
    </Suspense>
  );
}