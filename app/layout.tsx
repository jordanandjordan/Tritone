import type { Metadata } from "next";
import { isFilled } from "@prismicio/client";
import "./globals.css";

import Header from "@/components/navigation/Header";
import { createClient } from "@/prismicio";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("site_settings");

  const title =
    settings.data.meta_data_title ||
    settings.data.site_title ||
    "Tritone";

  const description = settings.data.meta_description || "";

  const socialShareImageUrl = isFilled.image(
    settings.data.social_share_image
  )
    ? settings.data.social_share_image.url
    : undefined;

  const faviconUrl = isFilled.image(settings.data.favicon)
    ? settings.data.favicon.url
    : undefined;

  return {
    title,
    description,
    icons: {
      icon: faviconUrl || "/favicon.ico",
      shortcut: faviconUrl || "/favicon.ico",
      apple: faviconUrl || "/favicon.ico",
    },
    openGraph: {
      title,
      description,
      images: socialShareImageUrl ? [socialShareImageUrl] : [],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = createClient();
  const settings = await client.getSingle("site_settings");

  const rawBackgroundVideoUrl = isFilled.linkToMedia(
  settings.data.background_video
)
  ? settings.data.background_video.url
  : "/tritone-background.mp4";

const backgroundVideoUrl = `${rawBackgroundVideoUrl}${
  rawBackgroundVideoUrl.includes("?") ? "&" : "?"
}v=${Date.now()}`;

  const logoUrl = isFilled.image(settings.data.logo)
    ? settings.data.logo.url
    : undefined;

  return (
    <html lang="en">
      <body className="relative overflow-x-hidden bg-black text-white">
        <div className="fixed inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover opacity-70"
          >
            <source src={backgroundVideoUrl} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative z-10">
          <Header
            logoUrl={logoUrl}
            contactEmail={settings.data.contact_email}
          />
          {children}
        </div>
      </body>
    </html>
  );
}