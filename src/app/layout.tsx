import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gestion d'école",
  description: "Application de gestion d'école",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
