"use client";

import { ReactNode } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import OnekoCat from "@/components/OnekoCat";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

/**
 * Client-side layout wrapper that integrates:
 * - SmoothScroll with Lenis
 * - CustomCursor
 * - OnekoCat
 * - Vercel analytics
 */
const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SmoothScroll disabled={false}>
        <CustomCursor />
        <OnekoCat />
        <SpeedInsights />
        <Analytics />
        {children}
      </SmoothScroll>
    </>
  );
};

export default ClientLayout;
