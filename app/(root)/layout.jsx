import { Header } from "@/components/Header";
import "../globals.css";

export const metadata = {
  title: "MerdekAI",
  description:
    "Platform AI untuk membantu produktivitas Anda dengan berbagai fitur canggih",
};

export default function HomeLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
