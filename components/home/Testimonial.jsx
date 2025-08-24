"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function Testimonial() {
  return (
    <section id="testimonials">
      <div className="relative w-full py-10 px-4 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
              Testimoni
              <span className="text-red-900"> Pengguna</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Dengarkan pengalaman mereka yang telah merasakan kecanggihan
              MerdekAI
            </p>
          </div>

          <div className="h-[40rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="normal"
              pauseOnHover={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote: "Sangat membantu saya dalam membuat ide konten dengan cepat!",
    name: "Naufal Farid",
    title: "Graphic Designer",
  },
  {
    quote: "Dapat memberikan solusi dari masaalah yang saya hadapi.",
    name: "Azka Maulana",
    title: "Programmer",
  },
  {
    quote:
      "MerdekAI memudahkan saya dalam menyelesaikan tugas-tugas sekolah saya.",
    name: "Faizal Rizky",
    title: "Programmer",
  },
];
