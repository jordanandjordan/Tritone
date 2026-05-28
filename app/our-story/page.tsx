export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { ReactNode } from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import { createClient } from "@/prismicio";

const monoRichTextComponents = {
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="mb-[22px] font-mono text-[12px] leading-[1.6] tracking-[0.08em] last:mb-0">
      {children}
    </p>
  ),
};

export default async function OurStoryPage() {
  const client = createClient();
  const page = await client.getSingle("our_story");

  return (
    <main className="min-h-screen text-white">
      <section className="pt-[140px] pb-[120px] md:pt-[150px] md:pb-[180px]">
        <Container>
          <Grid className="items-start gap-y-[50px] md:gap-y-[160px]">
            {/* TOP SECTION */}

            <div className="col-span-2 md:col-span-5">
              <h1 className="font-founders text-[36px] leading-[1.18] tracking-[-0.02em] md:text-[42px] md:leading-[1.16]">
                {page.data.heading_one}
              </h1>
            </div>

            <div className="col-span-2 md:col-span-5 md:col-start-8">
              <PrismicRichText
                field={page.data.section_one}
                components={monoRichTextComponents}
              />
            </div>

            {/* IMAGE */}

            <div className="col-span-2 md:col-span-8 md:col-start-5">
              <PrismicNextImage
                field={page.data.image}
                className="w-full grayscale"
                fallbackAlt=""
              />
            </div>

            {/* BOTTOM LEFT HEADING */}

            <div className="col-span-2 md:col-span-4 md:mt-[-60px]">
              <h2 className="font-founders text-[36px] leading-[1.18] tracking-[-0.02em] md:text-[42px] md:leading-[1.16]">
                {page.data.heading_two}
              </h2>
            </div>

            {/* BOTTOM RIGHT COPY */}

            <div className="col-span-2 md:col-span-5 md:col-start-8 md:mt-[-60px]">
              <PrismicRichText
                field={page.data.section_two}
                components={monoRichTextComponents}
              />
            </div>
          </Grid>
        </Container>
      </section>
    </main>
  );
}