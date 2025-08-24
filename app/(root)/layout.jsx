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
      <head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>
        <body>
          <Header />
          <main>{children}</main>
        </body>
      </head>
    </html>
  );
}
