import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Masuk - MerdekAI",
  description: "Masuk ke akun MerdekAI Anda",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <main
          className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
