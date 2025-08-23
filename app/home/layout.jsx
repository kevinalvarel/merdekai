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
        <main>{children}</main>
      </body>
    </html>
  );
}
