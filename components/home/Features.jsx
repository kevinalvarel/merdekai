"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";

export function Features() {
  const features = [
    {
      title: "Pembuat Gambar AI",
      description:
        "Buat gambar yang menakjubkan hanya dengan mendeskripsikan apa yang Anda inginkan. AI kami akan mengubah kata-kata menjadi karya seni visual yang memukau.",
      highlights: [
        "Berbagai gaya artistik",
        "Resolusi tinggi",
        "Proses cepat dan mudah",
      ],
    },
    {
      title: "Analisis Gambar AI",
      description:
        "Upload gambar dan biarkan AI menganalisis konten, objek, dan detail yang ada di dalamnya. Dapatkan insight mendalam tentang setiap visual yang Anda berikan.",
      highlights: [
        "Deteksi objek akurat",
        "Analisis konten detail",
        "Deskripsi komprehensif",
      ],
    },
  ];

  return (
    <section id="features">
      <div className="relative w-full py-30 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-4"
            >
              Fitur Unggulan
              <span className="text-red-900"> MerdekAI</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
            >
              Jelajahi kemampuan AI terdepan yang siap membantu kreativitas dan
              produktivitas Anda
            </motion.p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-8 bg-white/10 backdrop-blur-sm border border-neutral-200/20 hover:border-red-900/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-900/5"
              >
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="w-full">
                    <h4 className="text-sm font-semibold text-red-900 mb-3 uppercase tracking-wide">
                      Keunggulan:
                    </h4>
                    <ul className="space-y-2">
                      {feature.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-neutral-700 dark:text-neutral-300"
                        >
                          <span className="w-2 h-2 bg-red-900 rounded-full mr-3 flex-shrink-0"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
