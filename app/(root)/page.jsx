"use client";
import SignIn from "@/components/LoginForm";
import { AuroraBackground } from "@/components/ui/aurora-bg";
import { motion } from "motion/react";

export default function LoginPage() {
  useDocumentTitle("Masuk - MerdekAI");

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex min-h-screen flex-col items-center justify-center gap-8 px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Selamat Datang
            </h1>
            <p className="text-slate-300 text-lg">
              Masuk untuk melanjutkan ke akun Anda
            </p>
          </div>
          <SignIn />
        </motion.div>
      </motion.div>
    </AuroraBackground>
  );
}
