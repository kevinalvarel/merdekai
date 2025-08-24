"use client";
import React from "react";
import { motion } from "motion/react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export function Hero() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden">
      <BackgroundRippleEffect />
      <div className="mt-60 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100"
        >
          Merdek
          <span className="text-red-900 underline">AI</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mx-auto mt-4 max-w-xl text-center text-neutral-800 dark:text-neutral-500"
        >
          MerdekAI adalah platform yang menyediakan layanan chatbot yang dapat
          membantu anda dalam berbagai kebutuhan, mulai dari menjawab pertanyaan
          hingga memberikan rekomendasi.
        </motion.p>
      </div>
    </div>
  );
}
