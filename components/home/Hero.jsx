"use client";
import React from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export function Hero() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden">
      <BackgroundRippleEffect />
      <div className="mt-60 w-full">
        <h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100">
          Merdek
          <span className="text-red-900 underline">AI</span>
        </h2>
        <p className="relative z-10 mx-auto mt-4 max-w-xl text-center text-neutral-800 dark:text-neutral-500">
          MerdekAI adalah platform yang menyediakan layanan chatbot yang dapat
          membantu anda dalam berbagai kebutuhan, mulai dari menjawab pertanyaan
          hingga memberikan rekomendasi.
        </p>
      </div>
    </div>
  );
}
