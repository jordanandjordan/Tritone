export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { ReactNode } from "react";
import { PrismicRichText } from "@prismicio/react";
import { asLink, isFilled } from "@prismicio/client";

import Container from "@/components/layout/Container";
import { createClient } from "@/prismicio";

const heroTextStyle = {
  fontSize: "clamp(40px, 5vw, 60px)",
  lineHeight: "1.1",
  letterSpacing: "-0.03em",
  margin: 0,
};

function HeroText({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-founders" style={heroTextStyle}>
      {children}
    </h1>
  );
}

export default async function HomePage() {
  const client = createClient();
  const page = await client.getSingle("homepage");

  const ctaHref = isFilled.link(page.data.cta_link)
    ? asLink(page.data.cta_link)
    : "mailto:hello@tritone.com";

  return (
    <main className="relative min-h-screen text-white">
      <section className="flex min-h-screen items-center">
        <Container>
          <div className="mx-auto flex max-w-[980px] flex-col items-start text-left md:items-center md:text-center">
            <PrismicRichText
              field={page.data.copy}
              components={{
                heading1: ({ children }) => (
                  <HeroText>{children}</HeroText>
                ),
                paragraph: ({ children }) => (
                  <HeroText>{children}</HeroText>
                ),
              }}
            />

            <a
              href={ctaHref || "mailto:hello@tritone.com"}
              className="mt-[44px] inline-flex h-[52px] items-center justify-center bg-[#2917E8] px-[30px] font-mono text-[10pt] tracking-[0.02em] text-white transition-opacity hover:opacity-90"
            >
              {page.data.cta_label || "Contact Us"}
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}