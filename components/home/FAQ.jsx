"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "Apa itu MerdekAI?",
    description:
      "MerdekAI adalah platform chatbot AI canggih yang menyediakan dua fitur utama: pembuat gambar AI dan analisis gambar AI. Kami membantu Anda mengubah ide menjadi visual yang menakjubkan dan memahami konten gambar dengan detail yang akurat.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-100 to-red-100 text-neutral-800">
        <div className="text-center">
          <div className="text-6xl mb-4">🤖</div>
          <div className="text-xl font-bold">MerdekAI Platform</div>
        </div>
      </div>
    ),
  },
  {
    title: "Bagaimana cara membuat gambar dengan AI?",
    description:
      "Sangat mudah! Cukup ketik deskripsi gambar yang Anda inginkan dalam bahasa Indonesia atau Inggris. AI kami akan memproses permintaan Anda dan menghasilkan gambar berkualitas tinggi dalam hitungan detik. Anda bisa mencoba berbagai gaya dan tema sesuai kebutuhan.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-100 to-neutral-200 text-neutral-800">
        <div className="text-center">
          <div className="text-6xl mb-4">🎨</div>
          <div className="text-xl font-bold">Pembuat Gambar AI</div>
        </div>
      </div>
    ),
  },
  {
    title: "Apakah fitur analisis gambar akurat?",
    description:
      "Ya! Fitur analisis gambar kami menggunakan teknologi AI terdepan yang dapat mendeteksi objek, mengidentifikasi konten, dan memberikan deskripsi detail tentang gambar yang Anda upload. Tingkat akurasi mencapai 95% untuk berbagai jenis gambar.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-200 to-red-200 text-neutral-800">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <div className="text-xl font-bold">Analisis Gambar AI</div>
        </div>
      </div>
    ),
  },
  {
    title: "Apakah MerdekAI gratis untuk digunakan?",
    description:
      "Ya benar MerdekAI menyediakan versi gratis dengan fitur dasar yang sudah sangat lengkap. Kami tidak membuat versi berbayar, semua fitur tersedia untuk semua pengguna tanpa biaya.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-200 to-neutral-100 text-neutral-800">
        <div className="text-center">
          <div className="text-6xl mb-4">💎</div>
          <div className="text-xl font-bold">Paket Fleksibel</div>
        </div>
      </div>
    ),
  },
];
export function FAQ() {
  return (
    <section id="faq">
      <div className="relative w-full py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
              Frequently Asked
              <span className="text-red-900"> Questions</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Temukan jawaban untuk pertanyaan yang sering ditanyakan tentang
              MerdekAI
            </p>
          </div>

          <div className="w-full">
            <StickyScroll content={content} />
          </div>
        </div>
      </div>
    </section>
  );
}
