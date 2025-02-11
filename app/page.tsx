"use client";

import { SiteHeader } from "@/components/site-header";
import Leaderboard from "../leaderboard";
import { Footer } from "@/components/footer";

export default function SyntheticV0PageForDeployment() {
  return (
    <>
      <SiteHeader />
      <Leaderboard />
      <Footer />
    </>
  );
}
